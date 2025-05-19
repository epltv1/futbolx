// assets/js/main.js
document.addEventListener('DOMContentLoaded', async () => {
  const eventsContainer = document.getElementById('events');
  const liveNowContainer = document.getElementById('liveNow');
  const soonEventsContainer = document.getElementById('soonEvents');
  const noLiveMessage = document.getElementById('noLiveMessage');
  const backLink = document.getElementById('backLink');
  const categorySelect = document.getElementById('categorySelect');
  const eventsTitle = document.getElementById('eventsTitle');

  // Fetch events
  const response = await fetch('/events.json');
  const data = await response.json();
  const streams = data.streams.flatMap(category => 
    category.streams.map(stream => ({ ...stream, category: category.category }))
  );

  // Category event counts
  const categories = [
    'Sports', 'Football', 'Basketball', 'Fights', 'Motorsports',
    'NBA', 'MLB', 'NHL', 'NFL', 'Others'
  ];
  const eventCounts = categories.reduce((acc, cat) => {
    acc[cat] = cat === 'Sports' 
      ? streams.length 
      : streams.filter(s => s.category === cat).length;
    return acc;
  }, {});

  // Update dropdown with counts
  categories.forEach(cat => {
    const option = categorySelect.querySelector(`option[value="${cat}"]`);
    option.textContent = `${option.getAttribute('data-lang').replace('category-', '')} (${eventCounts[cat]})`;
  });

  // Render event card
  function renderEvent(stream, container) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
      <div class="card event-card">
        <img src="${stream.poster}" class="card-img-top" alt="${stream.name}">
        <div class="card-body">
          <h5 class="card-title">${stream.name}</h5>
          <p class="card-text">${stream.tag} | ${new Date(stream.starts_at * 1000).toLocaleString()}</p>
          <p class="card-text">${stream.viewers} viewers</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  }

  // Filter events by category
  window.filterByCategory = function(category) {
    eventsContainer.innerHTML = '';
    const filteredStreams = category === 'Sports' 
      ? streams 
      : streams.filter(s => s.category === category);
    
    if (filteredStreams.length === 0) {
      eventsContainer.innerHTML = '<p class="text-center" data-lang="no-events">No events in this category</p>';
    } else {
      filteredStreams.forEach(stream => renderEvent(stream, eventsContainer));
    }

    eventsTitle.textContent = category === 'Sports' ? 'All Events' : `${category} Events`;
    backLink.style.display = category === 'Sports' ? 'none' : 'block';
  };

  // Render Live Now
  const now = Math.floor(Date.now() / 1000); // Current Unix timestamp
  const liveStreams = streams.filter(s => 
    s.always_live === 1 || (s.starts_at <= now && s.starts_at >= now - 7200) // Within 2 hours
  );

  if (liveStreams.length === 0) {
    noLiveMessage.style.display = 'block';
  } else {
    liveStreams.forEach(stream => renderEvent(stream, liveNowContainer));
  }

  // Render Soon (next 24 hours)
  const in24Hours = now + 24 * 3600; // 24 hours from now
  const soonStreams = streams.filter(s => 
    s.always_live === 0 && s.starts_at > now && s.starts_at <= in24Hours
  );

  if (soonStreams.length === 0) {
    soonEventsContainer.innerHTML = '<p class="text-center" data-lang="no-soon-events">No events starting soon</p>';
  } else {
    soonStreams.forEach(stream => renderEvent(stream, soonEventsContainer));
  }

  // Initial render (all events)
  filterByCategory('Sports');
});
