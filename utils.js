export const steps = [
  {
    exercise: 'Jumping jacks',
    type: 'permanent',
    maxReps: 10,
    minReps: 0,
  },
  {
    exercise: 'Pistol squats',
    type: 'input',
    maxReps: 10,
    minReps: 0,
  },
  {
    exercise: 'Pull ups',
    type: 'input',
    maxReps: 10,
    minReps: 0,
  },
  {
    exercise: 'Push ups',
    type: 'input',
    maxReps: 10,
    minReps: 0,
  },
  {
    exercise: 'Rest',
    type: 'countdown',
    maxReps: 90,
    minReps: 0,
  },
  {
    exercise: 'Pistol squats',
    type: 'input',
    maxReps: 10,
    minReps: 0,
  },
  {
    exercise: 'Pull ups',
    type: 'input',
    maxReps: 10,
    minReps: 0,
  },
  {
    exercise: 'Push ups',
    type: 'input',
    maxReps: 10,
    minReps: 0,
  },
];

export const addClickHandler = (elementId, callback) => {
  const element = document.getElementById(elementId);
  element.addEventListener('click', callback);
};

export const changeSection = (sectionId) => {
  const sections = document.querySelectorAll('section');

  for (const section of sections) {
    if (section.id === sectionId) {
      section.classList.remove('hide');
    } else {
      section.classList.add('hide');
    }
  }
};

export const changeStep = (stepId) => {
  const exerciseTitle = document.querySelector('#workout-page h1');
  const exerciseImage = document.querySelector('#workout-page main');
  const exerciseInput = document.querySelector('#workout-page footer span');

  exerciseTitle.textContent = steps[stepId].exercise;
  exerciseImage.textContent = steps[stepId].exercise;
  exerciseInput.textContent = steps[stepId].maxReps;
};
