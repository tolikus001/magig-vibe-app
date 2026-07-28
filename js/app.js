// js/app.js - Точка входа симулятора
// Модули игры: game-data.js, game-render.js, game.js
// Дополнительные модули: quiz-data.js, quiz-steps.js, quiz.js
import { initGame } from './components/game.js';
import { initIcons } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initGame('app');
  initIcons();
});
