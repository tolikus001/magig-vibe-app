import { GAME_CONFIG, GAME_CASES, getGameRank } from './game-data.js';
import { renderStartScreen, renderCaseScreen } from './game-render.js';

let gameState = { currentCase: 0, hp: 100, trust: 50, inFeedback: false, lastFeedback: null };

export function initGame(containerId = 'app') {
  const container = document.getElementById(containerId);
  if (!container) return;
  gameState = { currentCase: 0, hp: 100, trust: 50, inFeedback: false, lastFeedback: null };
  render(container);
}

function triggerHaptic() {
  if (window.NotibotBridge && window.NotibotBridge.haptics) {
    window.NotibotBridge.haptics.impact('light');
  }
}

function render(container) {
  if (gameState.currentCase === -1) {
    renderStartScreen(container, () => { triggerHaptic(); gameState.currentCase = 0; render(container); });
  } else if (gameState.inFeedback) {
    renderFeedbackScreen(container);
  } else if (gameState.currentCase < GAME_CASES.length) {
    renderCaseScreen(container, GAME_CASES[gameState.currentCase], gameState.hp, gameState.trust, gameState.currentCase, (choice) => {
      triggerHaptic();
      gameState.hp = Math.max(0, Math.min(100, gameState.hp + choice.hpDelta));
      gameState.trust = Math.max(0, Math.min(100, gameState.trust + choice.trustDelta));
      gameState.lastFeedback = choice;
      gameState.inFeedback = true;
      render(container);
    });
  } else {
    renderResultScreen(container);
  }
  if (window.lucide) window.lucide.createIcons();
}

function renderFeedbackScreen(container) {
  const f = gameState.lastFeedback;
  const isPos = f.hpDelta > 0 || f.trustDelta > 0;
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 fade-in">
      <div class="pt-8 text-center">
        <div class="w-14 h-14 rounded-full ${isPos ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'} border flex items-center justify-center mx-auto mb-4">
          <i data-lucide="${isPos ? 'sparkles' : 'alert-circle'}" class="w-7 h-7"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-100 mb-2">${isPos ? 'Отличный трансовый подход!' : 'Сопротивление возросло!'}</h3>
        <div class="card bg-slate-900/80 border-slate-800 p-4 mb-6 text-sm text-slate-300 leading-relaxed text-left">${f.feedback}</div>
        <div class="flex justify-center gap-4 text-xs font-semibold">
          <span class="${f.hpDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}">Энергия: ${f.hpDelta > 0 ? '+' : ''}${f.hpDelta} HP</span>
          <span class="${f.trustDelta >= 0 ? 'text-purple-400' : 'text-rose-400'}">Доверие: ${f.trustDelta > 0 ? '+' : ''}${f.trustDelta}%</span>
        </div>
      </div>
      <div class="pb-6">
        <button id="next-case-btn" class="btn-primary w-full py-4 rounded-xl text-base font-semibold shadow-lg flex items-center justify-center gap-2">
          Следующий случай <i data-lucide="arrow-right" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  `;
  document.getElementById('next-case-btn').onclick = () => {
    triggerHaptic();
    gameState.inFeedback = false;
    gameState.currentCase++;
    render(container);
  };
}

function renderResultScreen(container) {
  const rank = getGameRank(gameState.hp, gameState.trust);
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-6">
        <div class="text-center mb-6">
          <span class="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">${rank.badge}</span>
          <h2 class="text-2xl font-bold text-slate-100 mb-1">${rank.title}</h2>
          <p class="text-xs text-slate-400">Итог прохождения симулятора сессий</p>
        </div>
        <div class="card bg-slate-900/80 border-indigo-500/30 p-4 mb-4 space-y-3">
          <p class="text-sm text-slate-300 leading-relaxed">${rank.desc}</p>
          <div class="border-t border-slate-800 pt-3 flex justify-around text-xs font-semibold">
            <span class="text-emerald-400">Сохранено HP: ${gameState.hp}</span>
            <span class="text-purple-400">Доверие: ${gameState.trust}%</span>
          </div>
        </div>
        <div class="p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 mb-6">
          <div class="flex items-center gap-3">
            <i data-lucide="graduation-cap" class="w-6 h-6 text-indigo-400 shrink-0"></i>
            <div>
              <div class="text-xs font-bold text-slate-100">${GAME_CONFIG.courseTitle}</div>
              <div class="text-xs text-slate-300">Освойте паттерны трансового доступа в МАГиГ</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pb-6 space-y-3">
        <button id="cta-game-btn" class="btn-primary w-full py-4 rounded-xl text-base font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
          Записаться на курс в МАГиГ <i data-lucide="check-circle" class="w-5 h-5"></i>
        </button>
        <button id="restart-game-btn" class="w-full py-3 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors text-center">Сыграть заново</button>
      </div>
    </div>
  `;
  document.getElementById('cta-game-btn').onclick = () => {
    triggerHaptic();
    if (window.NotibotBridge && window.NotibotBridge.navigation) { window.NotibotBridge.navigation.openUrl('https://magig.ru'); }
    else { window.open('https://magig.ru', '_blank'); }
  };
  document.getElementById('restart-game-btn').onclick = () => { triggerHaptic(); initGame('app'); };
}
