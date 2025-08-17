const ThemeManager = (() => {
  const THEME_KEY = 'user-theme';
  const LIGHT = 'light';
  const DARK = 'dark';

  // Ustawia theme, synchronizuje checkbox i zapisuje w localStorage
  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const checkbox = document.querySelector('.theme-controller');
    if (checkbox) checkbox.checked = theme === DARK;
    localStorage.setItem(THEME_KEY, theme);
  };

  // Pobiera preferowany theme (localStorage lub system)
  const getPreferredTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return stored || (prefersDark ? DARK : LIGHT);
  };

  const init = () => {
    const theme = getPreferredTheme();
    apply(theme);

    // Obsługa zmiany checkboxa
    const checkbox = document.querySelector('.theme-controller');
    if (checkbox) {
      checkbox.addEventListener('change', () => apply(checkbox.checked ? DARK : LIGHT));
    }
  };

  return { init, setTheme: apply };
})();

// Uruchomienie tylko po stronie klienta
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', ThemeManager.init);
}