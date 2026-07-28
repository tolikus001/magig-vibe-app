export function renderHomeHub(container, { onSelectGame, onSelectQuiz }) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-4">
        <!-- Шапка (Прикольная & Премиум) -->
        <div class="text-center mb-7 relative">
          <!-- Неоновое свечение на фоне -->
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Анимированный бэйдж -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900/90 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/10 mb-4 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
            <span>МАГиГ • ЛАБОРАТОРИЯ ГИПНОЗА</span>
          </div>

          <!-- Заголовок с неоновым градиентом -->
          <h1 class="text-3xl font-extrabold tracking-tight mb-2">
            <span class="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Эриксоновский Гипноз
            </span>
          </h1>

          <p class="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed mb-4">
            Интерактивная среда для психологов: симуляция сессий и диагностика бессознательного
          </p>

          <!-- Фишки-чипсы -->
          <div class="flex items-center justify-center gap-2 text-[10px] font-medium text-slate-400">
            <span class="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1 text-slate-300">
              <i data-lucide="zap" class="w-3 h-3 text-amber-400"></i> 5 минут
            </span>
            <span class="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1 text-slate-300">
              <i data-lucide="shield-check" class="w-3 h-3 text-emerald-400"></i> Без выгорания
            </span>
            <span class="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1 text-slate-300">
              <i data-lucide="award" class="w-3 h-3 text-purple-400"></i> Практика
            </span>
          </div>
        </div>

        <!-- Выбор режима -->
        <div class="space-y-4">
          <!-- Игра Симулятор -->
          <div id="btn-mode-game" class="card bg-gradient-to-br from-indigo-900/50 via-slate-900/90 to-purple-900/50 border-indigo-500/40 hover:border-indigo-500/70 p-5 rounded-2xl cursor-pointer btn-press group transition-all shadow-lg shadow-indigo-500/10">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-600/25 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="gamepad-2" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-slate-100">Симулятор Терапевта</h3>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">Игра</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Проведите 5 сложных клиентов через сопротивление к инсайтам без потери собственных сил (HP).
                </p>
                <div class="pt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Начать игру <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Прогревающий Квиз -->
          <div id="btn-mode-quiz" class="card bg-gradient-to-br from-purple-900/50 via-slate-900/90 to-indigo-900/50 border-purple-500/40 hover:border-purple-500/70 p-5 rounded-2xl cursor-pointer btn-press group transition-all shadow-lg shadow-purple-500/10">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-600/25 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="brain-circuit" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-slate-100">Диагностика Практики</h3>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-500/40">6 вопросов</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Определите свой профессиональный профиль и узнайте, как раскрыть 90% ресурсов бессознательного.
                </p>
                <div class="pt-2 text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Пройти тест <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Футер -->
      <div class="pb-6 text-center">
        <a href="https://magig.ru" target="_blank" class="text-xs text-slate-400 hover:text-indigo-300 transition-colors flex items-center justify-center gap-1">
          <i data-lucide="globe" class="w-3.5 h-3.5 text-indigo-400"></i> Международная Академия МАГиГ (magig.ru)
        </a>
      </div>
    </div>
  `;

  document.getElementById('btn-mode-game').onclick = onSelectGame;
  document.getElementById('btn-mode-quiz').onclick = onSelectQuiz;
}
