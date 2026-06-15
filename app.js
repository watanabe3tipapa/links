const grid = document.getElementById('grid');
const tagsEl = document.getElementById('tags');
const search = document.getElementById('search');
const countEl = document.getElementById('count');

const palette = [
  'card-color-yellow',
  'card-color-pink',
  'card-color-cyan',
  'card-color-lime',
  'card-color-orange',
  'card-color-lavender',
  'card-color-coral',
];

let allSites = [];

function renderCards(list) {
  grid.innerHTML = '';
  list.forEach((s, i) => {
    const colorClass = palette[i % palette.length];
    const card = document.createElement('article');
    card.className = `card ${colorClass}`;
    card.innerHTML = `
      <div class="meta">
        <div class="favicon">${(s.title[0]).toUpperCase()}</div>
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
