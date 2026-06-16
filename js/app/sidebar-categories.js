/* ============================================================
   SIDEBAR / TAG RESULTS / CATEGORY GRID
   ============================================================ */

  function showTagResults(tag) {
    const results = PLUGINS.filter(p => (p.tags || []).includes(tag));
    categoryGrid.style.display = 'none';

    let resultsEl = document.getElementById('welcome-results');
    if (!resultsEl) {
      resultsEl = document.createElement('div');
      resultsEl.id = 'welcome-results';
      welcomeEl.querySelector('.welcome-inner').appendChild(resultsEl);
    }

    resultsEl.innerHTML = `
      <div style="text-align:left;margin-top:8px">
        <div style="font-size:12px;color:var(--text-3);margin-bottom:10px">
          ${L('searchTag')} <strong style="color:var(--accent)">#${tag}</strong> — ${results.length} ${L('searchPluginsCount')}
        </div>
        ${results.map(p => `
          <div class="search-result-item" onclick="selectPlugin('${p.id}')">
            <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></div>
            <div>
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-cat">${CAT_NAMES[currentLang][p.category] || p.category} · ${p.developer}</div>
            </div>
            <span class="badge ${p.badge}" style="margin-left:auto">${badgeLabel(p.badge)}</span>
          </div>`).join('')}
      </div>`;
  }

  /* ============================================================
     SIDEBAR TREE
  ============================================================ */
  function buildSidebar(filter) {
    filter = (filter || '').toLowerCase();

    /* группируем плагины по категориям */
    const groups = {};
    PLUGINS.forEach(p => {
      if (filter && !p.name.toLowerCase().includes(filter) &&
          !p.shortDesc.toLowerCase().includes(filter) &&
          !(p.tags || []).join(' ').toLowerCase().includes(filter)) return;
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });

    sidebar.innerHTML = '';

    Object.keys(groups).forEach(cat => {
      const catInfo  = CATEGORIES[cat] || { color: '#888', icon: '·' };
      const plugins  = groups[cat];
      const isOpen   = !!filter || (currentPlugin && currentPlugin.category === cat);

      const catEl = document.createElement('div');
      catEl.className = 'tree-category' + (isOpen ? ' open' : '');
      catEl.dataset.cat = cat;

      catEl.innerHTML = `
        <div class="tree-cat-header" onclick="toggleCategory(this.parentElement)">
          <svg class="tree-cat-arrow" viewBox="0 0 14 14" fill="none">
            <path d="M4 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="tree-cat-dot" style="background:${catInfo.color}"></span>
          <span class="tree-cat-name">${CAT_NAMES[currentLang][cat] || cat}</span>
          <span class="tree-cat-count">${plugins.length}</span>
          <button class="tree-cat-open-btn"
                  title="Открыть экран категории"
                  onclick="event.stopPropagation();openCategoryScreen('${cat}')">⊞</button>
        </div>
        <div class="tree-plugins">
          ${plugins.map(p => `
            <div class="tree-plugin ${currentPlugin && currentPlugin.id === p.id ? 'active' : ''}"
                 onclick="selectPlugin('${p.id}')">
              <span class="tree-plugin-name">${p.name}</span>
              <span class="tree-plugin-badge badge ${p.badge}">${badgeLabel(p.badge)}</span>
            </div>
          `).join('')}
        </div>
      `;

      sidebar.appendChild(catEl);
    });

    if (!sidebar.innerHTML) {
      sidebar.innerHTML = '<div style="padding:16px;color:var(--text-3);font-size:13px;">Ничего не найдено</div>';
    }
  }

  window.toggleCategory = function (el) {
    el.classList.toggle('open');
  };

  /* ============================================================
     SIDEBAR HOVER TOOLTIP
  ============================================================ */
  function initSidebarTooltip() {
    const tooltip = document.getElementById('sidebar-plugin-tooltip');
    if (!tooltip) return;

    let _ttHideTimer = null;

    function showTT(pluginId, anchorEl) {
      const found = PLUGINS.find(x => x.id === pluginId);
      if (!found) return;
      const p = tP(found);

      clearTimeout(_ttHideTimer);

      const rect = anchorEl.getBoundingClientRect();
      const topPos = Math.min(
        rect.top + rect.height / 2 - 60,
        window.innerHeight - 160
      );

      tooltip.style.top = Math.max(10, topPos) + 'px';
      tooltip.innerHTML = `
        <div class="stt-box">
          <div class="stt-top">
            <div class="stt-dot" style="background:${p.color}"></div>
            <div class="stt-name">${p.name}</div>
          </div>
          <div class="stt-dev">${p.developer} · ${CAT_NAMES[currentLang][p.category] || p.category}</div>
          <div class="stt-desc">${p.shortDesc}</div>
          <div class="stt-footer">
            <span class="badge ${p.badge}">${badgeLabel(p.badge)}</span>
            <span class="stt-hint">${currentLang === 'en' ? 'Enter / click' : 'Enter / клик'}</span>
          </div>
        </div>`;
      tooltip.classList.add('visible');
    }

    function hideTT() {
      _ttHideTimer = setTimeout(() => tooltip.classList.remove('visible'), 80);
    }

    /* Делегированные события на сайдбаре */
    sidebar.addEventListener('mouseover', e => {
      const item = e.target.closest('.tree-plugin');
      if (item) showTT(item.getAttribute('onclick').match(/'([^']+)'/)?.[1], item);
    });
    sidebar.addEventListener('mouseout', e => {
      if (!e.target.closest('.tree-plugin')) return;
      hideTT();
    });
  }

  /* ============================================================
     CATEGORY GRID (welcome screen)
  ============================================================ */
  function buildCategoryGrid() {
    welcomeEl.querySelector('.feature-nav')?.remove();
    const groups = {};
    PLUGINS.forEach(p => {
      if (!groups[p.category]) groups[p.category] = 0;
      groups[p.category]++;
    });

    categoryGrid.innerHTML = Object.keys(groups).map(cat => {
      const info = CATEGORIES[cat] || { color: '#888' };
      return `
        <div class="cat-card" onclick="filterByCategory('${cat}')">
          <div class="cat-card-dot" style="background:${info.color}"></div>
          <div class="cat-card-name">${CAT_NAMES[currentLang][cat] || cat}</div>
          <div class="cat-card-count">${groups[cat]} ${L('pluginsCount')}</div>
        </div>
      `;
    }).join('');

    /* Feature nav cards */
    const featureNav = document.createElement('div');
    featureNav.className = 'feature-nav';
    featureNav.innerHTML = `
      <div class="feature-card" onclick="openChainsScreen()">
        <span class="feature-card-icon">⛓️</span>
        <div class="feature-card-name">${L('featureChainsName')}</div>
        <div class="feature-card-desc">${L('featureChainsDesc')}</div>
      </div>
      <div class="feature-card" onclick="openCompatScreen()">
        <span class="feature-card-icon">🔗</span>
        <div class="feature-card-name">${L('featureCompatName')}</div>
        <div class="feature-card-desc">${L('featureCompatDesc')}</div>
      </div>
      <div class="feature-card" onclick="openQuizScreen()">
        <span class="feature-card-icon">🎯</span>
        <div class="feature-card-name">${L('featureQuizName')}</div>
        <div class="feature-card-desc">${L('featureQuizDesc')}</div>
      </div>
      <div class="feature-card" onclick="openSignalFlow()">
        <span class="feature-card-icon">〰️</span>
        <div class="feature-card-name">${L('featureSfName')}</div>
        <div class="feature-card-desc">${L('featureSfDesc')}</div>
      </div>
      <div class="feature-card" onclick="openCompareScreen(null)">
        <span class="feature-card-icon">⚖️</span>
        <div class="feature-card-name">${L('featureCompareName')}</div>
        <div class="feature-card-desc">${L('featureCompareDesc')}</div>
      </div>
    `;
    welcomeEl.querySelector('.welcome-inner').appendChild(featureNav);
  }

  window.filterByCategory = function (cat) {
    /* Разворачиваем категорию в сайдбаре */
    buildSidebar('');
    const sidebar = document.getElementById('plugin-tree');
    const catEl = sidebar && sidebar.querySelector(`[data-cat="${cat}"]`);
    if (catEl) {
      catEl.classList.add('open');
      setTimeout(() => catEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
    openCategoryScreen(cat);
  };

