import Calendar from './calendar/index.js';
const $containers = [...document.querySelectorAll('.calendar')];


$containers.forEach(($container) => {
  Calendar($container);
});