import { Level, Step, WorkoutType } from './types';

const exercises = {
  A: {
    leg: {
      0: 'Squat',
      1: 'High bench pistol squat',
      2: 'Low bench pistol squat',
      3: 'High elevated pistol squat',
      4: 'Low elevated pistol squat',
      5: 'Pistol squat',
    },
    push: {
      0: 'Push up',
      1: 'Pseudo planche push up',
      2: 'Tuck planche',
      3: 'Adv. tuck planche',
      4: 'Straddle planche',
      5: 'Planche',
    },
    pull: {
      0: 'Tuck front lever',
      1: 'Adv. front lever',
      2: 'One leg front lever',
      3: 'Halv front lever',
      4: 'Straddle front lever',
      5: 'Front lever',
    },
  },
  B: {
    leg: {
      0: 'Foot down schrimp squat',
      1: 'Foot up schrimp squat',
      2: 'Negative one arm schrimp squat',
      3: 'One arm schrimp squat',
      4: 'Negative schrimp squat',
      5: 'Schrimp squat',
    },
    push: {
      0: 'Pike push up',
      1: 'Adv. pike push up',
      2: 'Half wall handstand pushup',
      3: 'Wall handstand pushup',
      4: 'Half handstand pushup',
      5: 'Handstand pushups',
    },
    pull: {
      0: 'Pull up',
      1: 'Pull up to chest',
      2: 'Pull up to waist',
      3: 'Jumping muscle up',
      4: 'Kipping muscle up',
      5: 'Muscle up',
    },
  },
};

export const generateSteps = (
  legLevel: Level,
  pushLevel: Level,
  pullLevel: Level,
  sets: number,
  type: WorkoutType
) => {
  const steps: Step[] = [];

  steps.push({
    headerText: 'Sun salutation',
    image: './src/images/jumping-jacks.jpg',
    inputType: 'none',
    buttonText: 'Done',
    previousId: -1,
    nextId: 1,
  });

  for (let i = 0; i < sets; i++) {
    steps.push({
      headerText: exercises[type].leg[legLevel],
      image: './src/images/jumping-jacks.jpg',
      inputValue: legLevel,
      inputType: 'reps',
      buttonText: 'Done',
      previousId: steps.length - 1,
      nextId: steps.length + 1,
    });
    steps.push({
      headerText: exercises[type].push[pushLevel],
      image: './src/images/jumping-jacks.jpg',
      inputValue: pushLevel,
      inputType: 'reps',
      buttonText: 'Done',
      previousId: steps.length - 1,
      nextId: steps.length + 1,
    });
    steps.push({
      headerText: exercises[type].pull[pullLevel],
      image: './src/images/jumping-jacks.jpg',
      inputValue: pullLevel,
      inputType: 'reps',
      buttonText: 'Done',
      previousId: steps.length - 1,
      nextId: steps.length + 1,
    });

    if (i !== sets - 1) {
      steps.push({
        headerText: 'Rest',
        image: './src/images/jumping-jacks.jpg',
        inputType: 'cooldown',
        buttonText: 'Done',
        previousId: steps.length - 1,
        nextId: steps.length + 1,
      });
    }
  }

  steps.push({
    headerText: 'Nice job!',
    image: './src/images/jumping-jacks.jpg',
    inputValue: 6,
    inputType: 'none',
    buttonText: 'Finish',
    previousId: steps.length - 1,
    nextId: -1,
  });

  return steps;
};
