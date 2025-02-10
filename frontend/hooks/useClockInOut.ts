'use client'
import { useState } from 'react';
import { useShifts } from '@/contexts/ShiftContext';
import { clockInService } from '@/services/clockInService';
import { ClockInRequest, ClockOutRequest } from '@/types';

export const useClockInOut = () => {
  const { state, dispatch } = useShifts();
  const [error, setError] = useState<string | null>(null);

  const clockIn = async (shiftId: string, userId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Verify shift is approved
      const shift = state.myShifts.find(s => s.id === shiftId);
    
      
      if (!shift || shift.status !== 'approved') {
        throw new Error('Shift not approved for clock-in');
      }

      // Request clock-in with security checks
      const clockInRequest = await clockInService.requestClockIn(shiftId, userId);
      console.log(clockInRequest)
      // Verify location
      const locationValid = await verifyLocation(
        clockInRequest.location,
        shift.location
      );

      if (!locationValid) {
        throw new Error('Location verification failed');
      }

      dispatch({
        type: 'CLOCK_IN_SUCCESS',
        payload: {
          shiftId,
          startTime: clockInRequest.timestamp,
          location: clockInRequest.location,
        },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Clock-in failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      setError(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clockOut = async (shiftId: string, userId: string, notes?: string) => {
    // Similar implementation for clock-out
    // ...
  };

  return {
    clockIn,
    clockOut,
    error,
    isLoading: state.loading,
    activeClockIn: state.activeClockIn,
  };
};