/* ============================================================
   CHAINS SCREEN
   ============================================================ */

  /* ============================================================
     CHAINS SCREEN
  ============================================================ */
  let _chainsGenreFilter = 'all';

  window.openChainsScreen = function() {
    _activeFeatureScreen = { type: 'chains' };
    navPush(L('navHome'), () => { navClearHistory(); showWelcome(); });
    renderChainsScreen();
  };

  function renderChainsScreen() {
    const genres = ['all', ...new Set(CHAINS.map(c => c.genre))];

    const genrePills = genres.map(g => `
      <span class="genre-pill${_chainsGenreFilter === g ? ' active' : ''}"
            onclick="filterChainGenre('${g}')">
        ${g === 'all' ? L('genreAll') : g}
      </span>`).join('');

    const filtered = _chainsGenreFilter === 'all'
      ? CHAINS
      : CHAINS.filter(c => c.genre === _chainsGenreFilter);

    const cards = filtered.map(chain => {
      const tc = tChain(chain);
      const pluginNames = chain.steps.map(s => {
        const p = PLUGINS.find(x => x.id === s.pluginId);
        return p ? `<span class="chain-plugin-dot">${p.name}</span>` : '';
      }).join('');

      return `
        <div class="chain-card" style="--chain-color:${chain.color}"
             onclick="openChainDetail('${chain.id}')">
          <div class="chain-card-header">
            <span class="chain-icon">${chain.icon}</span>
            <span class="chain-genre-tag">${chain.genre}</span>
          </div>
          <div class="chain-card-name">${tc.name}</div>
          <div class="chain-card-desc">${tc.desc}</div>
          <div class="chain-plugins-preview">${pluginNames}</div>
        </div>`;
    }).join('');

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">${L('chainsTitle')}</h1>
        </div>
        <div class="chains-genres">${genrePills}</div>
        <div class="chains-grid">${cards}</div>
      </div>
    `);
  }

  window.filterChainGenre = function(genre) {
    _chainsGenreFilter = genre;
    renderChainsScreen();
  };

  window.openChainDetail = function(id) {
    const rawChain = CHAINS.find(c => c.id === id);
    if (!rawChain) return;
    const chain = tChain(rawChain);
    _activeFeatureScreen = { type: 'chainDetail', id };
    navPush(L('navChains'), () => renderChainsScreen());

    const steps = chain.steps.map((step, i) => {
      const p = PLUGINS.find(x => x.id === step.pluginId);
      const name = p ? p.name : step.pluginId;
      const clickAttr = p ? `onclick="selectPluginFromChain('${p.id}','${chain.id}')"` : '';
      return `
        <div class="chain-step">
          <div class="chain-step-num">${i + 1}</div>
          <div class="chain-step-body" ${clickAttr}
               title="${p ? 'Открыть ' + name : ''}">
            <div class="chain-step-role">${step.role}</div>
            <div class="chain-step-name">${name}</div>
            <div class="chain-step-note">${step.note}</div>
          </div>
        </div>`;
    }).join('');

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">${chain.icon} ${chain.name}</h1>
        </div>
        <div class="chain-detail-header">
          <span class="chain-detail-icon">${chain.icon}</span>
          <div class="chain-detail-meta">
            <h1>${chain.name}</h1>
            <p>${chain.desc}</p>
          </div>
        </div>
        <div class="chain-steps">${steps}</div>
      </div>
    `);
  };

  window.selectPluginFromChain = function(id, chainId) {
    if (chainId) navPush(L('navChains'), () => openChainDetail(chainId));
    selectPlugin(id);
  };

