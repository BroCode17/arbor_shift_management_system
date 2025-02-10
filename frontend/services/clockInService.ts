import { ClockInRequest, ClockOutRequest, GeoLocation, ShiftLocation } from '@/types';
import { getDeviceFingerprint } from '@/utils/deviceFingerprint';

const ALLOWED_DISTANCE = 50; // meters

const calculateDistance = (loc1: GeoLocation, loc2: GeoLocation): number => {
  // Haversine formula to calculate distance between two points
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (loc1.latitude * Math.PI) / 180;
  const φ2 = (loc2.latitude * Math.PI) / 180;
  const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
  const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const verifyLocation = async (userLocation: GeoLocation, shiftLocation: ShiftLocation): Promise<boolean> => {
    const distance = calculateDistance(userLocation, shiftLocation.coordinates);
    console.log(distance)
  return distance <= ALLOWED_DISTANCE;
};

export const clockInService = {
  async requestClockIn(shiftId: string, userId: string): Promise<ClockInRequest> {
    try {
      // Get current position with high accuracy
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      });

      // Get device fingerprint
      const deviceId = await getDeviceFingerprint();

      // Request biometric verification if available
      let biometricVerified = false;
      if (window.PublicKeyCredential) {
        biometricVerified = await this.verifyBiometrics();
      }

      const clockInRequest: ClockInRequest = {
        shiftId,
        userId,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        },
        deviceId,
        timestamp: Date.now(),
        biometricVerified,
      };

      return clockInRequest;
    } catch (error) {
      throw new Error('Failed to initialize clock-in request');
    }
  },

  async verifyBiometrics(): Promise<boolean> {
    try {
      // WebAuthn implementation
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32),
        allowCredentials: [],
        timeout: 60000,
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      return !!assertion;
    } catch {
      return false;
    }
  },
};