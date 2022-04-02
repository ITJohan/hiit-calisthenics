import { steps, addClickHandler, changeSection, changeStep } from './utils.js';

let currentStep = 0;

// Main page
addClickHandler('start-btn', () => {
  changeStep(currentStep);
  changeSection('workout-page');
});

// Workout page
addClickHandler('back-btn', () => {
  if (currentStep === 0) {
    changeSection('main-page');
  } else {
    currentStep--;
    changeStep(currentStep);
  }
});

addClickHandler('next-btn', () => {
  if (currentStep === steps.length) {
    changeSection('finish-page');
  } else {
    currentStep++;
    changeStep(currentStep);
  }
});
