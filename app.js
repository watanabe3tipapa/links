const grid = document.getElementById('grid');
const tagsEl = document.getElementById('tags');
const search = document.getElementById('search');
const countEl = document.getElementById('count');
const toggleTheme = document.getElementById('toggleTheme');

const palette = [
  'card-color-yellow',
  'card-color-pink',
  'card-color-cyan',
  'card-color-lime',
  'card-color-orange',
  'card-color-lavender',
  'card-color-coral',
];

const rotMap = new Map();
let allSites = [];

function renderCards(list) {
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">:(</div>
        <p>No sites found</p>
      </div>
    `;
    if (countEl) countEl.textContent = `0 / ${allSites.length}`;
    return;
  }

  list.forEach((s, i) => {
    const colorClass = palette[i % palette.length];
    const card = document.createElement('article');
    card.className = `card ${colorClass}`;

    const domain = new URL(s.url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

    let rot = rotMap.get(s.url);
    if (rot === undefined) {
      rot = (Math.random() - 0.5) * 4;
      rotMap.set(s.url, rot);
    }
    card.style.setProperty('--rot', `${rot}deg`);
    card.style.animationDelay = `${i * 0.06}s`;

    card.innerHTML = `
      <div class="meta">
        <div class="favicon">
          <img class="favicon-img" src="${faviconUrl}" alt="" loading="lazy" onerror="this.remove()">
          <span>${s.title[0].toUpperCase()}</span>
        </div>
        <div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      </div>
      <div class="actions">
        <a class="btn btn-primary" href="${s.url}" target="_blank" rel="noopener">Open</a>
      </div>
    `;

    grid.appendChild(card);
  });

  if (countEl) {
    countEl.textContent = `${list.length} / ${allSites.length}`;
  }
}

function uniqueTags(list) {
  return Array.from(new Set(list.map(s => s.category)));
}

function renderTags(list) {
  tagsEl.innerHTML = '';
  const tags = uniqueTags(list);
  tags.unshift('All');
  tags.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tag-btn';
    b.textContent = t;
    b.addEventListener('click', () => {
      document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      const q = search.value.toLowerCase().trim();
      let filtered = t === 'All' ? allSites : allSites.filter(s => s.category === t);
      if (q) {
        filtered = filtered.filter(s =>
          s.title.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
        );
      }
      renderCards(filtered);
    });
    tagsEl.appendChild(b);
  });
  tagsEl.firstChild?.classList.add('active');
}

search.addEventListener('input', () => {
  const q = search.value.toLowerCase().trim();
  const activeTag = document.querySelector('.tag-btn.active');
  const tag = activeTag ? activeTag.textContent : 'All';
  let filtered = tag === 'All' ? allSites : allSites.filter(s => s.category === tag);
  if (q) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  }
  renderCards(filtered);
});

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== search) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' && document.activeElement === search) {
    search.blur();
  }
});

if (toggleTheme) {
  toggleTheme.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    toggleTheme.textContent = isDark ? '☀️' : '🌙';
  });
}

fetch('data/sites.json')
  .then(r => r.json())
  .then(data => {
    allSites = data;
    renderTags(allSites);
    renderCards(allSites);
  })
  .catch(() => {
    grid.innerHTML = '<p style="padding:20px;font-weight:700;">Failed to load sites data.</p>';
  });
