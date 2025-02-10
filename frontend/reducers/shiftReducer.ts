import { ShiftState, ShiftAction } from '@/types';

export const shiftReducer = (state: ShiftState, action: ShiftAction): ShiftState => {
  switch (action.type) {
    case 'SET_AVAILABLE_SHIFTS':
      return { ...state, availableShifts: action.payload };
    case 'SET_MY_SHIFTS':
      return { ...state, myShifts: action.payload };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'APPLY_FOR_SHIFT':
      return {
        ...state,
        availableShifts: state.availableShifts.map(shift =>
          shift.id === action.payload
            ? { ...shift, status: 'pending' }
            : shift
        )
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};