type Athlete = {
  athlete_id: number,
  athlete_email: string,
  athlete_name: string,
};

type Workout = {
  workout_id: number,
  workout_name: string,
  athlete_id: number,
};

type Category = 'pull' | 'push' | 'legs' | 'core';

type Exercise = {
  exercise_id: number,
  exercise_name: string,
  exercise_category: Category,
  exercise_level: number,
};

type Log = {
  log_id: number,
  log_date: Date,
  athlete_id: number,
};

type LogExercise = {
  log_reps: number,
  exercise_id: number,
  log_id: number,
};

type WorkoutExercise = {
  set_order: number,
  exercise_order: number,
  workout_id: number,
  exercise_id: number,
};

interface ICreateWorkoutForm extends HTMLElement {}

interface ICreateWorkoutSet extends HTMLElement {
  setId: string,
  resetExercises(): void,
}

interface ICreateSetExercise extends HTMLElement {
  setId: string,
  exerciseId: string,
}

