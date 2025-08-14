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

export function initCookieSettings(
  acceptId: string,
  rejectId: string,
  unknownId: string,
  acceptedId: string,
  rejectedId: string
): void {
  const acceptBtn = document.getElementById(acceptId) as HTMLButtonElement | null;
  const rejectBtn = document.getElementById(rejectId) as HTMLButtonElement | null;
  const unknownEl = document.getElementById(unknownId) as HTMLParagraphElement | null;
  const acceptedEl = document.getElementById(acceptedId) as HTMLParagraphElement | null;
  const rejectedEl = document.getElementById(rejectedId) as HTMLParagraphElement | null;

  if (!acceptBtn || !rejectBtn || !unknownEl || !acceptedEl || !rejectedEl) return;

  const showStatus = (status: 'unknown' | 'accepted' | 'rejected') => {
    unknownEl.style.display = status === 'unknown' ? 'block' : 'none';
    acceptedEl.style.display = status === 'accepted' ? 'block' : 'none';
    rejectedEl.style.display = status === 'rejected' ? 'block' : 'none';
  };

  const updateStatus = () => {
    const consent = getCookie('cookieConsent') as CookieConsentValue;
    if (!consent) {
      showStatus('unknown');
    } else if (consent === 'accepted') {
      showStatus('accepted');
    } else {
      showStatus('rejected');
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
