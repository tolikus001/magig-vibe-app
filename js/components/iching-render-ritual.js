// js/components/iching-render-ritual.js - Экран интерактивного ритуала подбрасывания монет

export function renderRitualScreen(container, state, handlers) {
  const lineNames = ["1-я линия (Основание)", "2-я линия (Формирование)", "3-я линия (Проявление)", "4-я линия (Переход)", "5-я линия (Пик силы)", "6-я линия (Завершение)"];
  const progressPercent = Math.round((state.currentLineIndex / 6) * 100);

  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 fade-in">
      <div>
        <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-3 mb-4 space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold">
            <span class="text-amber-400 flex items-center gap-1"><i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Ритуал Гадания</span>
            <span class="text-slate-400">Шаг ${state.currentLineIndex + 1} из 6</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 transition-all duration-300" style="width: ${progressPercent}%"></div>
          </div>
        </div>

        <div class="card bg-slate-900/80 border-amber-500/30 p-4 mb-4 text-center">
          <div class="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">Строящаяся Гексаграмма</div>
          <div class="w-48 mx-auto space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800 my-2">
            ${[5, 4, 3, 2, 1, 0].map(idx => renderHexagramLineItem(idx + 1, state.lines[idx], idx === state.currentLineIndex)).join('')}
          </div>
          <div class="text-xs text-slate-400 mt-2 font-medium">
            ${state.currentLineIndex < 6 ? `Строится: <span class="text-amber-300 font-bold">${lineNames[state.currentLineIndex]}</span>` : 'Гексаграмма построена!'}
          </div>
        </div>

        <div class="card bg-gradient-to-b from-amber-950/30 to-slate-900/90 border-amber-500/20 p-5 text-center relative overflow-hidden">
          <div class="text-xs text-slate-300 font-semibold mb-4">Сосредоточьтесь на дне и подбросьте 3 древние монеты</div>
          <div class="flex justify-center items-center gap-4 my-4 py-2">
            ${[0, 1, 2].map(i => {
              const val = state.lastCoins[i] || 3;
              const isYang = val === 3;
              return `
                <div class="coin-item w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-200 shadow-lg shadow-amber-500/20 flex flex-col items-center justify-center text-slate-950 font-black text-sm select-none transition-transform duration-500 ${state.coinsFlipping ? 'animate-bounce scale-110 rotate-180' : ''}">
                  <span class="text-[10px] font-bold uppercase text-amber-950">${isYang ? 'ЯН' : 'ИНЬ'}</span>
                  <span class="text-lg leading-none">${isYang ? '☯' : '☷'}</span>
                  <span class="text-[9px] opacity-75">${isYang ? '3 очка' : '2 очка'}</span>
                </div>
              `;
            }).join('')}
          </div>
          <div class="h-8 flex items-center justify-center text-xs font-semibold text-amber-300">
            ${state.currentLineIndex > 0 && !state.coinsFlipping ? `Сумма: ${state.lines[state.currentLineIndex - 1]} очков — ${getLineDescription(state.lines[state.currentLineIndex - 1])}` : 'Сосредоточьтесь на дне...'}
          </div>
        </div>
      </div>

      <div class="pb-6 pt-4">
        <button id="btn-flip-coins" ${state.coinsFlipping ? 'disabled' : ''} class="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 bg-gradient-to-r from-amber-600 to-yellow-600">
          <i data-lucide="coins" class="w-5 h-5"></i>
          ${state.coinsFlipping ? 'Монеты крутятся...' : `Бросить монеты (${lineNames[state.currentLineIndex] || ''})`}
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-flip-coins').onclick = handlers.onFlipCoins;
}

function renderHexagramLineItem(lineNum, val, isCurrent) {
  if (val === undefined) {
    return `<div class="flex items-center gap-2 opacity-30 ${isCurrent ? 'animate-pulse opacity-80' : ''}"><span class="text-[9px] text-slate-500 font-mono w-4">${lineNum}</span><div class="h-2.5 flex-1 bg-slate-800 rounded border border-dashed border-slate-700"></div></div>`;
  }
  const isYang = val === 7 || val === 9;
  const isChanging = val === 6 || val === 9;
  if (isYang) {
    return `<div class="flex items-center gap-2"><span class="text-[9px] text-slate-400 font-mono w-4">${lineNum}</span><div class="h-2.5 flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded flex items-center justify-center relative shadow-sm shadow-amber-500/20">${isChanging ? '<span class="w-2 h-2 rounded-full bg-slate-950"></span>' : ''}</div></div>`;
  } else {
    return `<div class="flex items-center gap-2"><span class="text-[9px] text-slate-400 font-mono w-4">${lineNum}</span><div class="h-2.5 flex-1 flex gap-2"><div class="h-full flex-1 bg-slate-300 rounded shadow-sm"></div><div class="h-full flex-1 bg-slate-300 rounded shadow-sm flex items-center justify-center">${isChanging ? '<span class="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>' : ''}</div></div></div>`;
  }
}

function getLineDescription(val) {
  if (val === 6) return 'Старая Инь (Изменяющаяся черта)';
  if (val === 7) return 'Молодой Ян (Стабильная черта)';
  if (val === 8) return 'Молодая Инь (Стабильная черта)';
  if (val === 9) return 'Старый Ян (Изменяющаяся черта)';
  return '';
}
