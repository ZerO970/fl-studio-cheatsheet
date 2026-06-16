/* ============================================================
   TABS / SEARCH / SHOW-HIDE SCREENS
   ============================================================ */

  /* ============================================================
     TABS
  ============================================================ */
  function bindTabs() {
    document.getElementById('tabs').addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab(btn.dataset.tab);
    });
  }

  function switchTab(name) {
    currentTab = name;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === name);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === 'tab-' + name);
    });
    if (name === 'guide') setTimeout(addParamAnimations, 50);
    if (name === 'params' && currentPlugin) renderParams(currentPlugin);
  }

  /* ============================================================
     SEARCH
  ============================================================ */
  function bindSearch() {
    sidebarSearch.addEventListener('input', e => {
      searchQuery = e.target.value;
      if (welcomeSearch) welcomeSearch.value = searchQuery;
      buildSidebar(searchQuery);
    });

    if (welcomeSearch) {
      welcomeSearch.addEventListener('input', e => {
        searchQuery = e.target.value;
        if (searchQuery.length > 1) {
          showSearchResults(searchQuery);
        } else {
          showWelcome();
        }
      });

      welcomeSearch.addEventListener('keydown', e => {
        if (e.key === 'Escape') { welcomeSearch.value = ''; searchQuery = ''; showWelcome(); }
      });
    }
  }

  function showSearchResults(q) {
    q = q.toLowerCase();
    const results = PLUGINS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      (p.tags || []).join(' ').toLowerCase().includes(q) ||
      (p.developer || '').toLowerCase().includes(q)
    );

    welcomeEl.querySelector('.welcome-inner > *:not(.welcome-logo):not(h1):not(p):not(.welcome-search-wrap)')
    && null; /* не трогаем шапку */

    /* показываем результаты прямо под поиском */
    let resultsEl = document.getElementById('welcome-results');
    if (!resultsEl) {
      resultsEl = document.createElement('div');
      resultsEl.id = 'welcome-results';
      welcomeEl.querySelector('.welcome-inner').appendChild(resultsEl);
    }

    categoryGrid.style.display = 'none';

    if (!results.length) {
      resultsEl.innerHTML = '<div class="no-results">Ничего не найдено</div>';
      return;
    }

    resultsEl.innerHTML = `
      <div style="text-align:left;margin-top:8px">
        <div style="font-size:12px;color:var(--text-3);margin-bottom:10px">
          ${L('searchFoundCount')} ${results.length} ${L('searchPluginsCount')}
        </div>
        ${results.map(p => {
          const cat = CATEGORIES[p.category] || { color: '#888' };
          return `
            <div class="search-result-item" onclick="selectPlugin('${p.id}')">
              <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></div>
              <div>
                <div class="search-result-name">${highlight(p.name, q)}</div>
                <div class="search-result-cat">${CAT_NAMES[currentLang][p.category] || p.category} · ${p.developer}</div>
              </div>
              <span class="badge ${p.badge}" style="margin-left:auto">${badgeLabel(p.badge)}</span>
            </div>`;
        }).join('')}
      </div>`;
  }

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp(`(${q})`, 'gi');
    return text.replace(re, '<mark style="background:var(--accent-glow);color:var(--accent);border-radius:2px">$1</mark>');
  }

  /* ============================================================
     SHOW / HIDE SCREENS
  ============================================================ */
  function showWelcome() {
    _activeFeatureScreen = null;
    welcomeEl.classList.remove('hidden');
    detailEl.classList.add('hidden');
    const fs = document.getElementById('feature-screen');
    if (fs) fs.classList.add('hidden');
    categoryGrid.style.display = '';
    const wr = document.getElementById('welcome-results');
    if (wr) wr.innerHTML = '';
    setHomeActive(true);
    /* Возобновляем welcome canvas */
    if (_wcResume) _wcResume();
  }

  window.goHome = function() {
    currentPlugin = null;
    searchQuery   = '';
    _activeTag    = null;
    navClearHistory();
    if (sidebarSearch) sidebarSearch.value = '';
    /* сбрасываем активный чип */
    document.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('active'));
    buildSidebar('');
    showWelcome();
  };

  function setHomeActive(active) {
    const btn = document.getElementById('sidebar-home-btn');
    if (btn) btn.classList.toggle('active', active);
  }

  function showDetail() {
    _activeFeatureScreen = null;
    welcomeEl.classList.add('hidden');
    if (_wcPause) _wcPause();   /* останавливаем welcome canvas */
    detailEl.classList.remove('hidden');
    /* slide-in animation */
    detailEl.classList.remove('anim');
    void detailEl.offsetWidth; /* reflow */
    detailEl.classList.add('anim');
    const fs = document.getElementById('feature-screen');
    if (fs) fs.classList.add('hidden');
    document.getElementById('main').scrollTop = 0;
    setHomeActive(false);
  }

