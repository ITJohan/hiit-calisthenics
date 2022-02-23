export type Level = 0 | 1 | 2 | 3 | 4 | 5;
export type Reps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type WorkoutType = 'A' | 'B';
export type InputType = 'none' | 'cooldown' | 'reps';

export interface Step {
  headerText: string;
  image: string;
  inputValue: number;
  inputType: InputType;
  buttonText: string;
  previousId: number;
  nextId: number;
}

export interface Workout {
  date: Date;
  workoutType: WorkoutType;
  leg: {
    level: Level;
    sets: Reps[];
  };
  pull: {
    level: Level;
    sets: Reps[];
  };
  push: {
    level: Level;
    sets: Reps[];
  };
}
