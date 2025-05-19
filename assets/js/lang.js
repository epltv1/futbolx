// assets/js/lang.js
const translations = {
  en: {
    'nav-request': 'Request',
    'nav-discord': 'Discord',
    'nav-language': 'English',
    'lang-english': 'English',
    'lang-german': 'German',
    'lang-spanish': 'Spanish',
    'lang-french': 'French',
    'nav-login': 'Login',
    'nav-logout': 'Logout',
    'hero-title': 'Welcome to Futbolx',
    'hero-subtitle': 'Stream Free PPV Boxing, UFC, Basketball, and More - Live & On-Demand!',
    'hero-button': 'Watch Now',
    'live-title': 'Live now',
    'live-soon': 'Live soon',
    'no-streams': 'No streams are live right now. Scroll down to see what\'s on later.',
    'category-247': '24/7',
    'footer-text': 'Futbolx 2025',
    'footer-api': 'API',
    'footer-discord': 'Discord',
    'footer-changelog': 'Changelog',
    'footer-donate': 'Donate / VIP Access',
    'footer-contact': 'Contact us',
    'login-title': 'Login',
    'login-username': 'Username',
    'login-password': 'Password',
    'login-button': 'Login',
    'vip-title': 'VIP Exclusive Streams',
    'vip-subtitle': 'Enjoy premium content available only to VIP members!'
  },
  de: {
    'nav-request': 'Anfrage',
    'nav-discord': 'Discord',
    'nav-language': 'Deutsch',
    'lang-english': 'Englisch',
    'lang-german': 'Deutsch',
    'lang-spanish': 'Spanisch',
    'lang-french': 'Französisch',
    'nav-login': 'Anmelden',
    'nav-logout': 'Abmelden',
    'hero-title': 'Willkommen bei Futbolx',
    'hero-subtitle': 'Streamen Sie kostenlose PPV-Boxen, UFC, Basketball und mehr – live und auf Abruf!',
    'hero-button': 'Jetzt ansehen',
    'live-title': 'Jetzt live',
    'live-soon': 'Bald live',
    'no-streams': 'Derzeit sind keine Streams live. Scrollen Sie nach unten, um zu sehen, was später kommt.',
    'category-247': '24/7',
    'footer-text': 'Futbolx 2025',
    'footer-api': 'API',
    'footer-discord': 'Discord',
    'footer-changelog': 'Änderungsprotokoll',
    'footer-donate': 'Spenden / VIP-Zugang',
    'footer-contact': 'Kontaktieren Sie uns',
    'login-title': 'Anmelden',
    'login-username': 'Benutzername',
    'login-password': 'Passwort',
    'login-button': 'Anmelden',
    'vip-title': 'VIP-Exklusive Streams',
    'vip-subtitle': 'Genießen Sie Premium-Inhalte, die nur VIP-Mitgliedern zur Verfügung stehen!'
  },
  es: {
    'nav-request': 'Solicitar',
    'nav-discord': 'Discord',
    'nav-language': 'Español',
    'lang-english': 'Inglés',
    'lang-german': 'Alemán',
    'lang-spanish': 'Español',
    'lang-french': 'Francés',
    'nav-login': 'Iniciar sesión',
    'nav-logout': 'Cerrar sesión',
    'hero-title': 'Bienvenido a Futbolx',
    'hero-subtitle': '¡Transmite boxeo PPV, UFC, baloncesto y más gratis, en vivo y bajo demanda!',
    'hero-button': 'Ver ahora',
    'live-title': 'Ahora en vivo',
    'live-soon': 'Pronto en vivo',
    'no-streams': 'No hay transmisiones en vivo ahora. Desplázate hacia abajo para ver qué viene después.',
    'category-247': '24/7',
    'footer-text': 'Futbolx 2025',
    'footer-api': 'API',
    'footer-discord': 'Discord',
    'footer-changelog': 'Registro de cambios',
    'footer-donate': 'Donar / Acceso VIP',
    'footer-contact': 'Contáctanos',
    'login-title': 'Iniciar sesión',
    'login-username': 'Nombre de usuario',
    'login-password': 'Contraseña',
    'login-button': 'Iniciar sesión',
    'vip-title': 'Streams Exclusivos VIP',
    'vip-subtitle': '¡Disfruta de contenido premium solo para miembros VIP!'
  },
  fr: {
    'nav-request': 'Demander',
    'nav-discord': 'Discord',
    'nav-language': 'Français',
    'lang-english': 'Anglais',
    'lang-german': 'Allemand',
    'lang-spanish': 'Espagnol',
    'lang-french': 'Français',
    'nav-login': 'Connexion',
    'nav-logout': 'Déconnexion',
    'hero-title': 'Bienvenue sur Futbolx',
    'hero-subtitle': 'Diffusez gratuitement des combats de boxe PPV, UFC, basketball et plus encore – en direct et à la demande !',
    'hero-button': 'Regarder maintenant',
    'live-title': 'En direct maintenant',
    'live-soon': 'Bientôt en direct',
    'no-streams': 'Aucun flux n’est en direct pour le moment. Faites défiler vers le bas pour voir ce qui arrive plus tard.',
    'category-247': '24/7',
    'footer-text': 'Futbolx 2025',
    'footer-api': 'API',
    'footer-discord': 'Discord',
    'footer-changelog': 'Journal des changements',
    'footer-donate': 'Faire un don / Accès VIP',
    'footer-contact': 'Contactez-nous',
    'login-title': 'Connexion',
    'login-username': 'Nom d’utilisateur',
    'login-password': 'Mot de passe',
    'login-button': 'Connexion',
    'vip-title': 'Streams Exclusifs VIP',
    'vip-subtitle': 'Profitez de contenus premium réservés aux membres VIP !'
  }
};

function setLanguage(lang) {
  document.cookie = `fs_locale=${lang}; expires=Mon, 18 Jan 2038 12:00:00 UTC; path=/`;
  updateLanguage();
}

function updateLanguage() {
  const cookies = document.cookie.split(';');
  let lang = 'en'; // Default to English
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'fs_locale') {
      lang = value;
      break;
    }
  }
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(element => {
    const key = element.getAttribute('data-lang');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}
