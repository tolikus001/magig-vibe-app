// js/app.js - Главная точка входа приложения с выбором режима
// Подмодули: home-hub.js, game.js, quiz.js, iching.js
// Дополнительные: game-data.js, game-render.js, quiz-data.js, quiz-steps.js, iching-data.js, iching-hexagrams.js, iching-hexagrams-2.js, iching-render-overview.js, iching-render-ritual.js, iching-render-result.js
import { renderHomeHub } from './components/home-hub.js';
import { initGame } from './components/game.js';
import { initQuiz } from './components/quiz.js';
import { initIching } from './components/iching.js';
import { initIcons } from './utils.js';

let currentMode = 'home';

function renderApp() {
  const container = document.getElementById('app');
  if (!container) return;

  if (currentMode === 'home') {
    renderHomeHub(container, {
      onSelectIching: () => { currentMode = 'iching'; renderApp(); },
      onSelectGame: () => { currentMode = 'game'; renderApp(); },
      onSelectQuiz: () => { currentMode = 'quiz'; renderApp(); }
    });
  } else if (currentMode === 'iching') {
    initIching('app');
    addHomeButton(container);
  } else if (currentMode === 'game') {
    initGame('app');
    addHomeButton(container);
  } else if (currentMode === 'quiz') {
    initQuiz('app');
    addHomeButton(container);
  }
  initIcons();
}

function addHomeButton(container) {
  const navHeader = document.createElement('div');
  navHeader.className = 'max-w-md mx-auto px-5 pt-3 flex justify-between items-center text-xs';
  navHeader.innerHTML = `
    <button id="btn-go-home" class="text-slate-400 hover:text-amber-300 flex items-center gap-1 py-1 transition-colors font-medium">
      <i data-lucide="home" class="w-4 h-4"></i> Главное меню
    </button>
    <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">МАГиГ</span>
  `;
  container.prepend(navHeader);
  document.getElementById('btn-go-home').onclick = () => {
    currentMode = 'home';
    renderApp();
  };
}

document.addEventListener('DOMContentLoaded', renderApp);
