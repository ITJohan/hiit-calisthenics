const workoutsRes = await fetch("./data/workouts.json");
const progressionsRes = await fetch("./data/progressions.json");
const exercisesRes = await fetch("./data/exercises.json");

/** @type {Workout[]} */
const workouts = await workoutsRes.json();
/** @type {Progression[]} */
const progressions = await progressionsRes.json();
/** @type {Exercise[]} */
const exercises = await exercisesRes.json();

export function getWorkouts() {
  return workouts;
}

export function getWorkout(/** @type {string} */ id) {
  return workouts.find((workout) => workout.id === id);
}

export function getProgressions() {
  return progressions;
}

export function getProgression(/** @type {string} */ id) {
  return progressions.find((progression) => progression.id === id);
}

export function getProgressionsFromCategory(/** @type {Category} */ category) {
  const progressions = getProgressions();
  return progressions.filter(
    (progression) => progression.category === category,
  );
}

export function getExercises() {
  return exercises;
}

export function getExercise(/** @type {string} */ id) {
  return exercises.find((exercise) => exercise.id === id);
}

export function addRepsToExercise(
	/** @type {string} */ exerciseId,
	/** @type {number} */ reps,
) {
  const repsForExercise = JSON.parse(localStorage.getItem(exerciseId));

  if (repsForExercise === null) {
    localStorage.setItem(exerciseId, JSON.stringify([reps]));
    return;
  }

  localStorage.setItem(exerciseId, JSON.stringify([...repsForExercise, reps]));
}
