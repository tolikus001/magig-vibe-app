// js/app.js - Точка входа приложения
// Задействованные подмодули квиза: quiz-data.js, quiz-steps.js
import { initQuiz } from './components/quiz.js';
import { initIcons } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initQuiz('app');
  initIcons();
});
