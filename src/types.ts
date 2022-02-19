export type Level = 0 | 1 | 2 | 3 | 4 | 5;
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
