document.addEventListener('DOMContentLoaded', () => {
  const isIndexPage = document.getElementById('cityGrid') !== null;

  if (isIndexPage) {
    initIndexPage();
  } else {
    initDetailPage();
  }
});

function initIndexPage() {
  const grid = document.getElementById('cityGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderCards(region) {
    grid.innerHTML = '';
    const filtered = region === '全部' 
      ? CITIES_DATA 
      : CITIES_DATA.filter(c => c.region === region);

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">目前尚無此區域資料。</p>';
      return;
    }

    filtered.forEach(city => {
      const card = document.createElement('div');
      card.className = 'city-card';
      card.innerHTML = `
        <div>
          <div class="city-header">
            <h3>${city.name}</h3>
            <span class="region-badge">${city.region}</span>
          </div>
          <div class="era-tag">${city.eraTag}</div>
          <p>${city.summary}</p>
        </div>
        <a href="city.html?id=${city.id}" class="detail-btn">深入了解歷史 &rarr;</a>
      `;
      grid.appendChild(card);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const region = e.target.getAttribute('data-region');
      renderCards(region);
    });
  });

  renderCards('全部');
}

function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const cityId = urlParams.get('id');
  const container = document.getElementById('cityContent');
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');

  const city = CITIES_DATA.find(c => c.id === cityId);

  if (!city) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem;">
        <h2 style="color: var(--accent); margin-bottom: 1rem;">找不到此縣市資料</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">請確認網址參數是否正確，或返回首頁重新選擇。</p>
        <a href="index.html" class="detail-btn">回到首頁</a>
      </div>
    `;
    return;
  }

  pageTitle.textContent = city.name + '歷史沿革';
  pageSubtitle.textContent = city.eraTag;

  let timelineHtml = city.timeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-period">${item.period}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>
  `).join('');

  let landmarkHtml = city.landmarks.map(item => `
    <div class="landmark-item">
      <h4>${item.name} <span style="font-size: 0.85rem; color: var(--accent); font-weight: normal;">(${item.year})</span></h4>
      <p>${item.description || item.note}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="detail-header">
      <span class="region-badge" style="margin-bottom: 0.5rem; display: inline-block;">${city.region}</span>
      <h2 style="font-family: 'Noto Serif TC', serif; color: var(--primary); font-size: 2rem; margin-bottom: 1rem;">${city.name}</h2>
      <p style="font-size: 1.1rem; color: var(--text-main); line-height: 1.8;">${city.summary}</p>
    </div>

    <h3 class="section-title">📜 歷史發展脈絡 (Timeline)</h3>
    <div class="timeline-container">
      ${timelineHtml}
    </div>

    <h3 class="section-title">🏛️ 代表性文化地標 (Landmarks)</h3>
    <div class="landmark-container">
      ${landmarkHtml}
    </div>
  `;
}