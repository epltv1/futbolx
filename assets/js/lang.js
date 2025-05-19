// assets/js/lang.js
const translations = {
  en: {
    // Navbar
    'nav-vip': 'VIP',
    'nav-login': 'Login',
    // Existing UI
    'all-events': 'All Events',
    // New UI (Dropdown, Soon, Messages)
    'select-category': 'Select Category',
    'category-sports': 'Sports',
    'category-football': 'Football',
    'category-basketball': 'Basketball',
    'category-fights': 'Fights',
    'category-motorsports': 'Motorsports',
    'category-nba': 'NBA',
    'category-mlb': 'MLB',
    'category-nhl': 'NHL',
    'category-nfl': 'NFL',
    'category-others': 'Others',
    'back-home': 'Back to Homepage',
    'live-now': 'Live Now',
    'soon': 'Soon',
    'no-live-games': 'No live games at the moment',
    'no-soon-events': 'No events starting soon',
    'no-events': 'No events in this category'
  },
  es: {
    // Navbar
    'nav-vip': 'VIP',
    'nav-login': 'Iniciar Sesión',
    // Existing UI
    'all-events': 'Todos los Eventos',
    // New UI
    'select-category': 'Seleccionar Categoría',
    'category-sports': 'Deportes',
    'category-football': 'Fútbol',
    'category-basketball': 'Baloncesto',
    'category-fights': 'Peleas',
    'category-motorsports': 'Deportes de Motor',
    'category-nba': 'NBA',
    'category-mlb': 'MLB',
    'category-nhl': 'NHL',
    'category-nfl': 'NFL',
    'category-others': 'Otros',
    'back-home': 'Volver a la Página Principal',
    'live-now': 'Ahora en Vivo',
    'soon': 'Próximamente',
    'no-live-games': 'No hay partidos en vivo en este momento',
    'no-soon-events': 'No hay eventos próximos',
    'no-events': 'No hay eventos en esta categoría'
  },
  fr: {
    // Navbar
    'nav-vip': 'VIP',
    'nav-login': 'Connexion',
    // Existing UI
    'all-events': 'Tous les Événements',
    // New UI
    'select-category': 'Sélectionner une Catégorie',
    'category-sports': 'Sports',
    'category-football': 'Football',
    'category-basketball': 'Basket-ball',
    'category-fights': 'Combats',
    'category-motorsports': 'Sports Automobiles',
    'category-nba': 'NBA',
    'category-mlb': 'MLB',
    'category-nhl': 'NHL',
    'category-nfl': 'NFL',
    'category-others': 'Autres',
    'back-home': 'Retour à la Page d’Accueil',
    'live-now': 'En Direct Maintenant',
    'soon': 'Bientôt',
    'no-live-games': 'Aucun match en direct pour le moment',
    'no-soon-events': 'Aucun événement à venir',
    'no-events': 'Aucun événement dans cette catégorie'
  },
  de: {
    // Navbar
    'nav-vip': 'VIP',
    'nav-login': 'Anmelden',
    // Existing UI
    'all-events': 'Alle Veranstaltungen',
    // New UI
    'select-category': 'Kategorie Auswählen',
    'category-sports': 'Sport',
    'category-football': 'Fußball',
    'category-basketball': 'Basketball',
    'category-fights': 'Kämpfe',
    'category-motorsports': 'Motorsport',
    'category-nba': 'NBA',
    'category-mlb': 'MLB',
    'category-nhl': 'NHL',
    'category-nfl': 'NFL',
    'category-others': 'Andere',
    'back-home': 'Zurück zur Startseite',
    'live-now': 'Jetzt Live',
    'soon': 'Bald',
    'no-live-games': 'Momentan keine Live-Spiele',
    'no-soon-events': 'Keine bevorstehenden Veranstaltungen',
    'no-events': 'Keine Veranstaltungen in dieser Kategorie'
  }
};

// Language switching logic
function setLanguage(lang) {
  document.querySelectorAll('[data-lang]').forEach(elem => {
    const key = elem.getAttribute('data-lang');
    elem.textContent = translations[lang][key] || elem.textContent;
  });
  // Update dropdown options
  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect) {
    Array.from(categorySelect.options).forEach(option => {
      const key = option.getAttribute('data-lang');
      // Preserve event counts if already set
      const match = option.textContent.match(/\((\d+)\)$/);
      const count = match ? ` (${match[1]})` : '';
      option.textContent = (translations[lang][key] || option.textContent) + count;
    });
  }
}

// Initialize with default language (English)
setLanguage('en');

// Optional: Add event listener for language selector (modify based on your navbar)
document.querySelectorAll('.lang-selector').forEach(selector => {
  selector.addEventListener('click', () => {
    setLanguage(selector.dataset.lang);
  });
});
