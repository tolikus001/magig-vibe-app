// js/components/iching-render-result.js - Экран детального прогноза Гексаграммы Дня
import { getDailyForecast } from './iching-data.js';

export function renderForecastResultScreen(container, state, handlers) {
  const f = state.forecastData || getDailyForecast(state.selectedDate);
  const h = f.hexagram;

  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-2">
        <div class="flex items-center justify-between mb-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
          <div>
            <div class="text-[10px] text-amber-400 uppercase font-semibold">Гексаграмма дня</div>
            <div class="text-xs font-bold text-slate-200 capitalize">${f.formattedDate}</div>
          </div>
          <button id="btn-change-date" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 border border-slate-700 transition-colors flex items-center gap-1">
            <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-400"></i> Сменить дату
          </button>
        </div>

        <div class="card bg-gradient-to-br from-amber-950/40 via-slate-900/95 to-slate-900/95 border-amber-500/40 p-5 mb-5 shadow-xl shadow-amber-500/10">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">Гексаграмма №${h.number}</span>
              <h3 class="text-lg font-bold text-slate-100 leading-snug">${h.nameRu}</h3>
              <div class="text-xs text-amber-400/90 font-mono mt-0.5">${h.nameZh}</div>
            </div>
            <div class="w-16 bg-slate-950 p-2.5 rounded-xl border border-amber-500/30 shrink-0 space-y-1.5 shadow-inner">
              ${[5, 4, 3, 2, 1, 0].map(idx => {
                const lineVal = f.lines[idx];
                const isYang = lineVal === 7 || lineVal === 9;
                return isYang
                  ? `<div class="h-2 bg-gradient-to-r from-amber-400 to-yellow-300 rounded"></div>`
                  : `<div class="h-2 flex gap-1"><div class="h-full flex-1 bg-slate-300 rounded"></div><div class="h-full flex-1 bg-slate-300 rounded"></div></div>`;
              }).join('')}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 mb-4">
            <div><span class="text-[10px] text-slate-400 font-semibold uppercase">Верхняя Триграмма</span><div class="font-bold text-amber-300">${h.upperTrigram.symbol} ${h.upperTrigram.name}</div></div>
            <div><span class="text-[10px] text-slate-400 font-semibold uppercase">Нижняя Триграмма</span><div class="font-bold text-amber-300">${h.lowerTrigram.symbol} ${h.lowerTrigram.name}</div></div>
          </div>

          <div class="bg-amber-500/10 border-l-2 border-amber-400 p-3 rounded-r-xl text-xs text-amber-200/90 italic mb-3">${h.quote}</div>
          <p class="text-xs text-slate-300 leading-relaxed font-medium">${h.dailyOverview}</p>
        </div>

        <div class="card bg-gradient-to-br from-indigo-950/50 via-slate-900/90 to-purple-950/50 border-indigo-500/40 p-4 mb-4 shadow-md">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0"><i data-lucide="brain" class="w-4 h-4"></i></div>
            <div><h4 class="text-xs font-bold text-indigo-300 uppercase">Инсайт Бессознательного (МАГиГ)</h4><span class="text-[10px] text-slate-400">Практический фокус для транса</span></div>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${h.hypnoInsight}</p>
        </div>

        <div class="space-y-3 mb-5">
          <div class="text-xs font-bold text-slate-300 uppercase px-1">Прогноз по сферам жизни</div>
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
            <div class="flex items-center gap-2 font-bold text-amber-300"><i data-lucide="zap" class="w-4 h-4 text-amber-400"></i> Энергия и Состояние</div>
            <p class="text-slate-300 text-[11px] leading-relaxed pl-6">${h.spheres.energy}</p>
          </div>
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
            <div class="flex items-center gap-2 font-bold text-indigo-300"><i data-lucide="briefcase" class="w-4 h-4 text-indigo-400"></i> Дела и Решения</div>
            <p class="text-slate-300 text-[11px] leading-relaxed pl-6">${h.spheres.business}</p>
          </div>
          <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
            <div class="flex items-center gap-2 font-bold text-pink-300"><i data-lucide="heart" class="w-4 h-4 text-pink-400"></i> Отношения и Общение</div>
            <p class="text-slate-300 text-[11px] leading-relaxed pl-6">${h.spheres.relations}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-xs">
            <div class="font-bold text-emerald-400 flex items-center gap-1 mb-1.5"><i data-lucide="check-circle-2" class="w-4 h-4"></i> Что сделать</div>
            <ul class="space-y-1 text-[11px] text-slate-300 pl-1">${h.dos.map(item => `<li>• ${item}</li>`).join('')}</ul>
          </div>
          <div class="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 text-xs">
            <div class="font-bold text-rose-400 flex items-center gap-1 mb-1.5"><i data-lucide="alert-triangle" class="w-4 h-4"></i> Чего избегать</div>
            <ul class="space-y-1 text-[11px] text-slate-300 pl-1">${h.donts.map(item => `<li>• ${item}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="card bg-slate-900/80 border-slate-800 p-4 mb-6 text-xs space-y-2">
          <div class="flex justify-between items-center text-amber-300 font-bold border-b border-slate-800 pb-2"><span>✨ Талисман Дня</span><span class="text-[10px] text-slate-400">Стихия: ${h.talisman.element}</span></div>
          <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-300"><div>🎨 <span class="text-slate-400">Цвет:</span> ${h.talisman.color}</div><div>⏰ <span class="text-slate-400">Пик силы:</span> ${h.talisman.time}</div></div>
          <div class="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-center font-medium text-amber-200 text-[11px]">«${h.talisman.affirmation}»</div>
        </div>
      </div>

      <div class="pb-6 space-y-3">
        <button id="btn-share" class="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"><i data-lucide="share-2" class="w-4 h-4"></i> Поделиться прогнозом</button>
        <div class="grid grid-cols-2 gap-2">
          <button id="btn-repeat-ritual" class="py-3 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 btn-press text-center flex items-center justify-center gap-1"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5 text-amber-400"></i> Бросить снова</button>
          <button id="btn-academy-link" class="py-3 text-xs font-semibold rounded-xl bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/40 text-purple-300 btn-press text-center flex items-center justify-center gap-1"><i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i> Курс в МАГиГ</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-change-date').onclick = handlers.onChangeDate;
  document.getElementById('btn-share').onclick = handlers.onShare;
  document.getElementById('btn-repeat-ritual').onclick = handlers.onRepeatRitual;
  document.getElementById('btn-academy-link').onclick = handlers.onAcademyLink;
}
