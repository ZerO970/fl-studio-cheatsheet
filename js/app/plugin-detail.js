/* ============================================================
   SELECT PLUGIN + RENDER DETAIL PAGE
   ============================================================ */

  /* ============================================================
     SELECT PLUGIN
  ============================================================ */
  window.selectPlugin = function (id) {
    const plugin = PLUGINS.find(p => p.id === id);
    if (!plugin) return;

    /* Если были на feature-screen — сохраняем путь назад */
    const fs = document.getElementById('feature-screen');
    const prevId = currentPlugin ? currentPlugin.id : null;
    if (fs && !fs.classList.contains('hidden')) {
      navPush(prevId ? currentPlugin.name : L('navBack'), () => {
        if (prevId) selectPlugin(prevId);
        else featureBack();
      });
    }

    currentPlugin = tP(plugin);
    currentTab    = 'overview';

    buildSidebar(searchQuery); /* обновить активную подсветку */
    renderDetail(currentPlugin);
    showDetail();
  };

  /* ============================================================
     RENDER DETAIL PAGE
  ============================================================ */
  function renderDetail(p) {
    const cat = CATEGORIES[p.category] || { color: '#888' };

    /* Hero — цветной фон */
    const heroBg = document.getElementById('plugin-hero-bg');
    heroBg.style.background =
      `radial-gradient(ellipse at 15% 60%, ${p.color}44 0%, transparent 65%),
       linear-gradient(135deg, ${p.color}18 0%, transparent 60%)`;

    /* Hero — скриншот справа */
    let heroImg = document.getElementById('plugin-hero-img');
    if (!heroImg) {
      heroImg = document.createElement('img');
      heroImg.id = 'plugin-hero-img';
      document.getElementById('plugin-hero').appendChild(heroImg);
    }
    if (p.screenshot) {
      heroImg.src = p.screenshot;
      heroImg.alt = p.name + ' interface';
      heroImg.style.display = 'block';
      heroImg.onerror = () => { heroImg.style.display = 'none'; };
    } else {
      heroImg.style.display = 'none';
    }

    /* Icon — лого разработчика если есть, иначе SVG-иницалы */
    document.getElementById('plugin-icon-wrap').innerHTML = makeIcon(p);

    /* Back button — показываем только если есть история */
    let detailBack = document.getElementById('plugin-detail-back');
    if (!detailBack) {
      detailBack = document.createElement('button');
      detailBack.id        = 'plugin-detail-back';
      detailBack.className = 'plugin-detail-back';
      detailBack.onclick   = () => {
        const prev = _navHistory.pop();
        if (prev) prev.restore();
        else goHome();
      };
      document.getElementById('plugin-hero').prepend(detailBack);
    }
    if (_navHistory.length > 0) {
      const prev = _navHistory[_navHistory.length - 1];
      detailBack.innerHTML = `
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${prev.label}`;
      detailBack.style.display = 'flex';
    } else {
      detailBack.style.display = 'none';
    }

    /* Meta */
    document.getElementById('plugin-developer').textContent = p.developer.toUpperCase();
    document.getElementById('plugin-name').textContent      = p.name;
    document.getElementById('plugin-tagline').textContent   = p.shortDesc;

    /* Badges + Compare button */
    document.getElementById('plugin-badge-row').innerHTML =
      (p.tags || []).slice(0, 5).map(t =>
        `<span class="hero-badge">${tL(t)}</span>`
      ).join('') +
      `<button class="hero-compare-btn" onclick="openCompareScreen('${p.id}')">
         <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
           <rect x="1" y="4" width="6" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
           <rect x="9" y="4" width="6" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
           <path d="M7 8h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
         </svg>
         ${L('featureCompareName')}
       </button>`;

    /* Tabs content — params rendered lazily on first open */
    renderOverview(p);
    renderGuide(p);
    renderTips(p);
    renderForumTips(p);

    /* Reset to overview tab */
    switchTab('overview');
  }

  /* ── Overview tab ── */
  function renderOverview(p) {
    const el = document.getElementById('tab-overview');
    el.innerHTML = `
      <div class="overview-grid">
        <div class="info-block" style="grid-column:1/-1">
          <div class="info-block-label">${L('labelDescription')}</div>
          <p>${p.description}</p>
        </div>

        <div class="info-block pros-block">
          <div class="info-block-label">${L('labelPros')}</div>
          <ul>${(p.pros || []).map(x => `<li>${x}</li>`).join('')}</ul>
        </div>

        <div class="info-block cons-block">
          <div class="info-block-label">${L('labelCons')}</div>
          <ul>${(p.cons || []).map(x => `<li>${x}</li>`).join('')}</ul>
        </div>

        <div class="info-block use-block">
          <div class="info-block-label">${L('labelWhen')}</div>
          <p>${p.when || '—'}</p>
        </div>
      </div>

      <div class="tags-row">
        ${(p.tags || []).map(t => `<span class="tag">${tL(t)}</span>`).join('')}
      </div>
    `;
  }

  /* ── Guide tab (accordion) ── */
  function renderGuide(p) {
    const el = document.getElementById('tab-guide');

    if (!p.guide || !p.guide.length) {
      el.innerHTML = `<p style="color:var(--text-3);padding:20px 0">${L('guideEmpty')}</p>`;
      return;
    }

    el.innerHTML = `<div class="guide-accordion">` +
      p.guide.map((section, i) => {
        let body = '';
        if (section.params) {
          body = `
            <table class="param-table">
              <thead><tr><th>${L('guideParamCol1')}</th><th>${L('guideParamCol2')}</th></tr></thead>
              <tbody>
                ${section.params.map(r =>
                  `<tr><td>${r.name}</td><td>${r.desc}</td></tr>`
                ).join('')}
              </tbody>
            </table>`;
        } else if (section.text) {
          body = `<p>${section.text}</p>`;
        }

        const isFirst = i === 0;
        return `
          <div class="guide-item${isFirst ? ' open' : ''}" id="gi-${p.id}-${i}">
            <div class="guide-item-header" onclick="toggleGuideItem(this.parentElement)">
              <svg class="guide-item-arrow" viewBox="0 0 14 14" fill="none">
                <path d="M4 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="guide-item-accent"></span>
              <span class="guide-item-title">${section.title}</span>
            </div>
            <div class="guide-item-body">${body}</div>
          </div>`;
      }).join('') +
    `</div>`;
  }

  window.toggleGuideItem = function(el) {
    el.classList.toggle('open');
  };

  /* ── Forum Tips tab ── */
  function renderForumTips(p) {
    const el = document.getElementById('tab-forum');

    if (!p.forumTips || !p.forumTips.length) {
      el.innerHTML = `
        <div class="forum-empty">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M3 5h18v12H14l-4 4v-4H3V5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
          ${L('forumEmpty')}
        </div>`;
      return;
    }

    const sourceClass = {
      'reddit':    'src-reddit',
      'kvr':       'src-kvr',
      'gearspace': 'src-gear',
      'fl forum':  'src-fl',
      'youtube':   'src-yt',
      'discord':   'src-discord',
    };

    el.innerHTML = `<div class="forum-tips-wrap">` +
      p.forumTips.map(tip => {
        const srcKey = (tip.source || '').toLowerCase();
        const cls = Object.keys(sourceClass).find(k => srcKey.includes(k))
                    ? sourceClass[Object.keys(sourceClass).find(k => srcKey.includes(k))]
                    : 'src-other';
        return `
          <div class="forum-tip-card">
            <div class="forum-tip-quote">"</div>
            <div class="forum-tip-meta">
              <span class="forum-source-badge ${cls}">${tip.source}</span>
              ${tip.author ? `<span class="forum-tip-author">— ${tip.author}</span>` : ''}
            </div>
            <div class="forum-tip-text">${tip.tip}</div>
          </div>`;
      }).join('') +
    `</div>`;
  }

  /* ── Params tab ── */
  function renderParams(p) {
    const el = document.getElementById('tab-params');
    const params = p.controlParams;

    if (!params || !params.length) {
      el.innerHTML = `<div class="params-empty">
        <div class="params-empty-icon">🔧</div>
        <div>${L('paramsEmpty')}</div>
      </div>`;
      return;
    }

    const hasScreenshot = !!p.screenshot;

    let markerHtml = '';
    const cardParts = [];
    params.forEach((pr, i) => {
      const num = i + 1;
      if (pr.x != null) {
        markerHtml += `<div class="param-marker" data-num="${num}" style="left:${pr.x}%;top:${pr.y}%">${num}</div>`;
      }
      cardParts.push(`
        <div class="param-card" data-num="${num}">
          <div class="param-card-top">
            <span class="param-card-num">${num}</span>
            <span class="param-card-name">${pr.name}</span>
          </div>
          <div class="param-card-range">${pr.range}</div>
          <div class="param-card-hover">
            <div class="param-card-default"><span class="param-label">${L('labelDefault')}</span> ${pr.def}</div>
            <div class="param-card-tip"><span class="param-label">💡</span> ${pr.tip}</div>
          </div>
        </div>`);
    });

    const screenshotHtml = hasScreenshot ? `
      <div class="params-shot-wrap">
        <img class="params-shot-img" src="${p.screenshot}" alt="${p.name}"
             onerror="this.closest('.params-shot-wrap').style.display='none'">
        ${markerHtml}
      </div>` : '';

    el.innerHTML = `
      <div class="params-layout">
        ${screenshotHtml}
        <div class="params-grid">${cardParts.join('')}</div>
      </div>`;
  }

  /* Delegated hover for param markers ↔ cards — attached once, survives innerHTML replacement */
  (function initParamsHover() {
    const tab = document.getElementById('tab-params');
    tab.addEventListener('mouseenter', function(e) {
      const t = e.target.closest('.param-marker, .param-card');
      if (!t) return;
      tab.querySelectorAll(`[data-num="${t.dataset.num}"]`).forEach(el => el.classList.add('active'));
    }, true);
    tab.addEventListener('mouseleave', function(e) {
      if (!e.target.closest('.param-marker, .param-card')) return;
      tab.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    }, true);
  }());

  /* ── Tips tab ── */
  function renderTips(p) {
    const el = document.getElementById('tab-tips');

    if (!p.tips || !p.tips.length) {
      el.innerHTML = `<p style="color:var(--text-3);padding:20px 0">${L('tipsEmpty')}</p>`;
      return;
    }

    el.innerHTML = `<div class="tips-list">` +
      p.tips.map((tip, i) => `
        <div class="tip-card">
          <span class="tip-num">${String(i + 1).padStart(2, '0')}</span>
          <div class="tip-text">
            <strong>${tip.title}</strong><br>
            ${tip.text}
          </div>
        </div>
      `).join('') +
    `</div>`;
  }

