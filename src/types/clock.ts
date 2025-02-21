export interface ClockRequestType {
    userId: string;
    shiftId: string;
    deviceLocation: {
        latitude: number;
        longitude: number;
    };
    deviceId: string;
    timestamp: Date;
}

export interface LocationVerification {
    maxDistanceInMeters: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}