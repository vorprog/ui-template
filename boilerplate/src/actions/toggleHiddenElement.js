module.exports = (elementId) => {
  const targetElement = document.getElementById(elementId);
  targetElement.classList.contains(`hidden`) ?
    targetElement.classList.remove(`hidden`) : targetElement.classList.add(`hidden`);
};
