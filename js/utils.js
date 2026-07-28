// js/utils.js - Вспомогательные функции проекта МАГиГ
export function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
