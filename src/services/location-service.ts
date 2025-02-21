import { dbConnection as db } from "../utils/db";
import { coordinateSchema, CoordinateSchemaInferInsert, locationSchema, LocationSchemaInferInsert } from "../models/location";
import { GeofenceSchemaInsert, geofenceSchema } from "../models/geofence";
import { eq } from 'drizzle-orm';

export type LocationCustomType = Partial<LocationSchemaInferInsert & CoordinateSchemaInferInsert> & {
    geofence?: {
        name: string;
        radius: number;
        allowedZones?: [number, number][][]; // Array of polygon coordinates [[lat1,lng1], [lat2,lng2], ...]
        restrictedZones?: [number, number][][]; // Array of polygon coordinates
        maxAllowedSpeed?: number;
        requiresApproval?: boolean;
    }
};

class LocationService {
    async addLocations(locationData: LocationCustomType): Promise<LocationCustomType> {
        // Create geofence first
        const geofenceData: Omit<GeofenceSchemaInsert, "id" | "created_at" | "updated_at"> = {
            name: locationData.geofence?.name || `${locationData.name}-geofence`,
            radius: locationData.geofence?.radius || 100, // default 100 meters
            allowedZones: locationData.geofence?.allowedZones || [[ // default square around the location
                [Number(locationData.latitude) + 0.001, Number(locationData.longitude) + 0.001],
                [Number(locationData.latitude) + 0.001, Number(locationData.longitude) - 0.001],
                [Number(locationData.latitude) - 0.001, Number(locationData.longitude) - 0.001],
                [Number(locationData.latitude) - 0.001, Number(locationData.longitude) + 0.001],
                [Number(locationData.latitude) + 0.001, Number(locationData.longitude) + 0.001]
            ]],
            restrictedZones: locationData.geofence?.restrictedZones || [],
            maxAllowedSpeed: locationData.geofence?.maxAllowedSpeed || 5, // default 5 km/h
            requiresApproval: locationData.geofence?.requiresApproval || false
        };

        const [geofence] = await db.insert(geofenceSchema)
            .values(geofenceData)
            .returning({ id: geofenceSchema.id });

        // Create coordinates
        const cor: Omit<CoordinateSchemaInferInsert, "id" | "created_at" | "updated_at" | "deleted_at"> = {
            latitude: locationData.latitude!,
            longitude: locationData.longitude!
        };
        const [coord] = await db.insert(coordinateSchema)
            .values(cor)
            .returning({ id: coordinateSchema.id });

        // Create location with both references
        const loc: Omit<LocationSchemaInferInsert, "id" | "created_at" | "updated_at" | "deleted_at"> = {
            name: locationData.name!,
            address: locationData.address!,
            floor: locationData.floor,
            coordinatesId: coord.id,
            geofenceId: geofence.id
        };

        const result = await db.insert(locationSchema)
            .values(loc)
            .returning({ id: locationSchema.id });

        return result[0];
    }
    async getAllLocations(): Promise<any>{
        const res = await db.select().from(locationSchema).innerJoin(coordinateSchema, eq(locationSchema.coordinatesId, coordinateSchema.id))
        console.log(res);
        return res;
    }

}

export default new LocationService();