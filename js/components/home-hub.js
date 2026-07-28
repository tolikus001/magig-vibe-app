export function renderHomeHub(container, { onSelectGame, onSelectQuiz }) {
  container.innerHTML = `
    <div class="max-w-md mx-auto min-h-screen flex flex-col justify-between p-5 slide-up">
      <div class="pt-6">
        <!-- Шапка -->
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> МАГиГ • Академия Гипноза
          </span>
          <h1 class="text-2xl font-bold text-slate-100 mb-2 leading-tight">Практическая Гипнотерапия</h1>
          <p class="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            Интерактивные инструменты диагностики и моделирования сессий для психологов
          </p>
        </div>

        <!-- Выбор режима -->
        <div class="space-y-4">
          <!-- Игра Симулятор -->
          <div id="btn-mode-game" class="card bg-gradient-to-br from-indigo-900/40 via-slate-900/80 to-purple-900/40 border-indigo-500/30 hover:border-indigo-500/60 p-5 rounded-2xl cursor-pointer btn-press group transition-all">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="gamepad-2" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-slate-100">Симулятор Терапевта</h3>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Игра</span>
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
          <div id="btn-mode-quiz" class="card bg-gradient-to-br from-purple-900/40 via-slate-900/80 to-indigo-900/40 border-purple-500/30 hover:border-purple-500/60 p-5 rounded-2xl cursor-pointer btn-press group transition-all">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="brain-circuit" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-slate-100">Диагностика Практики</h3>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">6 вопросов</span>
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
        <a href="https://magig.ru" target="_blank" class="text-xs text-slate-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-1">
          <i data-lucide="globe" class="w-3.5 h-3.5"></i> Международная Академия МАГиГ (magig.ru)
        </a>
      </div>
    </div>
  `;

  document.getElementById('btn-mode-game').onclick = onSelectGame;
  document.getElementById('btn-mode-quiz').onclick = onSelectQuiz;
}
