// lang.js
const translations = {
  en: {
    // index.html
    hero_title: "Welcome to FutbolX",
    hero_subtitle: "Stream Free PPV Boxing, UFC, Basketball, and More - Live & On-Demand!",
    live_now: "Live Now",
    football: "Football",
    nba: "NBA",
    fights: "Fights",
    motorsports: "Motorsports",
    nfl: "NFL",
    nhl: "NHL",
    mlb: "MLB",
    ice_hockey: "Ice Hockey",
    others: "Others",
    footer_text: "FutbolX 2025",
    nav_request: "Request",
    nav_vods: "VODs",
    nav_discord: "Discord",
    nav_language: "Language",
    nav_login: "Login",
    nav_logout: "Logout",
    loading_streams: "Loading streams...",
    no_streams: "No streams are available right now. Check back later!",
    footer_api: "API",
    footer_changelog: "Changelog",
    footer_donate: "Donate / VIP Access",
    footer_contact: "Contact us",

    // live.html
    back_to_home: "Back to Home",
    click_to_start: "Click to Start Livestream",
    stream_unavailable: "Stream Unavailable",
    no_streams_found: "No Streams",
    fetch_failed: "Fetch Failed",
    error: "Error"
  },
  es: {
    hero_title: "Bienvenido a FutbolX",
    hero_subtitle: "¡Transmite PPV gratis de boxeo, UFC, baloncesto y más - en vivo y bajo demanda!",
    live_now: "Ahora en vivo",
    football: "Fútbol",
    nba: "NBA",
    fights: "Peleas",
    motorsports: "Automovilismo",
    nfl: "NFL",
    nhl: "NHL",
    mlb: "MLB",
    ice_hockey: "Hockey sobre hielo",
    others: "Otros",
    footer_text: "FutbolX 2025",
    nav_request: "Solicitar",
    nav_vods: "VODs",
    nav_discord: "Discord",
    nav_language: "Idioma",
    nav_login: "Iniciar sesión",
    nav_logout: "Cerrar sesión",
    loading_streams: "Cargando transmisiones...",
    no_streams: "No hay transmisiones disponibles ahora. ¡Vuelve más tarde!",
    footer_api: "API",
    footer_changelog: "Registro de cambios",
    footer_donate: "Donar / Acceso VIP",
    footer_contact: "Contáctanos",
    back_to_home: "Volver al inicio",
    click_to_start: "Clic para iniciar la transmisión en vivo",
    stream_unavailable: "Transmisión no disponible",
    no_streams_found: "No hay transmisiones",
    fetch_failed: "Fallo en la obtención",
    error: "Error"
  },
  fr: {
    hero_title: "Bienvenue sur FutbolX",
    hero_subtitle: "Diffusez gratuitement des PPV de boxe, UFC, basketball, et plus - en direct et à la demande !",
    live_now: "En direct maintenant",
    football: "Football",
    nba: "NBA",
    fights: "Combats",
    motorsports: "Sports automobiles",
    nfl: "NFL",
    nhl: "NHL",
    mlb: "MLB",
    ice_hockey: "Hockey sur glace",
    others: "Autres",
    footer_text: "FutbolX 2025",
    nav_request: "Demander",
    nav_vods: "VODs",
    nav_discord: "Discord",
    nav_language: "Langue",
    nav_login: "Se connecter",
    nav_logout: "Se déconnecter",
    loading_streams: "Chargement des diffusions...",
    no_streams: "Aucune diffusion disponible pour le moment. Revenez plus tard !",
    footer_api: "API",
    footer_changelog: "Journal des modifications",
    footer_donate: "Faire un don / Accès VIP",
    footer_contact: "Nous contacter",
    back_to_home: "Retour à l'accueil",
    click_to_start: "Cliquez pour démarrer la diffusion en direct",
    stream_unavailable: "Diffusion indisponible",
    no_streams_found: "Aucune diffusion",
    fetch_failed: "Échec de la récupération",
    error: "Erreur"
  },
  de: {
    hero_title: "Willkommen bei FutbolX",
    hero_subtitle: "Streamen Sie kostenlos PPV-Boxen, UFC, Basketball und mehr - live und auf Abruf!",
    live_now: "Jetzt live",
    football: "Fußball",
    nba: "NBA",
    fights: "Kämpfe",
    motorsports: "Motorsport",
    nfl: "NFL",
    nhl: "NHL",
    mlb: "MLB",
    ice_hockey: "Eishockey",
    others: "Andere",
    footer_text: "FutbolX 2025",
    nav_request: "Anfragen",
    nav_vods: "VODs",
    nav_discord: "Discord",
    nav_language: "Sprache",
    nav_login: "Anmelden",
    nav_logout: "Abmelden",
    loading_streams: "Lade Streams...",
    no_streams: "Momentan sind keine Streams verfügbar. Schauen Sie später wieder vorbei!",
    footer_api: "API",
    footer_changelog: "Änderungsprotokoll",
    footer_donate: "Spenden / VIP-Zugang",
    footer_contact: "Kontaktieren Sie uns",
    back_to_home: "Zurück zur Startseite",
    click_to_start: "Klicken Sie, um den Livestream zu starten",
    stream_unavailable: "Stream nicht verfügbar",
    no_streams_found: "Keine Streams",
    fetch_failed: "Abruf fehlgeschlagen",
    error: "Fehler"
  }
};

function setLanguage(lang) {
  // Store selected language in localStorage
  localStorage.setItem('fs_locale', lang);

  // Update all elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Update button text for startLivestream if on live.html
  const startLivestreamBtn = document.getElementById('startLivestream');
  if (startLivestreamBtn && startLivestreamBtn.innerText !== 'Loading...') {
    startLivestreamBtn.innerText = translations[lang].click_to_start;
  }

  console.log(`Language switched to ${lang}`);
}

function initLanguage() {
  // Get language from localStorage or default to English
  const lang = localStorage.getItem('fs_locale') || 'en';
  setLanguage(lang);

  // Add event listeners to language dropdown items
  document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = item.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', initLanguage);
