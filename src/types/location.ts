import { LocationAuditSchemaInsert } from "../models/security-audit";

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface GeofenceConfig {
    radius: number;
    allowedZones?: [number, number][][];
    restrictedZones?: [number, number][][];
    maxAllowedSpeed?: number;
    requiresApproval?: boolean;
}

export interface LocationVerification {
    maxDistanceInMeters?: number;
    coordinates: {
        latitude: number;
        longitude: number;
        accuracy?: number;
        altitude?: number;
        timestamp?: number;
        userId?: string;
        deviceId?: string;
        shiftId?: string;
    };
    geofence?: GeofenceConfig;
}

export type LocationAudit =  Partial<LocationAuditSchemaInsert> & {
    userId: string;
    shiftId: string;
    deviceId: string;
    locationId: string;
    deviceLocation: Coordinates;
    eventType: 'verification' | 'violation' | 'warning';
    status: 'success' | 'failed';
    metadata?: Record<string, any>;
}