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
  const exercise = exercises.find((exercise) => exercise.id === id);

  if (exercise === undefined) throw new Error("Could not find exercise");

  return exercise;
}

/** @returns {number[][]} */
export function getLogs(/** @type {string} */ exerciseId) {
  return JSON.parse(localStorage.getItem(exerciseId) ?? "[]");
}

export function addRepsToExercise(
  /** @type {string} */ exerciseId,
  /** @type {number[]} */ sets,
) {
  const logs = getLogs(exerciseId);
  localStorage.setItem(exerciseId, JSON.stringify([...logs, sets]));
}

export function getNextProgressionSet(/** @type {Category} */ category) {
  const progressions = getProgressionsFromCategory(category);
  // TODO: get chosen progression from category
  const progression = progressions[0];

  const uncompletedProgressionSet = progression.progressionSets.find(
    (progressionSet) => {
      const logs = getLogs(progressionSet.exerciseId);
      const log = logs.findLast((log) => log.length === progression.noOfSets);

      if (log === undefined) return true; // Exercise hasn't been logged yet so start with this one
      if (log.every((set) => set === progressionSet.max)) return false; // Completed, so continue to check next

      return true;
    },
  );

  // TODO: handle completed last exercise

  return uncompletedProgressionSet === undefined
    ? progression.progressionSets[0]
    : uncompletedProgressionSet;
}
