export type CookieConsentValue = 'accepted' | 'rejected' | null;

export function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, val] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

export function initCookiePopup(popupId: string, acceptId: string, rejectId: string): void {
  const popup = document.getElementById(popupId) as HTMLDivElement | null;
  const acceptBtn = document.getElementById(acceptId) as HTMLButtonElement | null;
  const rejectBtn = document.getElementById(rejectId) as HTMLButtonElement | null;

  if (!popup || !acceptBtn || !rejectBtn) return;

  const consent = getCookie('cookieConsent') as CookieConsentValue;
  if (consent) {
    popup.style.display = 'none';
    return;
  }

  popup.style.display = 'block';

  acceptBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted', 365);
    popup.style.display = 'none';
  });

  rejectBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'rejected', 365);
    popup.style.display = 'none';
  });
}

export function initCookieSettings(acceptId: string, rejectId: string, statusId: string): void {
  const acceptBtn = document.getElementById(acceptId) as HTMLButtonElement | null;
  const rejectBtn = document.getElementById(rejectId) as HTMLButtonElement | null;
  const statusEl = document.getElementById(statusId) as HTMLParagraphElement | null;

  if (!acceptBtn || !rejectBtn || !statusEl) return;

  const updateStatus = () => {
    const consent = getCookie('cookieConsent') as CookieConsentValue;
    if (!consent) {
      statusEl.textContent = 'Brak ustawień (użytkownik nie wybrał)';
    } else if (consent === 'accepted') {
      statusEl.textContent = 'Ciasteczka zaakceptowane';
    } else {
      statusEl.textContent = 'Ciasteczka odrzucone';
    }
  };

  updateStatus();

  acceptBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'accepted', 365);
    updateStatus();
  });

  rejectBtn.addEventListener('click', () => {
    setCookie('cookieConsent', 'rejected', 365);
    updateStatus();
  });
}
