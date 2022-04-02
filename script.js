import { addClickHandler } from './utils.js';

// Main page
addClickHandler('start-btn', () => {
  const sections = document.querySelectorAll('section');

  for (const section of sections) {
    if (section.id === 'workout-page') {
      section.classList.remove('hide');
    } else {
      section.classList.add('hide');
    }
  }
});

// Workout page
addClickHandler('back-btn', () => {
  console.log('back');
});
addClickHandler('next-btn', () => {
  console.log('next');
});
