// js/components/iching-render-overview.js - Главный экран Оракула И Цзин
import { getDailyForecast } from './iching-data.js';

export function renderOverviewScreen(container, state, handlers) {
  const f = state.forecastData || getDailyForecast(state.selectedDate);
  const isToday = isSameDay(state.selectedDate, new Date());

  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-2">
        <div class="text-center mb-5 relative">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30 mb-2 shadow-lg backdrop-blur-md">
            <i data-lucide="compass" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>И ЦЗИН • КНИГА ПЕРЕМЕН</span>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-100 tracking-tight mb-1">Прогноз Дня & Оракул</h2>
          <p class="text-xs text-slate-400 max-w-xs mx-auto">Расчет энергии дня по Книге Перемен и инсайт бессознательного</p>
        </div>

        <div class="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-3 mb-4 shadow-md">
          <div class="text-[11px] font-semibold text-amber-400/90 text-center uppercase tracking-wider mb-2">Выберите день для прогноза</div>
          <div class="grid grid-cols-3 gap-2 text-xs font-semibold">
            <button id="btn-date-prev" class="py-2 rounded-xl border border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300 btn-press">← Вчера</button>
            <button id="btn-date-today" class="py-2 rounded-xl border ${isToday ? 'border-amber-500/50 bg-amber-500/20 text-amber-300' : 'border-slate-800 bg-slate-800/60 text-slate-300'} btn-press">Сегодня</button>
            <button id="btn-date-next" class="py-2 rounded-xl border border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300 btn-press">Завтра →</button>
          </div>
          <div class="mt-2.5 text-center text-xs font-medium text-slate-300 bg-slate-950/60 py-1.5 rounded-lg border border-slate-800/80">
            📅 <span class="capitalize">${f.formattedDate}</span>
          </div>
        </div>

        <div class="space-y-3">
          <div id="btn-start-ritual" class="card bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-purple-950/40 border-amber-500/40 hover:border-amber-500/70 p-4.5 rounded-2xl cursor-pointer btn-press group transition-all shadow-xl shadow-amber-500/10">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="coins" class="w-5.5 h-5.5"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-slate-100">Бросить монеты (Ритуал)</h3>
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-500/40">6 бросков</span>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">Традиционный ритуал: 6 бросков древних монет и построение гексаграммы.</p>
                <div class="pt-1 text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Начать ритуал <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
                </div>
              </div>
            </div>
          </div>

          <div id="btn-quick-forecast" class="card bg-gradient-to-br from-indigo-950/40 via-slate-900/90 to-slate-900/90 border-indigo-500/30 hover:border-indigo-500/60 p-4.5 rounded-2xl cursor-pointer btn-press group transition-all shadow-lg">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="scroll" class="w-5.5 h-5.5"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-slate-100">Экспресс-Прогноз</h3>
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">Моментально</span>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">Быстрый доступ к Гексаграмме Дня и инсайту бессознательного.</p>
                <div class="pt-1 text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Посмотреть прогноз <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Интерактивная справка / Правила для новичков -->
          <div class="card bg-slate-900/90 border-slate-800 p-3.5 mt-3 text-xs space-y-2">
            <button id="btn-toggle-guide" class="w-full flex items-center justify-between text-amber-300 font-bold text-[11px]">
              <span class="flex items-center gap-1.5"><i data-lucide="help-circle" class="w-3.5 h-3.5"></i> Как работает И Цзин и что с этим делать?</span>
              <i data-lucide="chevron-down" id="guide-chevron" class="w-3.5 h-3.5 transition-transform"></i>
            </button>
            <div id="guide-content" class="hidden space-y-2 pt-2 text-slate-300 border-t border-slate-800/80 text-[11px] leading-relaxed">
              <p><strong>🔮 Что такое И Цзин?</strong> Это восточная система (ей более 3000 лет), описывающая смену состояний через природные ритмы. В психологии это метафорический оракул для быстрой настройки мышления.</p>
              <p><strong>🪙 Правила ритуала:</strong> Вы подбрасываете 3 монеты 6 раз (снизу вверх). Орел (Ян) = 3 очка, Решка (Инь) = 2 очка. Броски складываются в шестистрочный знак — <strong>Гексаграмму Дня</strong>.</p>
              <p><strong>🎯 Как использовать прогноз?</strong> Прочитайте инсайт бессознательного, сверьтесь с советами по сферам жизни и используйте аффирмацию дня для поддержания ресурсного состояния.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-5 text-center pt-4">
        <p class="text-[11px] text-slate-500">МАГиГ • Метафорические и трансовые практики самопознания</p>
      </div>
    </div>
  `;

  document.getElementById('btn-date-prev').onclick = () => handlers.onDateChange(-1);
  document.getElementById('btn-date-today').onclick = () => handlers.onDateToday();
  document.getElementById('btn-date-next').onclick = () => handlers.onDateChange(1);
  document.getElementById('btn-start-ritual').onclick = handlers.onStartRitual;
  document.getElementById('btn-quick-forecast').onclick = handlers.onQuickForecast;

  // Раскрытие справки
  const btnToggle = document.getElementById('btn-toggle-guide');
  const guideContent = document.getElementById('guide-content');
  const guideChevron = document.getElementById('guide-chevron');
  btnToggle.onclick = () => {
    const isHidden = guideContent.classList.contains('hidden');
    if (isHidden) {
      guideContent.classList.remove('hidden');
      guideChevron.classList.add('rotate-180');
    } else {
      guideContent.classList.add('hidden');
      guideChevron.classList.remove('rotate-180');
    }
  };
}

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
