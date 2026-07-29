// js/components/iching-data.js - Алгоритм расчета ежедневного прогноза И Цзин
import { TRIGRAMS, HEXAGRAMS_PART_1 } from './iching-hexagrams.js';
import { HEXAGRAMS_PART_2 } from './iching-hexagrams-2.js';

export { TRIGRAMS };
export const HEXAGRAMS_DB = [...HEXAGRAMS_PART_1, ...HEXAGRAMS_PART_2];

export function getDeterministicSeed(dateObj = new Date()) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;

  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return { dateStr, seed: Math.abs(hash) };
}

export function getDailyForecast(dateObj = new Date()) {
  const { dateStr, seed } = getDeterministicSeed(dateObj);
  const hexIndex = seed % HEXAGRAMS_DB.length;
  const hexagram = HEXAGRAMS_DB[hexIndex];

  const lines = [];
  for (let i = 0; i < 6; i++) {
    const isYang = hexagram.symbol[i] === "1";
    const lineSeed = (seed + (i + 1) * 37) % 100;
    if (isYang) {
      lines.push(lineSeed < 20 ? 9 : 7);
    } else {
      lines.push(lineSeed < 20 ? 6 : 8);
    }
  }

  return {
    dateStr,
    formattedDate: formatDateRu(dateObj),
    hexagram,
    lines
  };
}

export function getForecastFromLines(lines, dateObj = new Date()) {
  const symbol = lines.map(l => (l === 7 || l === 9) ? "1" : "0");
  let hexagram = HEXAGRAMS_DB.find(h => h.symbol.join('') === symbol.join(''));

  if (!hexagram) {
    const sum = lines.reduce((acc, v) => acc + v, 0);
    hexagram = HEXAGRAMS_DB[sum % HEXAGRAMS_DB.length];
  }

  return {
    dateStr: getDeterministicSeed(dateObj).dateStr,
    formattedDate: formatDateRu(dateObj),
    hexagram,
    lines
  };
}

export function formatDateRu(dateObj) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
  }).format(dateObj);
}
