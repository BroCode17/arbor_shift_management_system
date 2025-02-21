export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

export function isValidCoordinate(latitude: number, longitude: number): boolean {
    return (
        !isNaN(latitude) &&
        !isNaN(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180
    );
}

export function calculateBoundingBox(
    latitude: number,
    longitude: number,
    radiusInMeters: number
): {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
} {
    const earthRadius = 6371000; // Earth's radius in meters
    const latRadian = (latitude * Math.PI) / 180;
    
    const deltaLat = (radiusInMeters / earthRadius) * (180 / Math.PI);
    const deltaLon = (radiusInMeters / (earthRadius * Math.cos(latRadian))) * (180 / Math.PI);

    return {
        minLat: latitude - deltaLat,
        maxLat: latitude + deltaLat,
        minLon: longitude - deltaLon,
        maxLon: longitude + deltaLon
    };
}

export function isLocationWithinPolygon(
    point: [number, number],
    polygon: [number, number][]
): boolean {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            
        if (intersect) inside = !inside;
    }

    return inside;
}

export function calculateSpeedBetweenPoints(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    timeInSeconds: number
): number {
    const distanceInMeters = calculateDistance(lat1, lon1, lat2, lon2);
    return (distanceInMeters / timeInSeconds) * 3.6; // Convert to km/h
}

export function detectPotentialSpoofing(
    currentLocation: { lat: number; lon: number; timestamp: number },
    previousLocation: { lat: number; lon: number; timestamp: number },
    maxSpeedKmh: number = 120
): boolean {
    const speed = calculateSpeedBetweenPoints(
        currentLocation.lat,
        currentLocation.lon,
        previousLocation.lat,
        previousLocation.lon,
        (currentLocation.timestamp - previousLocation.timestamp) / 1000
    );
    return speed > maxSpeedKmh;
}

export function calculateAccuracy(
    readings: Array<{ lat: number; lon: number }>
): number {
    if (readings.length < 2) return 0;

    const distances: number[] = [];
    for (let i = 0; i < readings.length - 1; i++) {
        distances.push(
            calculateDistance(
                readings[i].lat,
                readings[i].lon,
                readings[i + 1].lat,
                readings[i + 1].lon
            )
        );
    }

    return Math.sqrt(
        distances.reduce((sum, dist) => sum + Math.pow(dist, 2), 0) / distances.length
    );
}

export function isWithinWorkArea(
    point: [number, number],
    center: [number, number],
    radius: number,
    restrictedAreas: Array<[number, number][]> = []
): boolean {
    // Check if within main work radius
    const distance = calculateDistance(point[0], point[1], center[0], center[1]);
    if (distance > radius) return false;

    // Check if not in restricted areas
    return !restrictedAreas.some(area => isLocationWithinPolygon(point, area));
}

export function validateLocationData(
    location: {
        latitude: number;
        longitude: number;
        accuracy?: number;
        altitude?: number;
        timestamp?: number;
    }
): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!isValidCoordinate(location.latitude, location.longitude)) {
        errors.push('Invalid coordinates');
    }

    if (location.accuracy && (location.accuracy <= 0 || location.accuracy > 100)) {
        errors.push('Suspicious accuracy value');
    }

    if (location.altitude && Math.abs(location.altitude) > 8848) { // Max height of Mt. Everest
        errors.push('Suspicious altitude value');
    }

    if (location.timestamp && location.timestamp > Date.now()) {
        errors.push('Future timestamp detected');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
export interface LocationHistory  {
    latitude: number;
    longitude: number;
    timestamp: number;
    accuracy?: number;
}

export function calculateLocationPattern(history: LocationHistory[]): {
    averageAccuracy: number;
    isStationary: boolean;
    suspiciousPattern: boolean;
} {
    if (history.length < 2) {
        return { averageAccuracy: 0, isStationary: true, suspiciousPattern: false };
    }

    const movements: number[] = [];
    const accuracies: number[] = [];
    let suspiciousJumps = 0;

    for (let i = 1; i < history.length; i++) {
        const distance = calculateDistance(
            history[i-1].latitude,
            history[i-1].longitude,
            history[i].latitude,
            history[i].longitude
        );
        movements.push(distance);

        if (history[i].accuracy) {
            accuracies.push(history[i].accuracy!);
        }

        const timeGap = (history[i].timestamp - history[i-1].timestamp) / 1000; // in seconds
        const speed = calculateSpeedBetweenPoints(
            history[i-1].latitude,
            history[i-1].longitude,
            history[i].latitude,
            history[i].longitude,
            timeGap
        );

        if (speed > 100) { // 100 km/h threshold
            suspiciousJumps++;
        }
    }

    const averageMovement = movements.reduce((a, b) => a + b, 0) / movements.length;
    const averageAccuracy = accuracies.length ? 
        accuracies.reduce((a, b) => a + b, 0) / accuracies.length : 
        0;

    return {
        averageAccuracy,
        isStationary: averageMovement < 10, // Less than 10 meters average movement
        suspiciousPattern: suspiciousJumps > 0
    };
}

export function isWithinGeofence(
    point: [number, number],
    geofence: {
        center: [number, number];
        radius: number;
        allowedZones?: [number, number][][];
        restrictedZones?: [number, number][][];
    }
): boolean {
    // Check main radius
    const withinRadius = calculateDistance(
        point[0],
        point[1],
        geofence.center[0],
        geofence.center[1]
    ) <= geofence.radius;

    if (!withinRadius) return false;

    // Check restricted zones
    if (geofence.restrictedZones?.some(zone => isLocationWithinPolygon(point, zone))) {
        return false;
    }

    // If allowed zones are specified, must be within at least one
    if (geofence.allowedZones?.length) {
        return geofence.allowedZones.some(zone => isLocationWithinPolygon(point, zone));
    }

    return true;
}

export function validateLocationSequence(
    locations: LocationHistory[],
    maxSpeed: number = 120 // km/h
): { valid: boolean; reason?: string } {
    if (locations.length < 2) return { valid: true };

    for (let i = 1; i < locations.length; i++) {
        const speed = calculateSpeedBetweenPoints(
            locations[i-1].latitude,
            locations[i-1].longitude,
            locations[i].latitude,
            locations[i].longitude,
            (locations[i].timestamp - locations[i-1].timestamp) / 1000
        );

        if (speed > maxSpeed) {
            return {
                valid: false,
                reason: `Suspicious movement detected: ${speed.toFixed(2)} km/h between points ${i-1} and ${i}`
            };
        }

        if (locations[i].timestamp <= locations[i-1].timestamp) {
            return {
                valid: false,
                reason: `Invalid timestamp sequence at point ${i}`
            };
        }
    }

    return { valid: true };
}