import { QUIZ_CONFIG, QUIZ_QUESTIONS, getQuizResult } from './quiz-data.js';
import { renderStartScreen, renderQuestionScreen, renderLoadingScreen } from './quiz-steps.js';

let state = { step: 0, answers: [] };

export function initQuiz(containerId = 'app') {
  const container = document.getElementById(containerId);
  if (!container) return;
  state = { step: 0, answers: [] };
  render(container);
}

function triggerHaptic() {
  if (window.NotibotBridge && window.NotibotBridge.haptics) {
    window.NotibotBridge.haptics.impact('light');
  }
}

function render(container) {
  if (state.step === 0) {
    renderStartScreen(container, () => {
      triggerHaptic();
      state.step = 1;
      render(container);
    });
  } else if (state.step > 0 && state.step <= QUIZ_QUESTIONS.length) {
    renderQuestionScreen(
      container,
      state.step,
      (trait) => {
        triggerHaptic();
        state.answers.push(trait);
        state.step++;
        render(container);
      },
      () => {
        triggerHaptic();
        state.step--;
        if (state.answers.length >= state.step) state.answers.pop();
        render(container);
      }
    );
  } else if (state.step === QUIZ_QUESTIONS.length + 1) {
    renderLoadingScreen(container, () => {
      state.step++;
      render(container);
    });
  } else {
    renderResult(container);
  }
  if (window.lucide) window.lucide.createIcons();
}

function renderResult(container) {
  const result = getQuizResult(state.answers);
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-4">
        <div class="text-center mb-6">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
            ${result.tag}
          </span>
          <h2 class="text-2xl font-bold text-slate-100 mb-1">${result.title}</h2>
          <p class="text-xs text-slate-400">Ваш результат диагностики практики</p>
        </div>

        <div class="card bg-slate-900/80 border-indigo-500/30 p-5 mb-4 space-y-4">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">Особенности вашей работы</div>
            <p class="text-sm text-slate-300 leading-relaxed">${result.desc}</p>
          </div>
          <div class="border-t border-slate-800 pt-3">
            <div class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">Рекомендация по обучению в МАГиГ</div>
            <p class="text-sm text-slate-300 leading-relaxed">${result.recommendation}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 mb-6">
          <div class="flex items-center gap-3">
            <i data-lucide="graduation-cap" class="w-6 h-6 text-indigo-400 shrink-0"></i>
            <div>
              <div class="text-xs font-bold text-slate-100">${QUIZ_CONFIG.courseTitle}</div>
              <div class="text-xs text-slate-300">Старт нового потока • Очно & Онлайн в МАГиГ</div>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-6 space-y-3">
        <button id="cta-btn" class="btn-primary w-full py-4 rounded-xl text-base font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
          Записаться на курс в МАГиГ <i data-lucide="check-circle" class="w-5 h-5"></i>
        </button>
        <button id="restart-btn" class="w-full py-3 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors text-center">
          Пройти тест заново
        </button>
      </div>
    </div>
  `;

  document.getElementById('cta-btn').onclick = () => {
    triggerHaptic();
    if (window.NotibotBridge && window.NotibotBridge.navigation) {
      window.NotibotBridge.navigation.openUrl('https://hypnoacademy.ru');
    } else {
      window.open('https://hypnoacademy.ru', '_blank');
    }
  };

  document.getElementById('restart-btn').onclick = () => {
    triggerHaptic();
    state = { step: 0, answers: [] };
    render(container);
  };
}
