/*
    Object with translations.
    It shoud contain all texts from uniwersal components in all languages from config.ts/LOCALES.
    It shoudn't contain translations of page content.
*/
export const ui = {
    pl: {
        'name': 'Astro Blog',
        'nav.home': 'Start',
        'nav.about': 'O nas',    
        'nav.blog': 'Blog', 
        'nav.nested': 'Zagnieżdżone',
        'footer.copyright': 'Twoje imię tutaj. Wszelkie prawa zastrzeżone.',
        'meta.description': 'Witaj na mojej stronie!',        
    },
    en: {
        'name': 'Astro Blog',
        'nav.home': 'Home',
        'nav.about': 'About us',
        'nav.blog': 'Blog',
        'nav.nested': 'Nested',
        'footer.copyright': 'Your name here. All rights reserved.',
        'meta.description': 'Welcome to my website!',
    },
    uk: {
        'name': 'Астро Блог',
        'nav.home': 'Головна',
        'nav.about': 'Про нас',
        'nav.blog': 'Блог',
        'nav.nested': 'Вкладене',
        'footer.copyright': 'Ваше ім\'я тут. Всі права захищені.',
        'meta.description': 'Ласкаво просимо на мій веб-сайт!',
    }
} as const;