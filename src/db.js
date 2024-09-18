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

export function getExercises() {
	return exercises;
}

export function getExercise(/** @type {string} */ id) {
	return exercises.find((exercise) => exercise.id === id);
}
