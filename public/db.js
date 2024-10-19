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

export function getLogsForExercise(/** @type {string} */ exerciseId) {
  /** @type {number[]} */
  const logs = JSON.parse(localStorage.getItem(exerciseId));

  return logs;
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

export function getNextProgressionSet(
  /** @type {string} */ progressionId,
  /** @type {string} */ exerciseId,
) {
  const progression = getProgression(progressionId);
  const progressionSet = progression.sets.find((set) =>
    set.exerciseId === exerciseId
  );
  const workout = getWorkout("d32b6d9c-8e2a-4b23-a261-19f17286e8f3");
  const noOfSets =
    workout.progressions.filter((progression) => progression === progressionId)
      .length;

  const logs = getLogsForExercise(exerciseId);

  const previousLogs = logs.slice(-3);

  if (previousLogs.every((log) => log === progressionSet.max)) {
    const currentLevel = progression.sets.indexOf(progressionSet);

    if (currentLevel === progression.sets.length - 1) {
      return progressionSet;
    }

    return progression.sets[currentLevel + 1];
  }

  if (previousLogs.every((log) => log < progressionSet.min)) {
    const currentLevel = progression.sets.indexOf(progressionSet);

    if (currentLevel === 0) {
      return progressionSet;
    }

    return progression.sets[currentLevel - 1];
  }

  return progressionSet;
}
