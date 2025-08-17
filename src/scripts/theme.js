const ThemeManager = (() => {
  const THEME_KEY = 'user-theme';
  const LIGHT = 'light';
  const DARK = 'dark';

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) return storedTheme;

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? DARK : LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function setTheme(theme) {
    if (theme !== LIGHT && theme !== DARK) return;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    syncCheckbox(theme); 
  }

  function syncCheckbox(theme) {
    const checkbox = document.querySelector('.theme-controller');
    if (!checkbox) return;
    checkbox.checked = theme === DARK; 
  }

  function init() {
    const theme = getPreferredTheme();
    applyTheme(theme);
    syncCheckbox(theme);
   
    const checkbox = document.querySelector('.theme-controller');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        setTheme(checkbox.checked ? DARK : LIGHT);
      });
    }
  }

  return {
    init,
    setTheme,
  };
})();

document.addEventListener('DOMContentLoaded', ThemeManager.init);