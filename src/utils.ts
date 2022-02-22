import { Level, WorkoutType } from './types';

export const isLevel = (value: unknown): value is Level => {
  switch (value) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return true;
    default:
      return false;
  }
};

export const isWorkoutType = (value: unknown): value is WorkoutType =>
  value === 'A' || value === 'B';
