// js/components/iching.js - Управление состоянием Оракула И Цзин
import { getDailyForecast, getForecastFromLines } from './iching-data.js';
import { renderOverviewScreen } from './iching-render-overview.js';
import { renderRitualScreen } from './iching-render-ritual.js';
import { renderForecastResultScreen } from './iching-render-result.js';

let state = {
  selectedDate: new Date(),
  mode: 'overview',
  currentLineIndex: 0,
  lines: [],
  coinsFlipping: false,
  lastCoins: [3, 3, 3],
  forecastData: null,
  onGoHome: null
};

function triggerHaptic(type = 'light') {
  if (window.NotibotBridge && window.NotibotBridge.haptics) {
    window.NotibotBridge.haptics.impact(type);
  }
}

export function initIching(containerId = 'app', options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  state = {
    selectedDate: new Date(),
    mode: 'overview',
    currentLineIndex: 0,
    lines: [],
    coinsFlipping: false,
    lastCoins: [3, 3, 3],
    forecastData: getDailyForecast(new Date()),
    onGoHome: options.onGoHome || null
  };
  render(container);
}

function render(container) {
  if (state.mode === 'overview') {
    renderOverviewScreen(container, state, {
      onDateChange: (delta) => {
        triggerHaptic();
        const d = new Date(state.selectedDate);
        d.setDate(d.getDate() + delta);
        state.selectedDate = d;
        state.forecastData = getDailyForecast(d);
        render(container);
      },
      onDateToday: () => {
        triggerHaptic();
        state.selectedDate = new Date();
        state.forecastData = getDailyForecast(state.selectedDate);
        render(container);
      },
      onStartRitual: () => {
        triggerHaptic('medium');
        state.mode = 'ritual';
        state.currentLineIndex = 0;
        state.lines = [];
        render(container);
      },
      onQuickForecast: () => {
        triggerHaptic('medium');
        state.forecastData = getDailyForecast(state.selectedDate);
        state.lines = [...state.forecastData.lines];
        state.mode = 'result';
        render(container);
      }
    });
  } else if (state.mode === 'ritual') {
    renderRitualScreen(container, state, {
      onFlipCoins: () => {
        if (state.coinsFlipping) return;
        triggerHaptic('medium');
        state.coinsFlipping = true;
        render(container);
        setTimeout(() => {
          const c1 = Math.random() < 0.5 ? 3 : 2;
          const c2 = Math.random() < 0.5 ? 3 : 2;
          const c3 = Math.random() < 0.5 ? 3 : 2;
          const lineVal = c1 + c2 + c3;

          state.lastCoins = [c1, c2, c3];
          state.lines.push(lineVal);
          state.currentLineIndex++;
          state.coinsFlipping = false;
          triggerHaptic('heavy');

          if (state.currentLineIndex >= 6) {
            state.forecastData = getForecastFromLines(state.lines, state.selectedDate);
            setTimeout(() => { state.mode = 'result'; render(container); }, 500);
          } else {
            render(container);
          }
        }, 650);
      }
    });
  } else if (state.mode === 'result') {
    renderForecastResultScreen(container, state, {
      onChangeDate: () => { triggerHaptic(); state.mode = 'overview'; render(container); },
      onShare: () => {
        triggerHaptic('medium');
        const f = state.forecastData;
        const text = `☯️ Прогноз И Цзин на ${f.formattedDate}:\n${f.hexagram.nameRu}\n«${f.hexagram.dailyOverview}»\nhypnoacademy.ru`;
        if (navigator.share) navigator.share({ title: 'Прогноз И Цзин', text }).catch(() => {});
        else { navigator.clipboard.writeText(text); alert('Скопировано в буфер!'); }
      },
      onGoHomeMain: () => {
        triggerHaptic();
        if (state.onGoHome) {
          state.onGoHome();
        } else {
          window.location.href = './index.html';
        }
      },
      onRepeatRitual: () => {
        triggerHaptic();
        state.mode = 'ritual';
        state.currentLineIndex = 0;
        state.lines = [];
        render(container);
      },
      onAcademyLink: () => {
        triggerHaptic();
        if (window.NotibotBridge?.navigation) window.NotibotBridge.navigation.openUrl('https://hypnoacademy.ru');
        else window.open('https://hypnoacademy.ru', '_blank');
      }
    });
  }
  if (window.lucide) window.lucide.createIcons();
}
