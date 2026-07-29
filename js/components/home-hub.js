export function renderHomeHub(container, { onSelectGame, onSelectQuiz, onSelectIching }) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-4">
        <!-- Шапка (Премиум МАГиГ) -->
        <div class="text-center mb-6 relative">
          <!-- Неоновое свечение на фоне -->
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Анимированный бэйдж -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900/90 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/10 mb-3 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
            <span>МАГиГ • АКАДЕМИЯ ГИПНОЗА</span>
          </div>

          <!-- Заголовок с неоновым градиентом -->
          <h1 class="text-3xl font-extrabold tracking-tight mb-2">
            <span class="bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-300 bg-clip-text text-transparent">
              Эриксоновский Гипноз
            </span>
          </h1>

          <p class="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed mb-4">
            Московская Академия Гипноза и Гипнотерапии: интерактивы, оракул И Цзин и практика
          </p>

          <!-- Фишки-чипсы -->
          <div class="flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
            <span class="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1 text-slate-300">
              <i data-lucide="compass" class="w-3 h-3 text-amber-400"></i> И Цзин Дня
            </span>
            <span class="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1 text-slate-300">
              <i data-lucide="gamepad-2" class="w-3 h-3 text-indigo-400"></i> Игра
            </span>
            <span class="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1 text-slate-300">
              <i data-lucide="brain-circuit" class="w-3 h-3 text-purple-400"></i> Тест
            </span>
          </div>
        </div>

        <!-- Выбор режима (3 Карточки) -->
        <div class="space-y-3.5">

          <!-- 1. Оракул И Цзин (Прогноз Дня) -->
          <div id="btn-mode-iching" class="card bg-gradient-to-br from-amber-950/50 via-slate-900/90 to-purple-950/40 border-amber-500/40 hover:border-amber-500/80 p-4.5 rounded-2xl cursor-pointer btn-press group transition-all shadow-lg shadow-amber-500/10">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="compass" class="w-5 h-5"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-slate-100">И Цзин: Прогноз Дня</h3>
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-500/40">Оракул</span>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">
                  Ритуал бросания 3 монет, расчет гексаграммы дня и психотерапевтический инсайт бессознательного.
                </p>
                <div class="pt-1.5 text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Узнать прогноз дня <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Игра Симулятор -->
          <div id="btn-mode-game" class="card bg-gradient-to-br from-indigo-950/50 via-slate-900/90 to-slate-900/90 border-indigo-500/40 hover:border-indigo-500/70 p-4.5 rounded-2xl cursor-pointer btn-press group transition-all shadow-md">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-indigo-600/25 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="gamepad-2" class="w-5 h-5"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-slate-100">Симулятор Терапевта</h3>
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">Игра</span>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">
                  Проведите 5 сложных клиентов через сопротивление к инсайтам без потери собственных сил.
                </p>
                <div class="pt-1.5 text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Начать игру <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Прогревающий Квиз -->
          <div id="btn-mode-quiz" class="card bg-gradient-to-br from-purple-950/50 via-slate-900/90 to-slate-900/90 border-purple-500/40 hover:border-purple-500/70 p-4.5 rounded-2xl cursor-pointer btn-press group transition-all shadow-md">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-xl bg-purple-600/25 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="brain-circuit" class="w-5 h-5"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-bold text-slate-100">Диагностика Практики</h3>
                  <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-500/40">Тест</span>
                </div>
                <p class="text-[11px] text-slate-300 leading-relaxed">
                  Определите свой профессиональный профиль и узнайте, как раскрыть 90% ресурсов ума.
                </p>
                <div class="pt-1.5 text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Пройти тест <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Футер -->
      <div class="pb-6 text-center pt-4">
        <a href="https://hypnoacademy.ru" target="_blank" class="text-xs text-slate-400 hover:text-indigo-300 transition-colors flex items-center justify-center gap-1">
          <i data-lucide="globe" class="w-3.5 h-3.5 text-indigo-400"></i> Московская Академия Гипноза и Гипнотерапии (hypnoacademy.ru)
        </a>
      </div>
    </div>
  `;

  document.getElementById('btn-mode-iching').onclick = onSelectIching;
  document.getElementById('btn-mode-game').onclick = onSelectGame;
  document.getElementById('btn-mode-quiz').onclick = onSelectQuiz;
}
