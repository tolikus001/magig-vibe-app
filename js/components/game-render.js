import { GAME_CONFIG, GAME_CASES, getGameRank } from './game-data.js';

export function renderStartScreen(container, onStart) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="text-center pt-6">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
          <i data-lucide="gamepad-2" class="w-4 h-4"></i> ${GAME_CONFIG.title}
        </span>
        <h1 class="text-2xl font-bold text-slate-100 mb-3 leading-tight">Симулятор Терапевта</h1>
        <p class="text-xs text-slate-400 mb-6 leading-relaxed">${GAME_CONFIG.subtitle}</p>

        <div class="card bg-slate-900/70 border-indigo-500/20 text-left mb-6 space-y-3">
          <div class="text-xs font-bold uppercase tracking-wider text-indigo-400">Правила игры:</div>
          <ul class="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li class="flex items-start gap-2">
              <i data-lucide="shield" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
              <span>Сохраняйте <b>Энергию Сессии</b> (не тратьте силы на споры).</span>
            </li>
            <li class="flex items-start gap-2">
              <i data-lucide="heart" class="w-4 h-4 text-purple-400 shrink-0 mt-0.5"></i>
              <span>Повышайте <b>Доверие Бессознательного</b> в каждом из 5 кейсов.</span>
            </li>
            <li class="flex items-start gap-2">
              <i data-lucide="zap" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>
              <span>Найдите ключи трансового доступа в обход рационализации!</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pb-6">
        <button id="start-game-btn" class="btn-primary w-full py-4 rounded-xl text-base font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
          Войти в сессию <i data-lucide="play" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  `;
  document.getElementById('start-game-btn').onclick = onStart;
}

export function renderHud(hp, trust, currentCaseIndex) {
  const hpPct = Math.max(0, Math.min(100, hp));
  const trustPct = Math.max(0, Math.min(100, trust));
  return `
    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3 mb-4 space-y-2">
      <div class="flex items-center justify-between text-xs font-semibold">
        <span class="text-slate-400 flex items-center gap-1"><i data-lucide="user" class="w-3.5 h-3.5 text-indigo-400"></i> Кейс ${currentCaseIndex + 1} из 5</span>
        <span class="text-purple-400">Доверие: ${trustPct}%</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <div class="flex justify-between text-[10px] text-slate-400 mb-1"><span>Энергия сессии</span><span>${hpPct} HP</span></div>
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div class="bg-emerald-500 h-2 rounded-full transition-all duration-300" style="width: ${hpPct}%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-[10px] text-slate-400 mb-1"><span>Доверие клиентов</span><span>${trustPct}%</span></div>
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div class="bg-purple-500 h-2 rounded-full transition-all duration-300" style="width: ${trustPct}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderCaseScreen(container, caseData, hp, trust, currentCaseIndex, onChoiceSelect) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 fade-in">
      <div>
        ${renderHud(hp, trust, currentCaseIndex)}

        <div class="card bg-slate-900/80 border-indigo-500/30 mb-4 p-4">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <i data-lucide="${caseData.avatar}" class="w-4 h-4"></i>
            </div>
            <span class="text-xs font-bold text-slate-200">${caseData.clientName}</span>
          </div>
          <p class="text-sm font-medium text-amber-200/90 italic bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 leading-relaxed">
            ${caseData.quote}
          </p>
        </div>

        <div class="text-xs font-semibold text-slate-400 mb-2">Выберите стратегию терапевта:</div>
        <div class="space-y-2.5">
          ${caseData.choices.map((c, i) => `
            <button data-index="${i}" class="choice-btn w-full p-3.5 text-left rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all text-xs text-slate-200 leading-normal btn-press">
              ${c.text}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.choice-btn').forEach(btn => {
    btn.onclick = () => onChoiceSelect(caseData.choices[parseInt(btn.dataset.index)]);
  });
}
