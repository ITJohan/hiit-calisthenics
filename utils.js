export const addClickHandler = (elementId, callback) => {
  const element = document.getElementById(elementId);
  element.addEventListener('click', callback);
};
