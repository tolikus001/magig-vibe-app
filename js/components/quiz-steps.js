import { QUIZ_CONFIG, QUIZ_QUESTIONS } from './quiz-data.js';

export function renderStartScreen(container, onStart) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="text-center pt-8">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> ${QUIZ_CONFIG.academy} • Экспресс-диагностика
        </span>
        <h1 class="text-2xl font-bold text-slate-100 mb-3 leading-tight">${QUIZ_CONFIG.title}</h1>
        <p class="text-sm text-slate-400 mb-6 leading-relaxed">${QUIZ_CONFIG.subtitle}</p>
        
        <div class="card text-left mb-6 space-y-3 border-indigo-500/20 bg-slate-900/60 backdrop-blur-md">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
              <i data-lucide="brain-circuit" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-xs font-semibold text-slate-200">6 вопросов практики</div>
              <div class="text-xs text-slate-400">Определите свой профиль работы с бессознательным</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <i data-lucide="award" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-xs font-semibold text-slate-200">Персональная рекомендация</div>
              <div class="text-xs text-slate-400">Подбор модулей курса эриксоновского гипноза в МАГиГ</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pb-6">
        <button id="start-btn" class="btn-primary w-full py-4 rounded-xl text-base font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
          Начать диагностику <i data-lucide="arrow-right" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  `;
  document.getElementById('start-btn').onclick = onStart;
}

export function renderQuestionScreen(container, step, onSelectOption, onBack) {
  const qIndex = step - 1;
  const q = QUIZ_QUESTIONS[qIndex];
  const progressPct = Math.round((step / QUIZ_QUESTIONS.length) * 100);

  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 fade-in">
      <div>
        <div class="flex items-center justify-between py-3 mb-4">
          <button id="back-btn" class="text-xs text-slate-400 flex items-center gap-1 hover:text-slate-200 transition-colors">
            <i data-lucide="chevron-left" class="w-4 h-4"></i> Назад
          </button>
          <span class="text-xs font-medium text-indigo-400">Вопрос ${step} из ${QUIZ_QUESTIONS.length}</span>
        </div>

        <div class="w-full bg-slate-800 rounded-full h-1.5 mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
        </div>

        <h2 class="text-lg font-semibold text-slate-100 mb-6 leading-snug">${q.title}</h2>

        <div class="space-y-3" id="options-list">
          ${q.options.map((opt, i) => `
            <button data-index="${i}" class="option-btn w-full p-4 text-left rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all flex items-start gap-3 group btn-press">
              <span class="w-6 h-6 rounded-full border border-slate-700 group-hover:border-indigo-400 flex items-center justify-center text-xs font-medium text-slate-400 group-hover:text-indigo-400 shrink-0 mt-0.5">${i + 1}</span>
              <span class="text-sm text-slate-200 leading-normal">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  document.getElementById('back-btn').onclick = onBack;
  container.querySelectorAll('.option-btn').forEach(btn => {
    btn.onclick = () => onSelectOption(q.options[parseInt(btn.dataset.index)].trait);
  });
}

export function renderLoadingScreen(container, onComplete) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-6 text-center fade-in">
      <div class="relative w-20 h-20 mb-6 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
        <i data-lucide="sparkles" class="w-8 h-8 text-indigo-400 pulse"></i>
      </div>
      <h3 class="text-lg font-semibold text-slate-100 mb-2">Анализ профиля практики...</h3>
      <p class="text-xs text-slate-400 max-w-xs">Формируем индивидуальную траекторию обучения в МАГиГ</p>
    </div>
  `;
  setTimeout(onComplete, 1200);
}
