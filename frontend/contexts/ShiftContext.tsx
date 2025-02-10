'use client'
import React, { createContext, useContext, useReducer } from 'react';
import { Shift, ShiftPreference } from '@/types';
import { shiftReducer } from '@/reducers/shiftReducer';
import ShiftPreferences from '@/components/dashboard/ShiftPreferences';
import { mockShifts } from '@/data/mockData';

  

interface ShiftState {
  availableShifts: Shift[];
  myShifts: Shift[];
  preferences: ShiftPreference;
  loading: boolean;
  error: string | null;
}

type ShiftAction =
  | { type: 'SET_AVAILABLE_SHIFTS'; payload: Shift[] }
  | { type: 'SET_MY_SHIFTS'; payload: Shift[] }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<ShiftPreference> }
  | { type: 'APPLY_FOR_SHIFT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };



const initialState: ShiftState = {
    availableShifts: [],
    myShifts: mockShifts,
    preferences: {
      shiftPreference: '',
      preferredDays: [],
      preferredStartTime: '',
      preferredEndTime: '',
    },
    loading: false,
    error: null,
  };

const ShiftContext = createContext<{
  state: ShiftState;
  dispatch: React.Dispatch<ShiftAction>;
} | null>(null);

export const ShiftProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(shiftReducer, initialState);

  return (
    <ShiftContext.Provider value={{ state, dispatch }}>
      {children}
    </ShiftContext.Provider>
  );
};

export const useShifts = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShifts must be used within a ShiftProvider');
  }
  return context;
};