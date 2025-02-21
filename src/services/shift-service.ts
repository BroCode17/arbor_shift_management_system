import { eq, and } from "drizzle-orm";
import { coordinateSchema, locationSchema } from "../models/location";
import { AvailableShiftSchemaInferInsert, availableShiftsSchema, shiftAssignmentsSchema, ShiftAssignmentsSchemaInferInsert, shiftSchema, ShiftSchemaInferInsert, ShiftSchemaInferSelect } from "../models/shift";
import { dbConnection as db } from "../utils/db";
import { ClockRequestType } from '../types/clock';
import { format } from "date-fns";
// Update imports
import { LocationVerification, LocationAudit, GeofenceConfig } from '../types/location';
import { 
    validateLocationData, 
    isWithinGeofence, 
    calculateLocationPattern, 
    validateLocationSequence,
    LocationHistory 
} from '../utils/location-utils';
import { geofenceSchema } from '../models/geofence';
import { deviceHistorySchema, locationAuditSchema } from "../models/security-audit";
import { PgUUID } from "drizzle-orm/pg-core";

type OmitShiftSchemaInferInsert = Omit<ShiftSchemaInferInsert, "id" | "created_at" | "updated_at">
type OmitAvailableShiftSchemaInferInsert = Omit<AvailableShiftSchemaInferInsert, "id" | "created_at" | "updated_at">
type ClaimedShiftStatus = "accepted" | "rejected";
type ClaimedShiftTypes = {
    userId: string,
    shiftId: string,
    status?: ClaimedShiftStatus,
    claimed_at?: Date,
    updated_at?: Date,
    created_at?: Date,
}
class ShiftService {

    async createShiftTemplate(shiftData: OmitShiftSchemaInferInsert): Promise<ShiftSchemaInferSelect> {
        const result = await db.insert(shiftSchema).values({
            ...shiftData,
            startTime: new Date(shiftData.startTime),
            endTime: new Date(shiftData.endTime),
        }).returning();
        return result[0];
    }

    async updateShiftTemplate(id: string, shiftData: Partial<OmitShiftSchemaInferInsert>): Promise<Partial<ShiftSchemaInferInsert>> {
        const response = await db.update(shiftSchema).set(shiftData).where(eq(shiftSchema.id, id)).returning({ id: shiftSchema.id });
        return response[0];
    }

    async deleteShiftTemplate(id: string): Promise<Partial<ShiftSchemaInferInsert>> {
        const response = await db.delete(shiftSchema).where(eq(shiftSchema.id, id)).returning({ id: shiftSchema.id });
        return response[0];
    }

    async getAllShifts(): Promise<any> {
        const result = await db.select().from(shiftSchema).innerJoin(locationSchema, eq(shiftSchema.locationId, locationSchema.id)).innerJoin(coordinateSchema, eq(locationSchema.coordinatesId, coordinateSchema.id));
        return result;
    }


    //assign a shift
    async addAvailabeShift(shiftData: Partial<OmitAvailableShiftSchemaInferInsert>): Promise<AvailableShiftSchemaInferInsert> {
        // get shift template by id
        const [shiftTemplate]: ShiftSchemaInferSelect[] = await db.select().from(shiftSchema).where(eq(shiftSchema.id, shiftData.template_id!));
        // if (!shiftTemplate) {
        //     throw new Error("Shift template not found, Please create the template first", { cause: 404 });
        // }
        // merge template dat with overrides
        const actualStartTime = new Date(shiftData.start_time || shiftTemplate.startTime);
        const actualEndTime = new Date(shiftData.end_time || shiftTemplate.endTime);
        const finalRate = shiftData.hourly_rate || shiftTemplate.defaultHourlyRate;

        // insert the actual shift
        const [newShift]: AvailableShiftSchemaInferInsert[] = await db.insert(availableShiftsSchema).values({
            shift_date: shiftData.shift_date!,
            template_id: shiftData.template_id!,
            location_id: shiftData.location_id,
            start_time: actualStartTime,
            end_time: actualEndTime,
            hourly_rate: finalRate,
            updated_at: new Date()
        }).onConflictDoUpdate({
            target: [availableShiftsSchema.id],
            set: {
                shift_date: shiftData.shift_date!,
                template_id: shiftData.template_id!,
                location_id: shiftData.location_id,
                start_time: actualStartTime,
                end_time: actualEndTime,
                hourly_rate: finalRate,
                updated_at: new Date()
            }
        }).returning();

        return newShift;
    }

    // Get all available shift
    async getAllAvailableShifts(): Promise<AvailableShiftSchemaInferInsert[] | undefined> {
        // const result = await db.select().from(availableShiftsSchema).innerJoin(locationSchema, eq(availableShiftsSchema.location_id, locationSchema.id)).innerJoin(coordinateSchema, eq(locationSchema.coordinatesId, coordinateSchema.id));

        const result = await db.query.availableShiftsSchema.findMany({
            with: {
                location: {
                    with: {
                        coordinates: true
                    }
                },
                shift: true
            }
        });
        console.log(result);
        return result;
    }

    // Get all shifts for a location

    // Get all shifts for a location and date
    async getAllShiftsForLocation(locationId: string): Promise<any> {
        const result = await db.query.availableShiftsSchema.findMany({
            where: (shifts, { eq }) => eq(shifts.location_id, locationId),
            with: {
                location: {
                    with: {
                        coordinates: true
                    }
                },
                shift: true
            }
        });
        return result;
    }

    async getAllShiftsForLocationAndDate(locationId: string, date: string): Promise<any> {
        const result = await db.query.availableShiftsSchema.findMany({
            where: (shifts, { and, eq }) => and(
                eq(shifts.location_id, locationId),
                eq(shifts.shift_date!, date)
            ),
            with: {
                location: {
                    with: {
                        coordinates: true
                    }
                },
                shift: true
            }
        });
        return result;
    }

    // Deleting shift from 

    // Assign shift
    async claimShift({shiftId, userId}: ClaimedShiftTypes): Promise<ShiftAssignmentsSchemaInferInsert | undefined> {
        // check if user is present;
        const user = await db.query.employeeSchema.findFirst({
            where: (employeeSchema, { eq }) => eq(employeeSchema.id, userId)
        }); 

        // Handle it properly
        if (!user) {
            // will send response to the client that user is not found
            throw new Error("User not found", { cause: 404 });
        }
        
        // Get shift from db
        const [shift]: AvailableShiftSchemaInferInsert[] = await db.select().from(availableShiftsSchema).where(eq(availableShiftsSchema.id, shiftId));
        // Check if shift is available
        if (!shift) {
            // will send response to the client that shift is not available
            throw new Error("Shift not found", { cause: 404 });
        }

        // Check if shift is already assigned or minimum requirement is met like number of people required
        //const [shiftAssignment]: ShiftAssignmentsSchemaInferInsert[] = await db.select().from(shiftAssignmentsSchema).where(eq(shiftAssignmentsSchema.shift_id, shiftId));
        //if (shiftAssignment) {
            // will send response to the client that shift is already assigned
          //  throw new Error("Shift is already assigned", { cause: 400 });
       // }
        // Assign shift
        /**
         * This logic can be changed based on the business need
         * 1. We can perform some check like, user nearer to location
         * 2. We can perform some check like, user is eligible for the shift
         * 3. We can perform some check like, user is eligible for the shift based on the shift type
         * 4. We can perform some check like, user is eligible for the shift based on the shift type and location
         * 5. We can perform some check like, user is eligible for the shift based on the shift type and location and time
         * 6. We can perform some check like, user is eligible for the shift based on the shift type and location and time and certification
         * 7. We can perform some check like, user is eligible for the shift based on the shift type and location and time and certification and availability
         * 8. We can perform some check like, admin has to approve the shift
         */
        const [newShiftAssignment]: ShiftAssignmentsSchemaInferInsert[] = await db.insert(shiftAssignmentsSchema).values({
            shift_id: shiftId,
            user_id: userId,
        }).returning();
        return newShiftAssignment;
    }


    /**
     * if manager has to approve shift
     * then this function is needed
     */
    async approveClaimShift({shiftId, userId, status}: ClaimedShiftTypes): Promise<ShiftAssignmentsSchemaInferInsert | undefined> {
        // check if user is present;
        const user = await db.query.employeeSchema.findFirst({
            where: (employeeSchema, { eq }) => eq(employeeSchema.id, userId)
        });
        // Handle it properly
        if (!user) {
            // will send response to the client that user is not found
            throw new Error("User not found", { cause: 404 });
        }
        // Get shift from db
        // const [shift]: AvailableShiftSchemaInferInsert[] = await db.select().from(availableShiftsSchema).where(eq(availableShiftsSchema.id, shiftId));
        // // Check if shift is available
        // if (!shift) {
        //     // will send response to the client that shift is not available
        //     throw new Error("Shift not found", { cause: 404 });
        // }

        // update assign shift status
        const [newShiftAssignment]: ShiftAssignmentsSchemaInferInsert[] = await db.update(shiftAssignmentsSchema).set({
            status: status,
        }).where(eq(shiftAssignmentsSchema.id, shiftId)).returning();
        return newShiftAssignment;
    }


    /** User */
    async getAllShiftsForUser(userId: string): Promise<ShiftAssignmentsSchemaInferInsert[] | undefined> {
        // check if user is present;
        
        // Handle it properly
        const result = await db.query.shiftAssignmentsSchema.findMany({
            where: (shiftAssignmentsSchema, { eq }) => eq(shiftAssignmentsSchema.user_id, userId),
            with: {
                shift: true
            }
        });
        return result;
    }

    // get all approved shifts for user
    async getAllApprovedShiftsByUserId(userId: string): Promise<ShiftAssignmentsSchemaInferInsert[] | undefined> {
        // check if user is present;
        const user = await db.query.employeeSchema.findFirst({
            where: (employeeSchema, { eq }) => eq(employeeSchema.id, userId)
        });
        // Handle it properly
        if (!user) {
            // will send response to the client that user is not found
            throw new Error("User not found", { cause: 404 });
        }
        const result = await db.query.shiftAssignmentsSchema.findMany({
            where: (shiftAssignmentsSchema, { eq }) => eq(shiftAssignmentsSchema.user_id, userId),
            with: {
                shift: true
            }
        });
        return result;
    }

    async clockIn({ userId, shiftId, deviceLocation, deviceId, timestamp }: ClockRequestType): Promise<ShiftAssignmentsSchemaInferInsert> {
        // 1. Verify user exists and is assigned to shift
        const assignment = await this.verifyShiftAssignment(userId, shiftId);
        
        // 2. Verify shift is today and within acceptable time window
        await this.verifyShiftTiming(assignment.shift, timestamp, 'clockIn');
        
        // 3. Verify device location matches shift location
        await this.verifyLocation(deviceLocation, assignment.shift.location_id!);

        // 4. Update shift assignment with clock in
        const [updatedAssignment] = await db.update(shiftAssignmentsSchema)
            .set({
                clock_in: timestamp,
                status: 'in_progress',
                updated_at: new Date()
            })
            .where(eq(shiftAssignmentsSchema.id, assignment.id))
            .returning();

        return updatedAssignment;
    }

    async clockOut({ userId, shiftId, deviceLocation, deviceId, timestamp }: ClockRequestType): Promise<ShiftAssignmentsSchemaInferInsert> {
        // 1. Verify user exists and is assigned to shift
        const assignment = await this.verifyShiftAssignment(userId, shiftId);

        // 2. Verify user has clocked in
        if (!assignment.clock_in) {
            throw new Error('Must clock in before clocking out', { cause: 400 });
        }

        // 3. Verify shift timing
        await this.verifyShiftTiming(assignment.shift, timestamp, 'clockOut');

        // 4. Verify device location
        await this.verifyLocation(deviceLocation, assignment.shift.location_id!);

        // 5. Calculate actual hours worked
        const hoursWorked = this.calculateHoursWorked(assignment.clock_in, timestamp);

        // 6. Update shift assignment with clock out
        const [updatedAssignment] = await db.update(shiftAssignmentsSchema)
            .set({
                clock_out: timestamp,
                status: 'completed',
                actual_hours_worked: String(hoursWorked),
                updated_at: new Date()
            })
            .where(eq(shiftAssignmentsSchema.id, assignment.id))
            .returning();

        return updatedAssignment;
    }

    private async verifyShiftAssignment(userId: string, shiftId: string) {
        const assignment = await db.query.shiftAssignmentsSchema.findFirst({
            where: (assignments, { and, eq }) => and(
                eq(assignments.id, shiftId),
                eq(assignments.user_id, userId),
            ),
   
            with: {
                shift: {
                    with: {
                        location: true
                    }
                }
            }
        });


        if (!assignment) {
            throw new Error('Shift assignment not found', { cause: 404 });
        }

        if (assignment.status !== 'accepted' && assignment.status !== 'in_progress') {
            throw new Error('Sorry shift is not verified yet', { cause: 400 });
        }

        return assignment;
    }

    private async verifyShiftTiming(shift: any, timestamp: Date, operation: 'clockIn' | 'clockOut') {
        const currentTime = new Date(timestamp);
        const shiftStart = new Date(shift.start_time);
        const shiftEnd = new Date(shift.end_time);
        const shiftDate = format(new Date(shift.shift_date), 'yyyy-MM-dd');

        // Verify the shift is for today
        const today = format(new Date(), 'yyyy-MM-dd');
        console.log(shiftDate );
        console.log(today)
        if (shiftDate !== today) {
            throw new Error('Clock operation only allowed on shift date', { cause: 400 });
        }

        // Allow clock-in 15 minutes before shift start
        const earliestClockIn = format(new Date(shiftStart.getTime() - 15 * 60000), 'HH:mm:ss');
        // Allow clock-out 15 minutes after shift end
        const latestClockOut = format(new Date(shiftEnd.getTime() + 15 * 60000), 'HH:mm:ss');
        
        // formated time
        const formattedCurrentTime = format(currentTime, 'HH:mm:ss');
        const formattedShiftStart = format(shiftStart, 'HH:mm:ss');
        const formattedShiftEnd = format(shiftEnd, 'HH:mm:ss');


        if (operation === 'clockIn') {
            // Prevent double clock-in
            if (shift.status === 'in_progress') {
                throw new Error('Already clocked in for this shift', { cause: 400 });
            }
            // Verify clock-in time window
            if (formattedCurrentTime < earliestClockIn || formattedCurrentTime > formattedShiftEnd) {
                throw new Error('Clock-in time outside of allowed window', { cause: 400 });
            }
        }


        if (operation === 'clockOut') {
            // Verify clock-out time window
            if (formattedCurrentTime < formattedShiftStart || formattedCurrentTime > latestClockOut) {
                throw new Error('Clock-out time outside of allowed window', { cause: 400 });
            }
            // Prevent early clock-out without approval
            const minimumShiftTime = 30; // 30 minutes
            const timeWorked = (currentTime.getTime() - new Date(shift.clock_in).getTime()) / (1000 * 60);
            if (timeWorked < minimumShiftTime && currentTime < shiftEnd) {
                throw new Error('Early clock-out requires manager approval', { cause: 400 });
            }
        }
    }

    private async verifyLocation(deviceLocation: LocationVerification['coordinates'], locationId: string) {
        // Basic validation
        const validation = validateLocationData({
            latitude: deviceLocation.latitude,
            longitude: deviceLocation.longitude,
            accuracy: deviceLocation.accuracy,
            timestamp: deviceLocation.timestamp
        });
    
        if (!validation.isValid) {
            await this.logLocationAudit({
                userId: deviceLocation.userId!,
                shiftId: deviceLocation.shiftId!,
                deviceId: deviceLocation.deviceId!,
                locationId,
                deviceLocation: { latitude: deviceLocation.latitude, longitude: deviceLocation.longitude },
                distance: "0",
                eventType: 'violation',
                status: 'failed',
                metadata: { errors: validation.errors }
            });
            throw new Error(`Invalid location data: ${validation.errors.join(', ')}`, { cause: 400 });
        }
    
        // Get location and geofence data
        const location = await db.query.locationSchema.findFirst({
            where: (locations, { eq }) => eq(locations.id, locationId),
            with: {
                coordinates: true,
                geofence: true // Assuming you add geofence data to location schema
            }
        });

  
    
        if (!location || !location.coordinates) {
            throw new Error('Location information not found', { cause: 404 });
        }
    
        // Get geofence configuration
        // const geofence = await db.query.locationSchema.findFirst({
        //     where: (loc, { eq }) => eq(loc.locationId, locationId)
        // });
        const geofence = location.geofence;

        if (!geofence) {
            throw new Error('Geofence configuration not found', { cause: 404 });
        }
        // Verify geofence
        const isWithinAllowedArea = isWithinGeofence(
            [deviceLocation.latitude, deviceLocation.longitude],
            {
                center: [Number(location.coordinates.latitude), Number(location.coordinates.longitude)],
                radius: geofence ? Number(geofence.radius) : 100,
                restrictedZones: geofence?.restrictedZones || [],
                allowedZones: geofence?.allowedZones || []
            }
        );
    
        if (!isWithinAllowedArea) {
            throw new Error('Location outside of allowed work area', { cause: 400 });
        }
    
        // Get previous locations from audit log
        const previousLocations = await db.query.locationAuditSchema.findMany({
            where: (audit, { eq }) => eq(audit.userId, deviceLocation.userId!),
            orderBy: (audit, { desc }) => [desc(audit.created_at)],
            limit: 5,
            with: {
                location: {
                    with: {
                        coordinates: true
                    }
                },
                user: true,
                shift: true
            }
        });
    
        console.log(deviceLocation)

        const newDeviceLocation: Partial<LocationAudit> = {
            userId: deviceLocation.userId!,
            shiftId: deviceLocation.shiftId!,
            deviceId: deviceLocation.deviceId!,
            locationId,
            deviceLocation: {
                latitude: deviceLocation.latitude,
                longitude: deviceLocation.longitude
            },
            distance: 0.0,
            // accuracy: deviceLocation.accuracy,
            updated_at: deviceLocation.timestamp ? new Date(deviceLocation.timestamp) : new Date(),
        };
        // Check for suspicious movement patterns
        if (previousLocations.length > 0) {
            const locationHistory: LocationHistory[] = previousLocations.map(log => ({
                latitude: Number(log.deviceLatitude),
                longitude: Number(log.deviceLongitude),
                timestamp: log.created_at.getTime(),
                // accuracy: log.accuracy // removed because it is not present in the auditSchema
            }));
           
            // Add current location
            locationHistory.unshift({
                latitude: deviceLocation.latitude,
                longitude: deviceLocation.longitude,
                timestamp: Date.now(),
                accuracy: deviceLocation.accuracy
            });
    
            // Validate location sequence
            const sequenceValidation = validateLocationSequence(locationHistory);
            if (!sequenceValidation.valid) {
                await this.logLocationAudit({
                    ...newDeviceLocation,
                    eventType: 'violation',
                    status: 'failed',
                    metadata: { reason: sequenceValidation.reason }
                });
                throw new Error('Suspicious location pattern detected', { cause: 400 });
            }
    
            // Check for suspicious patterns
            const pattern = calculateLocationPattern(locationHistory);
            if (pattern.suspiciousPattern) {
                await this.logLocationAudit({
                    ...newDeviceLocation,
                    eventType: 'violation',
                    status: 'failed',
                    metadata: { reason: 'suspicious_movement_pattern' }
                });
                throw new Error('Suspicious movement pattern detected', { cause: 400 });
            }
        }
    
        // Log successful verification
        await this.logLocationAudit({
           ...newDeviceLocation,
            eventType: 'verification',
            status: 'success'
        });
    }
    private async logLocationAudit(auditData: any) {
        console.log(auditData)
        await db.insert(locationAuditSchema).values({
            userId: auditData.userId,
            shiftId: auditData.shiftId,
            deviceId: auditData.deviceId,
            locationId: auditData.locationId,
            deviceLatitude: auditData.deviceLocation.latitude,
            deviceLongitude: auditData.deviceLocation.longitude,
            distance: auditData.distance,
            eventType: auditData.eventType,
            status: auditData.status,
            metadata: auditData.metadata,
            created_at: new Date(),
            updated_at: new Date()
        });
    }
    private async updateDeviceHistory(historyData: any) {
        await db.insert(deviceHistorySchema)
            .values({
                userId: historyData.userId,
                deviceId: historyData.deviceId,
                lastKnownLatitude: historyData.latitude,
                lastKnownLongitude: historyData.longitude,
                lastSeenAt: new Date(),
                created_at: new Date(),
                updated_at: new Date()
            })
            .onConflictDoUpdate({
                target: [deviceHistorySchema.deviceId],
                set: {
                    lastKnownLatitude: historyData.latitude,
                    lastKnownLongitude: historyData.longitude,
                    lastSeenAt: new Date(),
                    updated_at: new Date()
                }
            });
    }
    private calculateHoursWorked(clockIn: Date, clockOut: Date): number {
        const milliseconds = new Date(clockOut).getTime() - new Date(clockIn).getTime();
        return Number((milliseconds / (1000 * 60 * 60)).toFixed(2));
    }
}


export default new ShiftService();