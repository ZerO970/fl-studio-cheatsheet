/* ============================================================
   FL Studio Plugin Cheatsheet — App Logic
   ============================================================ */

(function () {

  /* ── State ── */
  let currentPlugin   = null;
  let currentTab      = 'overview';
  let searchQuery     = '';
  let comparePluginA  = null;
  let comparePluginB  = null;
  let kbFocusIndex    = -1;
  let kbPluginList    = [];
  let _pickerCallback = null;

  /* ── DOM refs ── */
  const sidebar       = document.getElementById('plugin-tree');
  const welcomeEl     = document.getElementById('welcome');
  const detailEl      = document.getElementById('plugin-detail');
  const categoryGrid  = document.getElementById('category-grid');
  const totalCount    = document.getElementById('total-count');
  const sidebarSearch = document.getElementById('sidebar-search');
  const welcomeSearch = document.getElementById('welcome-search');

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    totalCount.textContent = PLUGINS.length;
    buildSidebar();
    buildCategoryGrid();
    buildTagChips();
    bindSearch();
    bindTabs();
    initTheme();
    bindKeyboard();
    initSidebarTooltip();
    initWelcomeCanvas();
    showWelcome();
  }

  /* ============================================================
     TAG CHIPS
  ============================================================ */
  let _activeTag = null;

  function buildTagChips() {
    const wrap = document.getElementById('tag-chips-wrap');
    if (!wrap) return;

    /* Собираем все теги + частоту */
    const freq = {};
    PLUGINS.forEach(p => (p.tags || []).forEach(t => { freq[t] = (freq[t] || 0) + 1; }));
    /* Сортируем по частоте, берём топ-20 */
    const top = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([t]) => t);

    const SHOW_INIT = 12;
    let expanded = false;

    function render() {
      const list = expanded ? top : top.slice(0, SHOW_INIT);
      wrap.innerHTML = list.map(tag => `
        <span class="tag-chip ${_activeTag === tag ? 'active' : ''}"
              onclick="selectTag('${tag}')">
          <span class="tag-chip-hash">#</span>${tag}
        </span>`).join('') +
        (top.length > SHOW_INIT
          ? `<span class="tag-chips-more" onclick="toggleTagChips()">
               ${expanded ? '↑ Свернуть' : `+ ещё ${top.length - SHOW_INIT}`}
             </span>`
          : '');
    }

    window.toggleTagChips = function() { expanded = !expanded; render(); };
    render();
  }

  window.selectTag = function(tag) {
    if (_activeTag === tag) {
      /* снимаем фильтр */
      _activeTag = null;
      /* сбрасываем отображение */
      document.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('active'));
      showWelcome();
      return;
    }
    _activeTag = tag;
    document.querySelectorAll('.tag-chip').forEach(c => {
      c.classList.toggle('active', c.textContent.trim().replace(/^#/, '') === tag);
    });
    showTagResults(tag);
  };

  /* ============================================================
     WELCOME CANVAS — атмосферная фоновая анимация
  ============================================================ */
  let _wcAnimId  = null;
  let _wcStart   = null;
  let _wcResume  = null;
  let _wcPause   = null;

  function initWelcomeCanvas() {
    const canvas = document.getElementById('welcome-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* W/H — берём у самого canvas после CSS-layout */
    function getSize() {
      const r = canvas.getBoundingClientRect();
      return { W: r.width || window.innerWidth, H: r.height || window.innerHeight };
    }

    /* Выставляем буфер = CSS-размер (без dpr — просто чтобы работало) */
    function fitCanvas() {
      const { W, H } = getSize();
      if (W > 0 && canvas.width !== Math.round(W)) {
        canvas.width  = Math.round(W);
        canvas.height = Math.round(H);
      }
    }

    window.addEventListener('resize', fitCanvas);


    const waves = [
      { amp: 0.07,  freq: 0.0016, speed: 0.00020, phase: 0,              alpha: 0.45 },
      { amp: 0.05,  freq: 0.0024, speed: 0.00030, phase: Math.PI * 0.66, alpha: 0.30 },
      { amp: 0.035, freq: 0.0035, speed: 0.00044, phase: Math.PI * 1.33, alpha: 0.18 },
    ];

    const rings = Array.from({ length: 5 }, () => ({
      x: 0.15 + Math.random() * 0.7, y: 0.2 + Math.random() * 0.6,
      r: 40 + Math.random() * 90,
      phase: Math.random() * Math.PI * 2,
      speed: 0.00016 + Math.random() * 0.00020,
      alpha: 0.12 + Math.random() * 0.10,
    }));

    function getAccent() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#F97316';
    }

    function loop(ts) {
      _wcAnimId = requestAnimationFrame(loop);          /* планируем следующий кадр первым */

      fitCanvas();                                       /* подгоняем размер если нужно */
      if (!canvas.width || !canvas.height) return;      /* размер ещё не готов */

      if (!_wcStart) _wcStart = ts;
      const t = ts - _wcStart;
      const cW = canvas.width, cH = canvas.height;

      ctx.clearRect(0, 0, cW, cH);

      const [ar, ag, ab] = hexToRgbW(getAccent());

      waves.forEach(w => {
        ctx.beginPath();
        for (let x = 0; x <= cW; x += 3) {
          const y = cH * 0.5
            + Math.sin(x * w.freq + t * w.speed + w.phase) * cH * w.amp
            + Math.sin(x * w.freq * 1.8 + t * w.speed * 0.55 + w.phase + 1.2) * cH * w.amp * 0.38;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${w.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      rings.forEach(rg => {
        const cx    = rg.x * cW;
        const cy    = rg.y * cH + Math.sin(t * rg.speed + rg.phase) * 20;
        const pulse = rg.r + Math.sin(t * rg.speed * 2.1 + rg.phase) * 12;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1, pulse), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${rg.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

    }

    /* Публичные методы */
    _wcResume = function() {
      if (_wcAnimId) return;
      _wcStart  = null;
      _wcAnimId = requestAnimationFrame(loop);
    };
    _wcPause = function() {
      if (_wcAnimId) { cancelAnimationFrame(_wcAnimId); _wcAnimId = null; }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) _wcPause();
      else if (!welcomeEl.classList.contains('hidden')) _wcResume();
    });

    /* Запуск */
    _wcAnimId = requestAnimationFrame(loop);
  }

  /* Хелпер — hex → [r,g,b] для welcome canvas */
  function hexToRgbW(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  /* После смены темы — перезапускаем welcome canvas чтобы акцент обновился */
  const _origApplyTheme_wc = window.setTheme;
  window.setTheme = function(id) {
    if (_origApplyTheme_wc) _origApplyTheme_wc(id);
    /* canvas перечитывает accent динамически через getComputedStyle — ничего лишнего */
  };

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
          Тег <strong style="color:var(--accent)">#${tag}</strong> — ${results.length} плагинов
        </div>
        ${results.map(p => `
          <div class="search-result-item" onclick="selectPlugin('${p.id}')">
            <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></div>
            <div>
              <div class="search-result-name">${p.name}</div>
              <div class="search-result-cat">${p.category} · ${p.developer}</div>
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
          <span class="tree-cat-name">${cat}</span>
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
      const p = PLUGINS.find(x => x.id === pluginId);
      if (!p) return;

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
          <div class="stt-dev">${p.developer} · ${p.category}</div>
          <div class="stt-desc">${p.shortDesc}</div>
          <div class="stt-footer">
            <span class="badge ${p.badge}">${badgeLabel(p.badge)}</span>
            <span class="stt-hint">Enter / клик</span>
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
          <div class="cat-card-name">${cat}</div>
          <div class="cat-card-count">${groups[cat]} плагинов</div>
        </div>
      `;
    }).join('');

    /* Feature nav cards */
    const featureNav = document.createElement('div');
    featureNav.className = 'feature-nav';
    featureNav.innerHTML = `
      <div class="feature-card" onclick="openChainsScreen()">
        <span class="feature-card-icon">⛓️</span>
        <div class="feature-card-name">Цепочки плагинов</div>
        <div class="feature-card-desc">Готовые чейны для Melodic Techno, Hi Techno, EDM и не только</div>
      </div>
      <div class="feature-card" onclick="openCompatScreen()">
        <span class="feature-card-icon">🔗</span>
        <div class="feature-card-name">Совместимость</div>
        <div class="feature-card-desc">Какие плагины работают вместе, а какие конфликтуют</div>
      </div>
      <div class="feature-card" onclick="openQuizScreen()">
        <span class="feature-card-icon">🎯</span>
        <div class="feature-card-name">Что мне нужно?</div>
        <div class="feature-card-desc">Квиз подберёт плагины под твою задачу за 2–3 вопроса</div>
      </div>
      <div class="feature-card" onclick="openSignalFlow()">
        <span class="feature-card-icon">〰️</span>
        <div class="feature-card-name">Signal Flow</div>
        <div class="feature-card-desc">Собери свою цепочку обработки drag & drop'ом</div>
      </div>
      <div class="feature-card" onclick="openCompareScreen(null)">
        <span class="feature-card-icon">⚖️</span>
        <div class="feature-card-name">Сравнение</div>
        <div class="feature-card-desc">Сравни два плагина рядом — плюсы, минусы, теги</div>
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

  /* ============================================================
     CATEGORY SCREEN — полный экран категории с canvas-анимацией
  ============================================================ */

  let _catAnimId    = null;
  let _catAnimStart = null;

  /* Описания категорий для подзаголовка */
  const CAT_DESC = {
    'EQ':                    'Эквалайзеры — тональная коррекция, формирование тембра, хирургические резы',
    'Динамика':              'Компрессоры, лимитеры, транзиент-процессоры — контроль динамического диапазона',
    'Мастеринг':             'Финальная обработка трека перед релизом — максимальная громкость и баланс',
    'Реверб':                'Пространственные эффекты — от маленькой комнаты до огромного зала',
    'Дилей':                 'Эффекты задержки — эхо, пинг-понг, модулированные повторения',
    'Стерео и пространство': 'Расширение стерео-поля, управление позицией в миксе',
    'Фильтры':               'LP, HP, Band-Pass фильтры, резонансные фильтры со свипом',
    'Дисторшн и сатурация':  'Искажения, сатурация, клиппинг — от мягкого тепла до агрессивного fuzz',
    'Модуляция':             'Хорус, флэнжер, фэйзер, тремоло — движение и глубина звука',
    'Утилиты':               'Вспомогательные инструменты — routing, мониторинг, автоматизация',
    'Новые (New)':           'Новые плагины в коллекции',
  };

  window.openCategoryScreen = function(cat) {
    stopCategoryAnimation();

    const catInfo = CATEGORIES[cat] || { color: '#888', icon: '·' };
    const plugins = PLUGINS.filter(p => p.category === cat);
    const desc    = CAT_DESC[cat] || '';

    const cards = plugins.map(p => {
      /* Mini logo или цветной квадрат */
      const logoHtml = p.developerLogo
        ? `<div class="cat-plugin-card-logo" style="background:${p.color}22;border:1px solid ${p.color}33">
             <img src="${p.developerLogo}" alt="${p.developer}"
                  onerror="this.style.display='none'"
                  style="width:100%;height:100%;object-fit:contain;padding:4px">
           </div>`
        : `<div class="cat-plugin-card-logo" style="background:${p.color}33;border:1px solid ${p.color}44">
             <svg width="24" height="24" viewBox="0 0 36 36">
               <rect width="36" height="36" rx="8" fill="${p.color}"/>
               <text x="18" y="24" text-anchor="middle" font-size="${p.name.split(' ').map(w=>w[0]).join('').length>2?12:15}"
                     font-weight="700" fill="rgba(255,255,255,0.9)"
                     font-family="-apple-system,sans-serif">
                 ${p.name.split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase()}
               </text>
             </svg>
           </div>`;

      return `
        <div class="cat-plugin-card" onclick="selectPlugin('${p.id}')">
          <div class="cat-plugin-card-top" style="background:${p.color}"></div>
          <div class="cat-plugin-card-body">
            ${logoHtml}
            <div class="cat-plugin-card-name">${p.name}</div>
            <div class="cat-plugin-card-dev">${p.developer}</div>
            <div class="cat-plugin-card-desc">${p.shortDesc}</div>
            <div class="cat-plugin-card-footer">
              <span class="badge ${p.badge}">${badgeLabel(p.badge)}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    showFeatureScreen(`
      <div id="cat-screen-wrap">
        <canvas id="cat-bg-canvas"></canvas>
        <div class="cat-screen-inner">
          <div class="screen-header">
            ${backBtn()}
          </div>
          <div class="cat-screen-header">
            <div class="cat-screen-icon"
                 style="background:${catInfo.color}18;border-color:${catInfo.color}44;color:${catInfo.color}">
              ${catInfo.icon}
            </div>
            <div>
              <div class="cat-screen-title">${cat}</div>
              <div class="cat-screen-count">${plugins.length} плагинов</div>
              <div class="cat-screen-desc">${desc}</div>
            </div>
          </div>
          <div class="cat-plugins-grid">${cards}</div>
        </div>
        <div class="cat-anim-label">${cat} visualizer</div>
      </div>
    `);

    /* Запускаем анимацию после рендера */
    requestAnimationFrame(() => startCategoryAnimation(cat, catInfo.color));
  };

  function stopCategoryAnimation() {
    if (_catAnimId) { cancelAnimationFrame(_catAnimId); _catAnimId = null; }
    _catAnimStart = null;
  }

  function startCategoryAnimation(cat, colorHex) {
    const canvas = document.getElementById('cat-bg-canvas');
    if (!canvas) return;

    const wrap = document.getElementById('cat-screen-wrap');
    if (!wrap) return;

    /* Размер канваса под область #main */
    function resize() {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    resize();

    const ctx = canvas.getContext('2d');
    const animFn = CAT_ANIM_FNS[cat] || CAT_ANIM_FNS['_default'];

    _catAnimStart = null;
    const loop = (ts) => {
      if (!document.getElementById('cat-bg-canvas')) return; /* ушли со страницы */
      if (!_catAnimStart) _catAnimStart = ts;
      const t = ts - _catAnimStart;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFn(ctx, canvas.width, canvas.height, t, colorHex);
      _catAnimId = requestAnimationFrame(loop);
    };
    _catAnimId = requestAnimationFrame(loop);
  }

  /* ============================================================
     CANVAS ANIMATIONS — одна функция на категорию
     Сигнатура: (ctx, W, H, t_ms, colorHex)
  ============================================================ */

  /* ── Утилиты ── */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
    const n = parseInt(hex, 16);
    return [(n>>16)&255, (n>>8)&255, n&255];
  }

  function rgba(hex, a) {
    const [r,g,b] = hexToRgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ── EQ — спектр-анализатор + морфирующая кривая ── */
  function animEQ(ctx, W, H, t, col) {
    const bars = 72;
    const bw   = W / bars;

    /* Spectrum bars */
    for (let i = 0; i < bars; i++) {
      const x = i * bw;
      const phase = i * 0.18;
      /* несколько синусоид разных частот → органичное движение */
      const h = (
        Math.sin(t * 0.0009  + phase) * 0.22 +
        Math.sin(t * 0.00055 + phase * 1.7) * 0.18 +
        Math.sin(t * 0.0014  + phase * 0.6) * 0.12 +
        0.38
      ) * H * 0.75;

      const grad = ctx.createLinearGradient(x, H - h, x, H);
      grad.addColorStop(0, rgba(col, 0.7));
      grad.addColorStop(1, rgba(col, 0.05));
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1, H - h, bw - 2, h);
    }

    /* EQ curve overlay */
    const pts = 10;
    const step = W / pts;

    ctx.beginPath();
    for (let i = 0; i <= pts; i++) {
      const x = i * step;
      const y = H * 0.5
        + Math.sin(t * 0.00055 + i * 0.55) * H * 0.18
        + Math.sin(t * 0.00085 * (i * 0.4 + 1) + i * 0.9) * H * 0.09;

      if (i === 0) ctx.moveTo(x, y);
      else {
        const px = (i - 1) * step;
        const py = H * 0.5
          + Math.sin(t * 0.00055 + (i-1) * 0.55) * H * 0.18
          + Math.sin(t * 0.00085 * ((i-1) * 0.4 + 1) + (i-1) * 0.9) * H * 0.09;
        const cpx = (px + x) / 2;
        ctx.bezierCurveTo(cpx, py, cpx, y, x, y);
      }
    }

    ctx.strokeStyle = rgba(col, 0.9);
    ctx.lineWidth   = 2.5;
    ctx.stroke();

    /* Grid lines */
    ctx.strokeStyle = rgba(col, 0.06);
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = (H / 5) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (let i = 1; i < 9; i++) {
      const x = (W / 9) * i;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
  }

  /* ── Динамика — компрессионная волна ── */
  function animDynamics(ctx, W, H, t, col) {
    const period = 6000; /* 6с цикл */
    const phase  = (t % period) / period;

    /* Incoming waveform */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.3);
    ctx.lineWidth   = 1.5;
    for (let x = 0; x <= W; x += 2) {
      const nx   = x / W;
      const amp  = H * 0.38;
      const freq = 8;
      const y    = H / 2 + Math.sin(nx * Math.PI * freq + t * 0.003) * amp
                           * Math.sin(nx * Math.PI);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Compressed output (smaller amplitude) */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.85);
    ctx.lineWidth   = 2;
    for (let x = 0; x <= W; x += 2) {
      const nx   = x / W;
      const compRatio = 0.42 + Math.sin(phase * Math.PI * 2 - 1) * 0.08;
      const amp  = H * 0.38 * compRatio;
      const y    = H / 2 + Math.sin(nx * Math.PI * 8 + t * 0.003) * amp
                           * Math.sin(nx * Math.PI);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Threshold line */
    const thY = H * 0.32;
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = rgba(col, 0.35);
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(0, thY); ctx.lineTo(W, thY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, H - thY); ctx.lineTo(W, H - thY); ctx.stroke();
    ctx.setLineDash([]);

    /* GR meter on right */
    const gr = 0.15 + Math.abs(Math.sin(t * 0.0015)) * 0.25;
    ctx.fillStyle = rgba(col, 0.12);
    ctx.fillRect(W - 18, H * (0.5 - gr), 10, H * gr * 2);
    ctx.strokeStyle = rgba(col, 0.5);
    ctx.lineWidth = 1;
    ctx.strokeRect(W - 18, H * (0.5 - gr), 10, H * gr * 2);
  }

  /* ── Мастеринг — многополосный VU ── */
  function animMastering(ctx, W, H, t, col) {
    const bands = [
      { name:'Sub', f: 0.00060 },
      { name:'Bass', f: 0.00078 },
      { name:'Low', f: 0.00095 },
      { name:'Mid', f: 0.00110 },
      { name:'Hi-Mid', f: 0.00130 },
      { name:'Air', f: 0.00150 },
    ];
    const bw = W / bands.length;

    bands.forEach((b, i) => {
      const x   = i * bw;
      const raw = (Math.sin(t * b.f + i * 1.1) * 0.3 + Math.sin(t * b.f * 1.6 + i) * 0.2 + 0.6);
      const lev = Math.max(0.05, Math.min(0.95, raw));

      /* Background track */
      ctx.fillStyle = rgba(col, 0.05);
      ctx.beginPath();
      ctx.roundRect(x + bw*0.18, H*0.08, bw*0.64, H*0.82, 3);
      ctx.fill();

      /* Level fill */
      const levelH = H * 0.82 * lev;
      const grad = ctx.createLinearGradient(x, H*0.08, x, H*0.9);
      grad.addColorStop(0,   rgba('#EF4444', lev > 0.85 ? 0.8 : 0));
      grad.addColorStop(0.15, rgba('#F59E0B', 0.6));
      grad.addColorStop(0.6,  rgba(col, 0.7));
      grad.addColorStop(1,    rgba(col, 0.2));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x + bw*0.18, H*0.9 - levelH, bw*0.64, levelH, 3);
      ctx.fill();

      /* Peak dot */
      const pkY = H*0.9 - levelH;
      ctx.fillStyle = rgba(col, 0.9);
      ctx.fillRect(x + bw*0.18, pkY - 2, bw*0.64, 3);
    });

    /* Loudness line overlay */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.5);
    ctx.lineWidth   = 1.5;
    for (let x = 0; x <= W; x += 3) {
      const y = H * 0.5 + Math.sin(t * 0.0004 + x / W * Math.PI * 3) * H * 0.06;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  /* ── Реверб — концентрические круги ── */
  function animReverb(ctx, W, H, t, col) {
    const maxR  = Math.sqrt(W * W + H * H) * 0.65;
    const cx    = W * 0.5;
    const cy    = H * 0.5;
    const count = 8;

    for (let i = 0; i < count; i++) {
      const offset = (i / count);
      const phase  = ((t * 0.0001 + offset) % 1);
      const r      = phase * maxR;
      const alpha  = (1 - phase) * 0.45;

      if (alpha < 0.01) continue;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(col, alpha);
      ctx.lineWidth   = 1.5 * (1 - phase * 0.7);
      ctx.stroke();
    }

    /* Центральная точка */
    const pulseR = 4 + Math.sin(t * 0.004) * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
    ctx.fillStyle = rgba(col, 0.8);
    ctx.fill();

    /* IR decay curve */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.35);
    ctx.lineWidth   = 1;
    for (let x = 0; x <= W; x += 2) {
      const decayRate = 4.5;
      const y = H * 0.85 - Math.exp(-x / W * decayRate) * H * 0.6
                          * (0.8 + Math.sin(t * 0.0008 + x * 0.04) * 0.2);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  /* ── Дилей — эхо-линии ── */
  function animDelay(ctx, W, H, t, col) {
    const repeatCount = 6;
    const period      = 4000; /* 4с = один цикл */
    const beatPos     = (t % period) / period;

    /* Горизонтальные эхо-линии */
    for (let echo = 0; echo < repeatCount; echo++) {
      const delay    = echo / repeatCount;
      const progress = ((beatPos - delay + 1) % 1);
      const feedback = Math.pow(0.65, echo);
      const alpha    = (1 - echo / repeatCount) * 0.75 * (1 - progress * 0.4);

      if (alpha < 0.02) continue;

      const yBase = H * 0.5;
      const amp   = H * 0.34 * feedback;

      ctx.beginPath();
      ctx.strokeStyle = rgba(col, alpha);
      ctx.lineWidth   = 2.2 * feedback;

      for (let px = 0; px <= W; px += 2) {
        const nx    = px / W;
        /* t добавлен — волна «едет» влево, каждое эхо чуть медленнее */
        const speed = 0.0018 * (1 - echo * 0.12);
        const y = yBase
          + Math.sin(nx * Math.PI * 5 - t * speed + echo * 0.9) * amp
          * Math.sin(nx * Math.PI)
          * (1 - Math.abs(nx - 0.5) * 0.35);
        if (px === 0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
      }
      ctx.stroke();
    }

    /* Вертикальная бегущая линия (playhead) */
    const headX = beatPos * W;
    ctx.strokeStyle = rgba(col, 0.35);
    ctx.lineWidth   = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(headX, 0); ctx.lineTo(headX, H); ctx.stroke();
    ctx.setLineDash([]);

    /* Темп-метки сверху */
    for (let b = 0; b < 4; b++) {
      const bx = (b / 4) * W;
      ctx.fillStyle = rgba(col, b === 0 ? 0.4 : 0.13);
      ctx.fillRect(bx - 1, 0, 2, 8);
    }
  }

  /* ── Стерео — Lissajous / vectorscope ── */
  function animStereo(ctx, W, H, t, col) {
    const cx = W / 2, cy = H / 2;
    const r  = Math.min(W, H) * 0.38;
    const N  = 512;

    /* Оси */
    ctx.strokeStyle = rgba(col, 0.08);
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(cx - r * 1.1, cy); ctx.lineTo(cx + r * 1.1, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r * 1.1); ctx.lineTo(cx, cy + r * 1.1); ctx.stroke();

    /* Диагонали (M/S оси) */
    ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(cx - r, cy - r); ctx.lineTo(cx + r, cy + r); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + r, cy - r); ctx.lineTo(cx - r, cy + r); ctx.stroke();
    ctx.setLineDash([]);

    /* Lissajous figure */
    const f1 = 1.0, f2 = 1.618; /* золотое сечение */
    const phi = t * 0.00025;

    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const theta = (i / N) * Math.PI * 2;
      const x = cx + r * Math.sin(f1 * theta + phi);
      const y = cy + r * Math.sin(f2 * theta);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = rgba(col, 0.55);
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    /* Dot moving along the figure */
    const dp   = (t * 0.001) % (Math.PI * 2);
    const dotX = cx + r * Math.sin(f1 * dp + phi);
    const dotY = cy + r * Math.sin(f2 * dp);
    ctx.beginPath();
    ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
    ctx.fillStyle   = rgba(col, 0.9);
    ctx.fill();
  }

  /* ── Фильтры — свип LP фильтра ── */
  function animFilters(ctx, W, H, t, col) {
    const period = 7000;
    const phase  = (t % period) / period;
    /* Cutoff position 0→1 по синусоиде */
    const cutoff = 0.15 + (Math.sin(phase * Math.PI * 2 - Math.PI / 2) * 0.5 + 0.5) * 0.72;
    const cutX   = cutoff * W;

    /* Passband fill */
    ctx.fillStyle = rgba(col, 0.1);
    ctx.fillRect(0, 0, cutX, H);

    /* Stopband fill */
    ctx.fillStyle = rgba(col, 0.02);
    ctx.fillRect(cutX, 0, W - cutX, H);

    /* Frequency response curve */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.85);
    ctx.lineWidth   = 2.5;

    for (let x = 0; x <= W; x += 2) {
      const nx  = x / W;
      const rel = (nx - cutoff) * 12; /* steepness */
      const mag = 1 / (1 + Math.exp(rel * 3));
      const y   = H * 0.85 * (1 - mag * 0.9);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Cutoff marker */
    ctx.strokeStyle = rgba(col, 0.5);
    ctx.lineWidth   = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(cutX, 0); ctx.lineTo(cutX, H); ctx.stroke();
    ctx.setLineDash([]);

    /* Resonance bump */
    const bumpH = H * 0.22 + Math.sin(t * 0.0012) * H * 0.05;
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.6);
    ctx.lineWidth   = 2;
    const bx = cutX;
    ctx.beginPath();
    ctx.moveTo(bx - 12, H * 0.08);
    ctx.bezierCurveTo(bx - 4, H * 0.08, bx, H * 0.08 - bumpH, bx, H * 0.08 - bumpH);
    ctx.bezierCurveTo(bx, H * 0.08 - bumpH, bx + 4, H * 0.08, bx + 12, H * 0.08);
    ctx.stroke();

    /* Grid */
    ctx.strokeStyle = rgba(col, 0.05);
    ctx.lineWidth   = 1;
    for (let i = 1; i < 6; i++) {
      const y = (H / 6) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  /* ── Дисторшн — прогрессирующее искажение ── */
  function animDistortion(ctx, W, H, t, col) {
    const driveLevel = 0.4 + Math.sin(t * 0.0006) * 0.35;

    /* Чистая синусоида (снизу) */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.2);
    ctx.lineWidth   = 1;
    for (let x = 0; x <= W; x += 2) {
      const y = H / 2 + Math.sin(x / W * Math.PI * 10 + t * 0.002) * H * 0.35;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Искажённый вывод */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.85);
    ctx.lineWidth   = 2;

    const clip = 1 - driveLevel * 0.5;

    for (let x = 0; x <= W; x += 2) {
      const raw = Math.sin(x / W * Math.PI * 10 + t * 0.002);
      /* Soft clipping */
      const clipped = Math.tanh(raw * (1 + driveLevel * 4)) * clip;
      const y = H / 2 + clipped * H * 0.35;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* Clip ceiling */
    const clipY = H / 2 - clip * H * 0.35;
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = rgba(col, 0.25);
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(0, clipY); ctx.lineTo(W, clipY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, H - clipY); ctx.lineTo(W, H - clipY); ctx.stroke();
    ctx.setLineDash([]);

    /* Harmonic spectrum bars (right side) */
    for (let h = 2; h <= 9; h++) {
      const barH = H * 0.4 * Math.pow(driveLevel, h * 0.5) * (1 / h);
      const bx   = W * 0.65 + (h - 2) * (W * 0.045);
      const grad = ctx.createLinearGradient(bx, H * 0.9 - barH, bx, H * 0.9);
      grad.addColorStop(0, rgba(col, 0.6));
      grad.addColorStop(1, rgba(col, 0.05));
      ctx.fillStyle = grad;
      ctx.fillRect(bx, H * 0.9 - barH, W * 0.032, barH);
    }
  }

  /* ── Модуляция — хорус/LFO волны ── */
  function animModulation(ctx, W, H, t, col) {
    const voiceCount = 5;

    for (let v = 0; v < voiceCount; v++) {
      const detune = (v - voiceCount / 2) * 0.0003;
      const pAlpha = v === Math.floor(voiceCount / 2) ? 0.7 : 0.2;

      ctx.beginPath();
      ctx.strokeStyle = rgba(col, pAlpha);
      ctx.lineWidth   = v === Math.floor(voiceCount / 2) ? 2 : 1;
      if (v === Math.floor(voiceCount / 2)) {
      }

      for (let x = 0; x <= W; x += 2) {
        const nx   = x / W;
        const freq = 3.5 + v * 0.4;
        const y    = H / 2
          + Math.sin(nx * Math.PI * freq * 2 + t * (0.002 + detune) + v * 0.7) * H * 0.3
          + Math.sin(nx * Math.PI * freq + t * 0.001) * H * 0.08;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    /* LFO rate indicator */
    const lfoPos = (Math.sin(t * 0.0015) * 0.5 + 0.5) * W;
    ctx.beginPath();
    ctx.arc(lfoPos, H * 0.12, 5, 0, Math.PI * 2);
    ctx.fillStyle   = rgba(col, 0.7);
    ctx.fill();
  }

  /* ── Утилиты — сетка / осциллограф ── */
  function animUtilities(ctx, W, H, t, col) {
    /* Grid */
    ctx.strokeStyle = rgba(col, 0.06);
    ctx.lineWidth   = 1;
    const gx = W / 8, gy = H / 5;
    for (let i = 0; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(i*gx, 0); ctx.lineTo(i*gx, H); ctx.stroke(); }
    for (let i = 0; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(0, i*gy); ctx.lineTo(W, i*gy); ctx.stroke(); }

    /* RMS level bars */
    const channels = ['L', 'R'];
    channels.forEach((ch, ci) => {
      const offset = ci === 0 ? -20 : 20;
      const level  = 0.6 + Math.sin(t * 0.0013 + ci * 1.3) * 0.28;
      const barH   = H * level * 0.8;
      const bx     = W / 2 + offset - 8;

      const grad = ctx.createLinearGradient(bx, H - barH, bx, H);
      grad.addColorStop(0,   rgba(level > 0.85 ? '#EF4444' : col, 0.8));
      grad.addColorStop(0.6, rgba(col, 0.5));
      grad.addColorStop(1,   rgba(col, 0.1));
      ctx.fillStyle = grad;
      ctx.fillRect(bx, H - barH, 14, barH);
      ctx.strokeStyle = rgba(col, 0.3);
      ctx.lineWidth = 0.5;
      ctx.strokeRect(bx, H - barH, 14, barH);
    });

    /* Waveform */
    ctx.beginPath();
    ctx.strokeStyle = rgba(col, 0.5);
    ctx.lineWidth   = 1.5;
    for (let x = 0; x <= W; x += 2) {
      const y = H / 2 + Math.sin(x / W * Math.PI * 12 + t * 0.002) * H * 0.2
                      + Math.sin(x / W * Math.PI * 5  + t * 0.001) * H * 0.06;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  /* ── Default (для неизвестных категорий) ── */
  function animDefault(ctx, W, H, t, col) {
    const bars = 48;
    const bw   = W / bars;
    for (let i = 0; i < bars; i++) {
      const x = i * bw;
      const h = (Math.sin(t * 0.001 + i * 0.22) * 0.25 + 0.45) * H * 0.7;
      const grad = ctx.createLinearGradient(x, H - h, x, H);
      grad.addColorStop(0, rgba(col, 0.5));
      grad.addColorStop(1, rgba(col, 0.05));
      ctx.fillStyle = grad;
      ctx.fillRect(x + 1, H - h, bw - 2, h);
    }
  }

  /* Карта категорий → функции анимации */
  const CAT_ANIM_FNS = {
    'EQ':                    animEQ,
    'Динамика':              animDynamics,
    'Мастеринг':             animMastering,
    'Реверб':                animReverb,
    'Дилей':                 animDelay,
    'Стерео и пространство': animStereo,
    'Фильтры':               animFilters,
    'Дисторшн и сатурация':  animDistortion,
    'Модуляция':             animModulation,
    'Утилиты':               animUtilities,
    'Новые (New)':           animEQ,
    '_default':              animDefault,
  };

  /* ============================================================
     FEATURE SCREENS — shared wrapper
  ============================================================ */
  function showFeatureScreen(html) {
    welcomeEl.classList.add('hidden');
    if (_wcPause) _wcPause();   /* останавливаем welcome canvas */
    detailEl.classList.add('hidden');
    setHomeActive(false);

    let fs = document.getElementById('feature-screen');
    if (!fs) {
      fs = document.createElement('div');
      fs.id = 'feature-screen';
      document.getElementById('main').appendChild(fs);
    }
    fs.classList.remove('hidden');
    fs.innerHTML = html;
    /* slide-in animation: force reflow then add class */
    void fs.offsetWidth;
    fs.style.animation = 'none';
    void fs.offsetWidth;
    fs.style.animation = '';
    document.getElementById('main').scrollTop = 0;
  }

  function hideFeatureScreen() {
    stopCategoryAnimation();
    sfStopAnimation();
    const fs = document.getElementById('feature-screen');
    if (fs) fs.classList.add('hidden');
    showWelcome();
  }

  /* ── Back button ── */
  window.featureBack = function() { hideFeatureScreen(); };

  const backBtn = () => `
    <button class="screen-back" onclick="featureBack()">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      На главную
    </button>`;

  /* ============================================================
     CHAINS SCREEN
  ============================================================ */
  let _chainsGenreFilter = 'all';

  window.openChainsScreen = function() {
    renderChainsScreen();
  };

  function renderChainsScreen() {
    const genres = ['all', ...new Set(CHAINS.map(c => c.genre))];

    const genrePills = genres.map(g => `
      <span class="genre-pill${_chainsGenreFilter === g ? ' active' : ''}"
            onclick="filterChainGenre('${g}')">
        ${g === 'all' ? 'Все' : g}
      </span>`).join('');

    const filtered = _chainsGenreFilter === 'all'
      ? CHAINS
      : CHAINS.filter(c => c.genre === _chainsGenreFilter);

    const cards = filtered.map(chain => {
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
          <div class="chain-card-name">${chain.name}</div>
          <div class="chain-card-desc">${chain.desc}</div>
          <div class="chain-plugins-preview">${pluginNames}</div>
        </div>`;
    }).join('');

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">⛓️ Цепочки плагинов</h1>
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
    const chain = CHAINS.find(c => c.id === id);
    if (!chain) return;

    const steps = chain.steps.map((step, i) => {
      const p = PLUGINS.find(x => x.id === step.pluginId);
      const name = p ? p.name : step.pluginId;
      const clickAttr = p ? `onclick="selectPluginFromChain('${p.id}')"` : '';
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
          <button class="screen-back" onclick="openChainsScreen()">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Все цепочки
          </button>
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

  window.selectPluginFromChain = function(id) {
    selectPlugin(id);
  };

  /* ============================================================
     COMPAT SCREEN
  ============================================================ */
  let _compatFilter = 'all';

  window.openCompatScreen = function() {
    renderCompatScreen();
  };

  function renderCompatScreen() {
    const ratings = ['all', 'perfect', 'good', 'caution', 'avoid'];
    const labels  = { all:'Все', perfect:'✅ Идеально', good:'👍 Хорошо', caution:'⚠️ Осторожно', avoid:'❌ Избегать' };

    const pills = ratings.map(r => `
      <span class="genre-pill${_compatFilter === r ? ' active' : ''}"
            onclick="filterCompat('${r}')">
        ${labels[r]}
      </span>`).join('');

    const filtered = _compatFilter === 'all'
      ? COMPAT
      : COMPAT.filter(c => c.rating === _compatFilter);

    const cards = filtered.map(c => {
      const pa = PLUGINS.find(p => p.id === c.a);
      const pb = PLUGINS.find(p => p.id === c.b);
      const nameA = pa ? pa.name : c.a;
      const nameB = pb ? pb.name : c.b;
      return `
        <div class="compat-card">
          <div class="compat-rating">
            <div class="compat-dot ${c.rating}"></div>
            <div class="compat-rating-text ${c.rating}">${c.rating}</div>
          </div>
          <div>
            <div class="compat-plugins">
              <span class="compat-plugin-name" onclick="selectPlugin('${c.a}')">${nameA}</span>
              <span class="compat-arrow">+</span>
              <span class="compat-plugin-name" onclick="selectPlugin('${c.b}')">${nameB}</span>
            </div>
            <div class="compat-label">${c.label}</div>
            <div class="compat-note">${c.note}</div>
          </div>
        </div>`;
    }).join('');

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">🔗 Матрица совместимости</h1>
        </div>
        <div class="compat-filter">${pills}</div>
        <div class="compat-grid">${cards}</div>
      </div>
    `);
  }

  window.filterCompat = function(r) {
    _compatFilter = r;
    renderCompatScreen();
  };

  /* ============================================================
     QUIZ SCREEN
  ============================================================ */
  window.openQuizScreen = function() {
    renderQuiz(QUIZ.start, 0);
  };

  function renderQuiz(questionId, depth) {
    const q = QUIZ.questions[questionId];
    if (!q) return;

    const progress = Math.min(depth / 3, 1);

    const answers = q.answers.map(a => `
      <button class="quiz-answer-btn"
              onclick="quizAnswer('${a.next}', ${depth + 1})">
        ${a.label}
      </button>`).join('');

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${depth === 0
            ? backBtn()
            : `<button class="screen-back" onclick="openQuizScreen()">↺ Начать заново</button>`}
          <h1 class="screen-title">🎯 Что мне нужно?</h1>
        </div>
        <div class="quiz-wrap">
          <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width:${progress * 100}%"></div>
          </div>
          <div class="quiz-question">
            <span class="quiz-q-icon">${q.icon}</span>
            <div class="quiz-q-text">${q.text}</div>
          </div>
          <div class="quiz-answers">${answers}</div>
        </div>
      </div>
    `);
  }

  window.quizAnswer = function(next, depth) {
    /* Проверяем — это следующий вопрос или результат? */
    if (QUIZ.questions[next]) {
      renderQuiz(next, depth);
    } else if (QUIZ.results[next]) {
      renderQuizResult(QUIZ.results[next]);
    }
  };

  function renderQuizResult(result) {
    const pluginCards = (result.plugins || []).map(id => {
      const p = PLUGINS.find(x => x.id === id);
      if (!p) return '';
      return `
        <div class="quiz-result-plugin" onclick="selectPlugin('${p.id}')">
          <div class="quiz-result-plugin-dot" style="background:${p.color}"></div>
          <span class="quiz-result-plugin-name">${p.name}</span>
          <span class="quiz-result-plugin-arr">→ открыть</span>
        </div>`;
    }).join('');

    const tips = result.tips && result.tips.length
      ? `<div class="quiz-result-tips">
          <h3>💡 Ключевые настройки</h3>
          <ul>${result.tips.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>`
      : '';

    const chainBtn = result.chain
      ? `<button class="quiz-result-chain-btn" onclick="openChainDetail('${result.chain}')">
          ⛓️ Открыть готовую цепочку →
        </button>`
      : '';

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          <button class="screen-back" onclick="openQuizScreen()">↺ Пройти заново</button>
          <h1 class="screen-title">🎯 Результат</h1>
        </div>
        <div class="quiz-wrap">
          <div class="quiz-result">
            <div class="quiz-result-header">
              <span class="quiz-result-emoji">${result.emoji}</span>
              <div class="quiz-result-title">${result.title}</div>
            </div>
            <div class="quiz-result-plugins">${pluginCards}</div>
            ${tips}
            ${chainBtn}
            <button class="quiz-restart-btn" onclick="featureBack()">← На главную</button>
          </div>
        </div>
      </div>
    `);
  }

  /* ============================================================
     SELECT PLUGIN
  ============================================================ */
  window.selectPlugin = function (id) {
    const plugin = PLUGINS.find(p => p.id === id);
    if (!plugin) return;

    currentPlugin = plugin;
    currentTab    = 'overview';

    buildSidebar(searchQuery); /* обновить активную подсветку */
    renderDetail(plugin);
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

    /* Meta */
    document.getElementById('plugin-developer').textContent = p.developer.toUpperCase();
    document.getElementById('plugin-name').textContent      = p.name;
    document.getElementById('plugin-tagline').textContent   = p.shortDesc;

    /* Badges + Compare button */
    document.getElementById('plugin-badge-row').innerHTML =
      (p.tags || []).slice(0, 5).map(t =>
        `<span class="hero-badge">${t}</span>`
      ).join('') +
      `<button class="hero-compare-btn" onclick="openCompareScreen('${p.id}')">
         <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
           <rect x="1" y="4" width="6" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
           <rect x="9" y="4" width="6" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
           <path d="M7 8h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
         </svg>
         Сравнить
       </button>`;

    /* Tabs content */
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
          <div class="info-block-label">Описание</div>
          <p>${p.description}</p>
        </div>

        <div class="info-block pros-block">
          <div class="info-block-label">✓ Плюсы</div>
          <ul>${(p.pros || []).map(x => `<li>${x}</li>`).join('')}</ul>
        </div>

        <div class="info-block cons-block">
          <div class="info-block-label">✕ Минусы</div>
          <ul>${(p.cons || []).map(x => `<li>${x}</li>`).join('')}</ul>
        </div>

        <div class="info-block use-block">
          <div class="info-block-label">Когда использовать</div>
          <p>${p.when || '—'}</p>
        </div>
      </div>

      <div class="tags-row">
        ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
  }

  /* ── Guide tab (accordion) ── */
  function renderGuide(p) {
    const el = document.getElementById('tab-guide');

    if (!p.guide || !p.guide.length) {
      el.innerHTML = '<p style="color:var(--text-3);padding:20px 0">Гайд в разработке...</p>';
      return;
    }

    el.innerHTML = `<div class="guide-accordion">` +
      p.guide.map((section, i) => {
        let body = '';
        if (section.params) {
          body = `
            <table class="param-table">
              <thead><tr><th>Параметр</th><th>Описание</th></tr></thead>
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
          Пока нет советов с форумов для этого плагина
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

  /* ── Tips tab ── */
  function renderTips(p) {
    const el = document.getElementById('tab-tips');

    if (!p.tips || !p.tips.length) {
      el.innerHTML = '<p style="color:var(--text-3);padding:20px 0">Типсы в разработке...</p>';
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
          Найдено: ${results.length} плагинов
        </div>
        ${results.map(p => {
          const cat = CATEGORIES[p.category] || { color: '#888' };
          return `
            <div class="search-result-item" onclick="selectPlugin('${p.id}')">
              <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></div>
              <div>
                <div class="search-result-name">${highlight(p.name, q)}</div>
                <div class="search-result-cat">${p.category} · ${p.developer}</div>
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

  /* ============================================================
     HELPERS
  ============================================================ */
  function makeIcon(p) {
    /* Если есть лого разработчика — показываем в плашке */
    if (p.developerLogo) {
      return `
        <div class="plugin-icon-logo" style="background:linear-gradient(135deg,${p.color},${darken(p.color,40)})">
          <img src="${p.developerLogo}"
               alt="${p.developer}"
               onerror="this.parentElement.outerHTML=makeInitialsIcon('${p.id}','${p.color}','${p.name}')"
               style="width:100%;height:100%;object-fit:contain;padding:12px">
        </div>`;
    }
    return makeInitialsIcon(p.id, p.color, p.name);
  }

  window.makeInitialsIcon = function(id, color, name) {
    const initials = name.split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();
    return `
      <svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" class="plugin-icon-svg">
        <defs>
          <linearGradient id="ig_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="${color}"/>
            <stop offset="100%" stop-color="${darken(color,40)}"/>
          </linearGradient>
        </defs>
        <rect width="72" height="72" rx="18" fill="url(#ig_${id})"/>
        <text x="36" y="44" text-anchor="middle"
              font-family="-apple-system,BlinkMacSystemFont,sans-serif"
              font-size="${initials.length > 2 ? 18 : 22}"
              font-weight="700" fill="rgba(255,255,255,0.95)">${initials}</text>
      </svg>`;
  };

  function darken(hex, amount) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0xff) - amount);
    const b = Math.max(0, (num & 0xff) - amount);
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  function badgeLabel(b) {
    const map = {
      'b-eq': 'EQ', 'b-comp': 'Comp', 'b-limit': 'Limit',
      'b-fx': 'FX', 'b-reverb': 'Reverb', 'b-delay': 'Delay',
      'b-spatial': 'Stereo', 'b-master': 'Master',
      'b-util': 'Util', 'b-dist': 'Dist', 'b-filter': 'Filter'
    };
    return map[b] || b;
  }

  /* ── Экспортируем для sidebar ── */
  window.badgeLabel = badgeLabel;

  /* ============================================================
     THEME SYSTEM
  ============================================================ */
  const THEMES = [
    { id: 'dark',      label: 'Тёмная',   dot: '#222' },
    { id: 'fl-orange', label: 'FL Orange', dot: '#FF6B00' },
    { id: 'light',     label: 'Светлая',  dot: '#e0e0e0' },
  ];

  function initTheme() {
    const saved = localStorage.getItem('fl-theme') || 'dark';
    applyTheme(saved);
    renderThemeSwitcher();
  }

  function applyTheme(id) {
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem('fl-theme', id);
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === id);
    });
  }

  function renderThemeSwitcher() {
    const wrap = document.createElement('div');
    wrap.className = 'theme-switcher';
    const current = localStorage.getItem('fl-theme') || 'dark';
    wrap.innerHTML = THEMES.map(t => `
      <button class="theme-btn${t.id === current ? ' active' : ''}"
              data-theme="${t.id}"
              onclick="setTheme('${t.id}')"
              title="${t.label}">
        <span class="theme-btn-dot" style="background:${t.dot};border:1px solid var(--border-2)"></span>
        ${t.label}
      </button>`).join('');
    document.getElementById('sidebar').insertBefore(
      wrap,
      document.querySelector('.sidebar-home-wrap')
    );
  }

  window.setTheme = function(id) { applyTheme(id); };

  /* ============================================================
     KEYBOARD NAVIGATION
  ============================================================ */
  function bindKeyboard() {
    document.addEventListener('keydown', handleKey);
  }

  function handleKey(e) {
    const tag = document.activeElement.tagName;
    const inInput = tag === 'INPUT' || tag === 'TEXTAREA';

    /* / → фокус на поиск */
    if (e.key === '/' && !inInput) {
      e.preventDefault();
      sidebarSearch.focus();
      sidebarSearch.select();
      return;
    }

    /* Escape */
    if (e.key === 'Escape') {
      if (document.getElementById('plugin-picker-modal')) {
        closePluginPicker(); return;
      }
      if (inInput) { document.activeElement.blur(); return; }
      goHome(); return;
    }

    /* ← → — переключение табов */
    if (!inInput && currentPlugin) {
      const tabs = ['overview', 'guide', 'tips', 'forum'];
      const idx  = tabs.indexOf(currentTab);
      if (e.key === 'ArrowRight' && idx < tabs.length - 1) {
        e.preventDefault(); switchTab(tabs[idx + 1]); return;
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault(); switchTab(tabs[idx - 1]); return;
      }
    }

    /* ↑ ↓ — навигация по плагинам в сайдбаре */
    if (!inInput && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      const items = [...document.querySelectorAll('.tree-plugin')];
      if (!items.length) return;

      items.forEach(el => el.classList.remove('kb-focus'));

      if (e.key === 'ArrowDown') kbFocusIndex = Math.min(kbFocusIndex + 1, items.length - 1);
      else                        kbFocusIndex = Math.max(kbFocusIndex - 1, 0);

      const focused = items[kbFocusIndex];
      if (focused) {
        focused.classList.add('kb-focus');
        focused.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      return;
    }

    /* Enter — открыть сфокусированный плагин */
    if (!inInput && e.key === 'Enter') {
      const focused = document.querySelector('.tree-plugin.kb-focus');
      if (focused) {
        focused.click();
        document.querySelectorAll('.tree-plugin').forEach(el => el.classList.remove('kb-focus'));
        kbFocusIndex = -1;
      }
    }
  }

  /* ============================================================
     COMPARE SCREEN
  ============================================================ */
  window.openCompareScreen = function(presetId) {
    comparePluginA = presetId ? PLUGINS.find(p => p.id === presetId) : null;
    comparePluginB = null;
    renderCompareScreen();
  };

  function renderCompareScreen() {
    const pickA = comparePluginA
      ? `<div class="compare-plugin-picker filled" onclick="openPluginPicker('a')">
           <div class="compare-picker-dot" style="background:${comparePluginA.color}"></div>
           <div>
             <div class="compare-picker-name">${comparePluginA.name}</div>
             <div class="compare-picker-dev">${comparePluginA.developer}</div>
           </div>
         </div>`
      : `<div class="compare-plugin-picker" onclick="openPluginPicker('a')">
           <span class="compare-picker-hint">+ Выбрать плагин</span>
         </div>`;

    const pickB = comparePluginB
      ? `<div class="compare-plugin-picker filled" onclick="openPluginPicker('b')">
           <div class="compare-picker-dot" style="background:${comparePluginB.color}"></div>
           <div>
             <div class="compare-picker-name">${comparePluginB.name}</div>
             <div class="compare-picker-dev">${comparePluginB.developer}</div>
           </div>
         </div>`
      : `<div class="compare-plugin-picker" onclick="openPluginPicker('b')">
           <span class="compare-picker-hint">+ Выбрать плагин</span>
         </div>`;

    const splitView = (comparePluginA && comparePluginB)
      ? renderCompareSplit(comparePluginA, comparePluginB)
      : `<div style="text-align:center;padding:40px 0;color:var(--text-3);font-size:13px">
           Выбери два плагина для сравнения
         </div>`;

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">⚖️ Сравнение плагинов</h1>
        </div>
        <div class="compare-select-wrap">
          ${pickA}
          <div class="compare-vs">VS</div>
          ${pickB}
        </div>
        ${splitView}
      </div>
    `);
  }

  function renderCompareSplit(a, b) {
    const col = (p) => {
      const tags = (p.tags || []).map(t => `<span class="compare-tag">${t}</span>`).join('');
      const pros = (p.pros || []).map(x => `<li>${x}</li>`).join('');
      const cons = (p.cons || []).map(x => `<li>${x}</li>`).join('');
      return `
        <div>
          <div class="compare-col-header" style="background:${p.color}18;border-color:${p.color}44">
            <div class="compare-picker-dot" style="background:${p.color}"></div>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text)">${p.name}</div>
              <div style="font-size:11px;color:var(--text-3)">${p.developer} · ${p.category}</div>
            </div>
            <button onclick="selectPlugin('${p.id}')" style="margin-left:auto;background:none;border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:10px;color:var(--text-3);cursor:pointer;font-family:inherit" title="Открыть">→ Открыть</button>
          </div>
          <div class="compare-col-body">
            <div class="compare-section">
              <div class="compare-section-title">Описание</div>
              <div class="compare-desc">${p.shortDesc}</div>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">✓ Плюсы</div>
              <ul class="compare-list pros">${pros}</ul>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">✕ Минусы</div>
              <ul class="compare-list cons">${cons}</ul>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">Когда использовать</div>
              <div class="compare-desc">${p.when || '—'}</div>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">Теги</div>
              <div class="compare-tags">${tags}</div>
            </div>
          </div>
        </div>`;
    };

    return `<div class="compare-split">${col(a)}${col(b)}</div>`;
  }

  /* Plugin picker modal */
  window.openPluginPicker = function(slot) {
    _pickerCallback = slot;
    renderPluginPicker('');
  };

  function renderPluginPicker(q) {
    const existing = document.getElementById('plugin-picker-modal');
    if (existing) existing.remove();

    const results = q
      ? PLUGINS.filter(p =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.developer.toLowerCase().includes(q.toLowerCase()))
      : PLUGINS;

    const items = results.slice(0, 60).map(p => `
      <div class="plugin-picker-item" onclick="pickPlugin('${p.id}')">
        <div class="plugin-picker-item-dot" style="background:${p.color}"></div>
        <span class="plugin-picker-item-name">${p.name}</span>
        <span class="plugin-picker-item-dev">${p.developer}</span>
      </div>`).join('');

    const modal = document.createElement('div');
    modal.id = 'plugin-picker-modal';
    modal.className = 'plugin-picker-modal';
    modal.onclick = e => { if (e.target === modal) closePluginPicker(); };
    modal.innerHTML = `
      <div class="plugin-picker-box">
        <div class="plugin-picker-search">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="var(--text-3)" stroke-width="1.5"/>
            <path d="M11 11l3 3" stroke="var(--text-3)" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input id="picker-search-input" type="text" placeholder="Найти плагин..."
                 value="${q}" oninput="pickerSearch(this.value)" autocomplete="off">
        </div>
        <div class="plugin-picker-list">${items}</div>
      </div>`;

    document.body.appendChild(modal);
    setTimeout(() => {
      const inp = document.getElementById('picker-search-input');
      if (inp) inp.focus();
    }, 50);
  }

  window.pickerSearch = function(q) { renderPluginPicker(q); };

  window.pickPlugin = function(id) {
    const p = PLUGINS.find(x => x.id === id);
    if (!p) return;
    if (_pickerCallback === 'a') comparePluginA = p;
    else                          comparePluginB = p;
    closePluginPicker();
    renderCompareScreen();
  };

  function closePluginPicker() {
    const m = document.getElementById('plugin-picker-modal');
    if (m) m.remove();
  }
  window.closePluginPicker = closePluginPicker;

  /* ============================================================
     ANIMATED PARAM PREVIEWS
  ============================================================ */

  /* SVG helpers — 80×44px каждый */
  const W = 80, H = 44, MID = H / 2;

  function svgWrap(content, label) {
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="var(--bg-3)" rx="4"/>
      ${content}
      ${label ? `<text x="${W/2}" y="${H-3}" text-anchor="middle" font-size="7.5" fill="var(--text-3)">${label}</text>` : ''}
    </svg>`;
  }

  /* ── EQ & Frequency ── */
  function svgFreq() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${MID} L${W*0.28},${MID} Q${W*0.5},${MID-22} ${W*0.62},${MID} L${W},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:eq-peak 1.4s ease-in-out infinite"/>
  `, 'Hz ↔'); }

  function svgGain() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <rect x="${W*0.38}" y="${MID-18}" width="10" height="18" rx="2"
          fill="var(--accent)" opacity="0.7"
          style="transform-origin:${W*0.43}px ${MID}px;animation:wave-compress 1.2s ease-in-out infinite"/>
    <rect x="${W*0.38}" y="${MID}" width="10" height="8" rx="2" fill="var(--accent)" opacity="0.3"/>
  `, 'dB ↕'); }

  function svgQ() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M8,${MID} Q${W*0.3},${MID-20} ${W*0.5},${MID} Q${W*0.7},${MID-20} ${W-8},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:eq-peak 1.6s ease-in-out infinite alternate"/>
  `, 'ширина'); }

  function svgHP() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${H-6} L${W*0.35},${H-6} Q${W*0.48},${H-6} ${W*0.55},${MID} L${W},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <text x="12" y="${MID-4}" font-size="7" fill="var(--accent)" opacity="0.6">cut</text>
  `, 'high pass'); }

  function svgLP() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${MID} L${W*0.45},${MID} Q${W*0.55},${MID} ${W*0.62},${H-6} L${W},${H-6}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <text x="${W-14}" y="${MID-4}" font-size="7" fill="var(--accent)" opacity="0.6">cut</text>
  `, 'low pass'); }

  function svgShelf() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M0,${MID+8} L${W*0.35},${MID+8} Q${W*0.5},${MID+8} ${W*0.58},${MID-8} L${W},${MID-8}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:thresh-line 1.8s ease-in-out infinite"/>
  `, 'shelf'); }

  function svgFilterType() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M4,${MID} L${W*0.22},${MID} Q${W*0.34},${MID-16} ${W*0.4},${MID} L${W*0.55},${MID}"
          stroke="var(--accent)" stroke-width="1.2" fill="none" opacity="0.5"/>
    <path d="M${W*0.48},${MID} L${W*0.55},${MID} Q${W*0.62},${MID} ${W*0.68},${H-6} L${W},${H-6}"
          stroke="#5B9BD5" stroke-width="1.2" fill="none" opacity="0.7"/>
  `, 'тип фильтра'); }

  /* ── Dynamics ── */
  function svgRatio() { return svgWrap(`
    <line x1="10" y1="${H-8}" x2="${W-10}" y2="8" stroke="var(--border-2)" stroke-width="1"/>
    <path d="M10,${H-8} L${W*0.45},${H-8} L${W-10},${H*0.38}"
          stroke="var(--accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:ratio-slope 1.5s ease-in-out infinite alternate"/>
  `, 'ratio'); }

  function svgThreshold() { return svgWrap(`
    <rect x="8" y="${H*0.28}" width="${W-16}" height="${H*0.52}" rx="2" fill="var(--accent)" opacity="0.1"/>
    <line x1="8" y1="${H*0.28}" x2="${W-8}" y2="${H*0.28}"
          stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3,2"
          style="animation:thresh-line 1.4s ease-in-out infinite"/>
    <path d="M8,${H-8} L${W*0.35},${H-8} L${W*0.42},${H*0.28} L${W-8},${H*0.28}"
          stroke="var(--border-2)" stroke-width="1" fill="none"/>
  `, 'порог'); }

  function svgAttack() { return svgWrap(`
    <path d="M8,${H-8} L${W*0.45},8 L${W-8},${H*0.5}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${W*0.45}" cy="8" r="2.5" fill="var(--accent)"
            style="animation:wave-compress 1.2s ease-in-out infinite"/>
  `, 'attack'); }

  function svgRelease() { return svgWrap(`
    <path d="M8,8 L${W*0.28},8 Q${W*0.72},8 ${W-8},${H-8}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <circle cx="${W-8}" cy="${H-8}" r="2" fill="var(--accent)" opacity="0.6"
            style="animation:wave-compress 1.5s ease-in-out infinite"/>
  `, 'release'); }

  function svgKnee() { return svgWrap(`
    <line x1="10" y1="${H-8}" x2="${W-10}" y2="8" stroke="var(--border-2)" stroke-width="1"/>
    <path d="M10,${H-8} L${W*0.4},${H-8} Q${W*0.5},${H-8} ${W*0.55},${H*0.5} L${W-10},${H*0.5}"
          stroke="var(--accent)" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  `, 'soft knee'); }

  function svgLookahead() { return svgWrap(`
    <path d="M8,${MID} L${W*0.45},${MID} L${W*0.45},${H*0.2} L${W-8},${H*0.2}"
          stroke="var(--border-2)" stroke-width="1" fill="none"/>
    <rect x="${W*0.3}" y="${H*0.18}" width="4" height="${H*0.64}" rx="2"
          fill="var(--accent)" opacity="0.8"
          style="animation:lfo-wave 1.4s linear infinite"/>
    <text x="${W*0.55}" y="${H*0.18}" font-size="7" fill="var(--accent)" opacity="0.7">▶</text>
  `, 'lookahead'); }

  function svgExpander() { return svgWrap(`
    <line x1="10" y1="${H-8}" x2="${W-10}" y2="8" stroke="var(--border-2)" stroke-width="1"/>
    <path d="M10,${H-8} L${W*0.4},${H*0.6} L${W-10},8"
          stroke="var(--accent)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:ratio-slope 1.7s ease-in-out infinite alternate"/>
  `, 'upward expand'); }

  function svgPumping() { return svgWrap(`
    <path d="M4,${MID} L${W*0.18},${H*0.15} L${W*0.18},${H-8} L${W*0.38},${H*0.15} L${W*0.38},${H-8} L${W*0.58},${H*0.15} L${W*0.58},${H-8} L${W},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:wave-compress 0.8s ease-in-out infinite"/>
  `, 'pumping'); }

  /* ── Space / Time ── */
  function svgDecay() { return svgWrap(`
    <path d="M8,8 Q${W*0.28},8 ${W-8},${H-8}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:decay-env 1.6s ease-in-out infinite"/>
    <path d="M8,8 L${W-8},8" stroke="var(--border-2)" stroke-width="0.5" stroke-dasharray="2,3"/>
  `, 'decay'); }

  function svgPreDelay() { return svgWrap(`
    <rect x="8" y="${MID-4}" width="${W*0.3}" height="8" rx="2" fill="var(--border-2)"/>
    <text x="${W*0.19}" y="${MID+3}" text-anchor="middle" font-size="7" fill="var(--text-3)">gap</text>
    <path d="M${W*0.42},8 Q${W*0.55},8 ${W-8},${H-8}" stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <circle cx="${W*0.42}" cy="${MID}" r="2.5" fill="var(--accent)"/>
  `, 'pre-delay'); }

  function svgCharacter() { return svgWrap(`
    <path d="M8,${H-8} L${W*0.2},${H*0.5} L${W*0.35},${H*0.25} L${W*0.5},${H*0.4} L${W*0.65},${H*0.2} L${W*0.75},${H*0.35} L${W-8},${H*0.5}"
          stroke="var(--accent)" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M8,${H-8} Q${W*0.3},${H*0.6} ${W*0.55},${H*0.35} Q${W*0.75},${H*0.1} ${W-8},${H*0.4}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:decay-env 2s ease-in-out infinite"/>
  `, 'diffusion'); }

  function svgDistance() { return svgWrap(`
    <circle cx="${W*0.25}" cy="${MID}" r="4" fill="var(--accent)" opacity="0.9"/>
    <circle cx="${W*0.6}" cy="${MID}" r="4" fill="var(--border-2)" opacity="0.5"
            style="animation:width-pulse 1.5s ease-in-out infinite"/>
    <path d="M${W*0.3},${MID} L${W*0.55},${MID}" stroke="var(--border-2)" stroke-width="1"
          stroke-dasharray="2,2"/>
    <text x="${W*0.25}" y="${H-4}" text-anchor="middle" font-size="7" fill="var(--accent)">src</text>
    <text x="${W*0.6}" y="${H-4}" text-anchor="middle" font-size="7" fill="var(--text-3)">far</text>
  `, 'distance'); }

  /* ── Mix / Volume / Level ── */
  function svgMix() { return svgWrap(`
    <rect x="8" y="${H*0.3}" width="${W-16}" height="7" rx="3" fill="var(--border-2)"/>
    <rect x="8" y="${H*0.3}" width="${(W-16)*0.65}" height="7" rx="3" fill="var(--accent)"
          style="animation:width-pulse 1.3s ease-in-out infinite"/>
    <text x="8" y="${H*0.3}-3" font-size="7" fill="var(--text-3)">dry</text>
    <text x="${W-8}" y="${H*0.3}-3" text-anchor="end" font-size="7" fill="var(--accent)">wet</text>
  `, 'dry/wet'); }

  function svgVolume() { return svgWrap(`
    <line x1="0" y1="${MID}" x2="${W}" y2="${MID}" stroke="var(--border-2)" stroke-width="0.5"/>
    <path d="M8,${H-6} L${W*0.45},${H-6} L${W*0.45},${MID-10} L${W-8},${MID-10}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${W*0.43}" y="${MID-12}" width="4" height="${H*0.5}" rx="1"
          fill="var(--accent)" opacity="0.3"/>
  `, 'volume'); }

  /* ── Drive / Saturation styles ── */
  function svgDrive() { return svgWrap(`
    <path d="M6,${MID} C${W*0.2},${MID} ${W*0.3},${H*0.1} ${W*0.38},${H*0.1} C${W*0.46},${H*0.1} ${W*0.46},${H*0.9} ${W*0.54},${H*0.9} C${W*0.62},${H*0.9} ${W*0.7},${MID} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"
          style="animation:wave-compress 1s ease-in-out infinite"/>
  `, 'drive'); }

  function svgTape() { return svgWrap(`
    <path d="M6,${MID} C${W*0.2},${MID} ${W*0.28},${H*0.15} ${W*0.38},${H*0.15} C${W*0.5},${H*0.15} ${W*0.5},${H*0.85} ${W*0.62},${H*0.85} C${W*0.72},${H*0.85} ${W*0.8},${MID} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none" opacity="0.7"/>
    <path d="M6,${MID} Q${W*0.3},${MID-10} ${W*0.5},${MID} Q${W*0.7},${MID+10} ${W-6},${MID}"
          stroke="#c45d0f" stroke-width="0.8" fill="none" opacity="0.4"/>
  `, 'tape warm'); }

  function svgTube() { return svgWrap(`
    <ellipse cx="${W/2}" cy="${MID}" rx="16" ry="12" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
    <path d="M${W*0.3},${H-6} Q${W*0.4},${H*0.15} ${W*0.5},${H-6} Q${W*0.6},${H*0.15} ${W*0.7},${H-6}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"
          style="animation:wave-compress 1.4s ease-in-out infinite"/>
  `, 'tube'); }

  function svgBitCrush() { return svgWrap(`
    <path d="M6,${MID} L${W*0.15},${MID} L${W*0.15},${H*0.2} L${W*0.28},${H*0.2} L${W*0.28},${H*0.75} L${W*0.42},${H*0.75} L${W*0.42},${H*0.2} L${W*0.56},${H*0.2} L${W*0.56},${H*0.6} L${W*0.7},${H*0.6} L${W*0.7},${MID} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="square"/>
  `, 'bit crush'); }

  function svgFuzz() { return svgWrap(`
    <path d="M6,${MID} L${W*0.15},${H*0.1} L${W*0.22},${H*0.9} L${W*0.3},${H*0.1} L${W*0.38},${H*0.9} L${W*0.46},${H*0.1} L${W*0.54},${H*0.9} L${W*0.62},${H*0.1} L${W*0.7},${H*0.9} L${W*0.78},${H*0.1} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1" fill="none" opacity="0.9"/>
  `, 'fuzz'); }

  /* ── Algorithm Modes ── */
  function svgModeClean() { return svgWrap(`
    <path d="M6,${MID} Q${W*0.25},${H*0.25} ${W/2},${MID} Q${W*0.75},${H*0.75} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <path d="M6,${MID} Q${W*0.25},${H*0.3} ${W/2},${MID} Q${W*0.75},${H*0.7} ${W-6},${MID}"
          stroke="var(--accent)" stroke-width="0.5" fill="none" opacity="0.3"/>
  `, 'clean'); }

  function svgModeClassic() { return svgWrap(`
    <path d="M6,${MID} L${W*0.2},${H*0.12} L${W*0.38},${H*0.12} L${W*0.38},${H*0.88} L${W*0.56},${H*0.88} L${W*0.56},${H*0.12} L${W*0.74},${H*0.12} L${W*0.74},${MID} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"/>
  `, 'VCA'); }

  function svgModeOpto() { return svgWrap(`
    <path d="M6,${MID} Q${W*0.15},${H*0.2} ${W*0.35},${H*0.2} Q${W*0.65},${H*0.2} ${W*0.75},${H*0.7} Q${W*0.85},${H*0.9} ${W-6},${H*0.9}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"
          style="animation:decay-env 2s ease-in-out infinite"/>
  `, 'opto'); }

  function svgModePunch() { return svgWrap(`
    <path d="M6,${MID} L${W*0.25},${H*0.1} L${W*0.32},${H-6} L${W*0.5},${MID} L${W-6},${MID}"
          stroke="var(--accent)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"
          style="animation:wave-compress 0.9s ease-in-out infinite"/>
  `, 'punch'); }

  function svgModeGeneric() { return svgWrap(`
    <circle cx="${W*0.28}" cy="${MID}" r="5" fill="var(--border-2)" stroke="var(--border-2)" stroke-width="1"/>
    <circle cx="${W*0.5}" cy="${MID}" r="5" fill="var(--accent)" stroke="var(--accent)" stroke-width="1" opacity="0.8"
            style="animation:wave-compress 1.3s ease-in-out infinite"/>
    <circle cx="${W*0.72}" cy="${MID}" r="5" fill="var(--border-2)" stroke="var(--border-2)" stroke-width="1"/>
  `, 'mode'); }

  /* ── Delay / Modulation ── */
  function svgFeedback() { return svgWrap(`
    <path d="M8,${H*0.35} Q${W*0.35},${H*0.1} ${W*0.6},${H*0.35} Q${W*0.85},${H*0.6} ${W*0.6},${H*0.75} Q${W*0.35},${H*0.9} ${W*0.15},${H*0.75}"
          stroke="var(--accent)" stroke-width="1.3" fill="none"
          style="animation:lfo-wave 2s linear infinite"/>
    <polygon points="${W*0.13},${H*0.68} ${W*0.1},${H*0.8} ${W*0.22},${H*0.76}"
             fill="var(--accent)" opacity="0.7"/>
  `, 'feedback'); }

  function svgPitch() { return svgWrap(`
    <path d="M8,${H-6} Q${W*0.35},${H-6} ${W*0.5},${MID} Q${W*0.65},6 ${W-8},6"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <circle cx="${W*0.5}" cy="${MID}" r="3" fill="var(--accent)"
            style="animation:thresh-line 1.2s ease-in-out infinite"/>
    <text x="12" y="${H-4}" font-size="7" fill="var(--text-3)">♭</text>
    <text x="${W-12}" y="12" text-anchor="end" font-size="7" fill="var(--text-3)">♯</text>
  `, 'pitch'); }

  function svgFreeze() { return svgWrap(`
    <path d="M8,${MID} L${W-8},${MID}" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3,3"/>
    <rect x="${W*0.35}" y="${H*0.2}" width="${W*0.3}" height="${H*0.6}" rx="2"
          fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="1"/>
    <text x="${W/2}" y="${MID+3}" text-anchor="middle" font-size="8" fill="var(--accent)" opacity="0.7">⏸</text>
  `, 'freeze'); }

  function svgLFO() { return svgWrap(`
    <clipPath id="lfo-clip"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>
    <g clip-path="url(#lfo-clip)" style="animation:lfo-wave 1.2s linear infinite">
      <path d="M-20,${MID} Q-10,8 0,${MID} Q10,${H-8} 20,${MID} Q30,8 40,${MID} Q50,${H-8} 60,${MID} Q70,8 80,${MID} Q90,${H-8} 100,${MID}"
            stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    </g>
  `, 'LFO'); }

  /* ── Stereo ── */
  function svgWidth() { return svgWrap(`
    <ellipse cx="${W/2}" cy="${MID}" rx="11" ry="${MID-9}" stroke="var(--border-2)" stroke-width="1" fill="none"/>
    <ellipse cx="${W/2}" cy="${MID}" rx="27" ry="${MID-9}" stroke="var(--accent)" stroke-width="1.5" fill="none"
             style="animation:width-pulse 1.4s ease-in-out infinite"/>
  `, 'stereo'); }

  function svgMS() { return svgWrap(`
    <line x1="${W/2}" y1="6" x2="${W/2}" y2="${H-6}" stroke="var(--accent)" stroke-width="1" opacity="0.5"/>
    <text x="${W*0.25}" y="${MID+3}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">M</text>
    <text x="${W*0.75}" y="${MID+3}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--border-2)">S</text>
    <rect x="${W*0.08}" y="${MID-2}" width="${W*0.37}" height="4" rx="2"
          fill="var(--accent)" opacity="0.6"
          style="animation:width-pulse 1.5s ease-in-out infinite"/>
  `, 'mid/side'); }

  /* ── Misc ── */
  function svgSlices() { return svgWrap(`
    ${[1,2,3,4,5,6,7,8].map((n,i) => {
      const x = 8 + i * ((W-16)/8);
      const h = (i % 3 === 0) ? H-14 : (i % 3 === 1) ? H*0.5 : H*0.3;
      return `<rect x="${x}" y="${H-6-h}" width="${((W-16)/8)-2}" height="${h}" rx="1"
              fill="var(--accent)" opacity="${0.3 + (i%3)*0.25}"/>`;
    }).join('')}
  `, 'slices'); }

  function svgHold() { return svgWrap(`
    <path d="M6,${H*0.35} L${W*0.35},${H*0.35} L${W*0.35},${H*0.65} L${W-6},${H*0.65}"
          stroke="var(--border-2)" stroke-width="1" fill="none"/>
    <rect x="${W*0.3}" y="${H*0.2}" width="10" height="${H*0.6}" rx="1"
          fill="var(--accent)" opacity="0.7"
          style="animation:wave-compress 1s steps(1) infinite"/>
  `, 'hold'); }

  function svgAmount() { return svgWrap(`
    <circle cx="${W/2}" cy="${MID}" r="${MID-6}" fill="none" stroke="var(--border-2)" stroke-width="2"/>
    <path d="M${W/2},${MID} L${W/2},${H*0.14}"
          stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"
          style="transform-origin:${W/2}px ${MID}px; animation:ratio-slope 1.5s ease-in-out infinite alternate"/>
  `, 'amount'); }

  function svgDepth() { return svgWrap(`
    <rect x="8" y="${H*0.28}" width="${W-16}" height="${H*0.5}" rx="3" fill="var(--border-2)" opacity="0.3"/>
    <rect x="8" y="${H*0.28}" width="${(W-16)*0.7}" height="${H*0.5}" rx="3"
          fill="var(--accent)" opacity="0.6"
          style="animation:width-pulse 1.3s ease-in-out infinite"/>
  `, 'depth'); }

  function svgTime() { return svgWrap(`
    <path d="M8,${MID} L${W*0.3},${MID} L${W*0.3},${H*0.2} L${W-8},${H*0.2}"
          stroke="var(--border-2)" stroke-width="1" fill="none" stroke-dasharray="2,3"/>
    <path d="M8,${MID} Q${W*0.25},${MID} ${W*0.5},${H*0.2} L${W-8},${H*0.2}"
          stroke="var(--accent)" stroke-width="1.5" fill="none"/>
    <circle cx="${W*0.5}" cy="${H*0.2}" r="2.5" fill="var(--accent)"
            style="animation:thresh-line 1.3s ease-in-out infinite"/>
  `, 'time'); }

  /* Универсальный fallback — всегда что-то показывает */
  function svgGeneric(label) {
    const short = label.length > 10 ? label.slice(0, 10) + '…' : label;
    return svgWrap(`
      <path d="M6,${MID} Q${W*0.25},${MID-10} ${W/2},${MID} Q${W*0.75},${MID+10} ${W-6},${MID}"
            stroke="var(--accent)" stroke-width="1.3" fill="none" opacity="0.6"
            style="animation:lfo-wave 2s linear infinite"/>
      <path d="M6,${MID} Q${W*0.25},${MID+8} ${W/2},${MID} Q${W*0.75},${MID-8} ${W-6},${MID}"
            stroke="var(--accent)" stroke-width="0.7" fill="none" opacity="0.3"/>
    `, short);
  }

  /* ── Карта ключевых слов (порядок важен — сверху вниз) ── */
  const PARAM_ANIM_MAP = [
    /* EQ */
    [['high pass','band 1 (hp)','hp)'],    svgHP],
    [['low pass', 'band 7 (lp)','lp)'],    svgLP],
    [['shelf'],                             svgShelf],
    [['bell','band 2','band 3','band 4','band 5','band 6'], svgFreq],
    [['filter type'],                       svgFilterType],
    [['frequency','freq'],                  svgFreq],
    [['bandwidth','q /'],                   svgQ],
    [['gain'],                              svgGain],
    /* Dynamics */
    [['threshold'],                         svgThreshold],
    [['ratio'],                             svgRatio],
    [['attack'],                            svgAttack],
    [['release'],                           svgRelease],
    [['knee'],                              svgKnee],
    [['lookahead'],                         svgLookahead],
    [['expand','upward'],                   svgExpander],
    [['pumping'],                           svgPumping],
    [['punch'],                             svgModePunch],
    [['opto'],                              svgModeOpto],
    [['classic','vca'],                     svgModeClassic],
    [['clean','transparent','surgical','allround','safe'], svgModeClean],
    [['dynamic'],                           svgModeGeneric],
    [['mastering','vocal','bus','aggressive','custom'],    svgModeGeneric],
    /* Saturation */
    [['bit crush','bit-crush'],             svgBitCrush],
    [['fuzz'],                              svgFuzz],
    [['tube'],                              svgTube],
    [['tape'],                              svgTape],
    [['amp','guitar','wave','half wave','full wave'], svgDrive],
    [['drive'],                             svgDrive],
    /* Space */
    [['pre-delay','predelay'],              svgPreDelay],
    [['character','diffus'],                svgCharacter],
    [['distance'],                          svgDistance],
    [['decay rate','decay','size','space'], svgDecay],
    /* Modulation */
    [['feedback'],                          svgFeedback],
    [['pitch'],                             svgPitch],
    [['freeze'],                            svgFreeze],
    [['lfo','rate','mod'],                  svgLFO],
    /* Mix / Level */
    [['mix'],                               svgMix],
    [['volume','output','input','in /','out','level'], svgVolume],
    [['amount'],                            svgAmount],
    [['depth','low / mid','mid / high','low depth','mid depth','high depth'], svgDepth],
    [['time'],                              svgTime],
    /* Stereo */
    [['m/s','mid/side','mid side'],         svgMS],
    [['stereo','width','spread'],           svgWidth],
    /* Misc */
    [['slices'],                            svgSlices],
    [['hold'],                              svgHold],
    [['limit'],                             svgThreshold],
    [['filter'],                            svgFilterType],
  ];

  function getParamAnim(paramName) {
    const lower = paramName.toLowerCase();
    for (const [keys, fn] of PARAM_ANIM_MAP) {
      if (keys.some(k => lower.includes(k))) return fn();
    }
    /* Всегда возвращаем что-то — generic fallback */
    return svgGeneric(paramName);
  }

  function addParamAnimations() {
    document.querySelectorAll('.param-table tbody tr').forEach(row => {
      const nameCell = row.querySelector('td:first-child');
      if (!nameCell || nameCell.dataset.animated) return;
      nameCell.dataset.animated = '1';

      const paramName = nameCell.textContent;
      const svg = getParamAnim(paramName);
      if (!svg) return;

      nameCell.style.position = 'relative';
      const wrap = document.createElement('span');
      wrap.className = 'param-anim-trigger';
      wrap.style.cursor = 'help';
      wrap.innerHTML = nameCell.innerHTML +
        `<span class="param-anim-popup">${svg}</span>`;
      nameCell.innerHTML = '';
      nameCell.appendChild(wrap);
    });
  }

  /* Также при открытии guide-item */
  window.toggleGuideItem_orig = window.toggleGuideItem;
  window.toggleGuideItem = function(el) {
    el.classList.toggle('open');
    setTimeout(addParamAnimations, 50);
  };

  /* ── Start ── */
  init();

  /* ============================================================
     SIGNAL FLOW VISUALIZER
  ============================================================ */
  let _sfChain = [];          /* [{id, name, color, category, developer}] */
  let _sfDragSrc = null;      /* index of card being dragged within rack */
  let _sfPaletteQ = '';

  window.openSignalFlow = function() {
    renderSignalFlow();
  };

  function renderSignalFlow() {
    const paletteItems = getPaletteItems(_sfPaletteQ);

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">〰️ Signal Flow</h1>
        </div>

        <!-- ── Анимированный визуализатор сигнала ── -->
        <div class="sf-viz-wrap" id="sf-viz-wrap">
          <div class="sf-viz-header">
            <span class="sf-viz-title">Signal Visualizer</span>
            <span class="sf-viz-hint" id="sf-viz-hint">
              ${_sfChain.length ? `Цепочка: ${_sfChain.map(p=>`<span style="color:${p.color}">${p.name}</span>`).join(' → ')}` : 'Добавь плагины в цепочку — волна изменится'}
            </span>
          </div>
          <canvas id="sf-anim-canvas" class="sf-anim-canvas"></canvas>
          <div class="sf-viz-chain-pills">
            <div class="sf-viz-pill sf-viz-pill-src">Источник</div>
            ${_sfChain.map((p,i)=>`
              <div class="sf-viz-pill-arrow">→</div>
              <div class="sf-viz-pill" style="border-color:${p.color}44;color:${p.color}"
                   title="${p.category}">${p.name}</div>
            `).join('')}
          </div>
        </div>

        <div class="sf-wrap">

          <!-- ── Palette ── -->
          <div class="sf-palette">
            <div class="sf-palette-title">Плагины</div>
            <input class="sf-palette-search" type="text"
                   placeholder="Поиск…" value="${_sfPaletteQ}"
                   oninput="sfPaletteSearch(this.value)"
                   autocomplete="off">
            <div class="sf-palette-list" id="sf-palette-list">
              ${paletteItems.map(p => `
                <div class="sf-palette-item"
                     draggable="true"
                     data-id="${p.id}"
                     ondragstart="sfPaletteDragStart(event,'${p.id}')"
                     ondblclick="sfAddPlugin('${p.id}')">
                  <div class="sf-palette-dot" style="background:${p.color}"></div>
                  <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</span>
                  <span class="sf-palette-cat">${sfCatShort(p.category)}</span>
                </div>`).join('')}
            </div>
          </div>

          <!-- ── Rack ── -->
          <div class="sf-rack" id="sf-rack">
            ${renderRack()}
          </div>

          <!-- ── Summary ── -->
          <div class="sf-summary">
            ${renderSummary()}
          </div>

        </div>
      </div>
    `);
    /* Запускаем анимацию после вставки в DOM */
    _sfSigCur = null; /* сброс при полном ре-рендере */
    _sfSigTgt = sfComputeTarget(_sfChain);
    requestAnimationFrame(sfStartAnimation);
  }

  /* ============================================================
     ANIMATED SIGNAL VISUALIZER
     Одна полноширинная анимированная волна.
     Параметры морфятся при изменении цепочки.
  ============================================================ */

  let _sfAnimId    = null;
  let _sfAnimStart = null;

  /* Текущие параметры волны (интерполируем к target) */
  let _sfSigCur = null;
  let _sfSigTgt = null;
  const SF_LERP = 0.04; /* скорость морфинга */

  /* Вычисляем целевые параметры из цепочки */
  function sfComputeTarget(chain) {
    const p = {
      amp:        0.72,   /* амплитуда */
      drive:      0.0,    /* насыщение/клиппинг (tanh drive) */
      compression:0.0,    /* сжатие динамики */
      smoothness: 0.0,    /* сглаживание (LP фильтр) */
      echoes:     0.0,    /* количество эхо-хвостов */
      chorus:     0.0,    /* модуляция/хорус */
      noise:      0.04,   /* уровень шума */
      freqBias:   0.0,    /* смещение частоты (-1 низы, +1 верха) */
      color:      [180, 180, 180], /* RGB цвет волны */
      brightness: 1.0,
    };

    chain.forEach(plugin => {
      const [r,g,b] = hexToRgb(plugin.color);
      p.color = [
        p.color[0] * 0.5 + r * 0.5,
        p.color[1] * 0.5 + g * 0.5,
        p.color[2] * 0.5 + b * 0.5,
      ];
      switch (plugin.category) {
        case 'Динамика':
          p.compression = Math.min(1, p.compression + 0.45);
          p.amp = Math.max(0.35, p.amp - 0.08);
          break;
        case 'Мастеринг':
          p.compression = Math.min(1, p.compression + 0.25);
          p.amp = Math.min(0.9, p.amp + 0.1);
          p.brightness = Math.min(1.4, p.brightness + 0.2);
          break;
        case 'EQ':
          p.freqBias += 0.2;
          p.brightness = Math.min(1.4, p.brightness + 0.1);
          break;
        case 'Дисторшн и сатурация':
          p.drive = Math.min(2.8, p.drive + 0.7);
          p.noise = Math.min(0.2, p.noise + 0.04);
          break;
        case 'Реверб':
          p.echoes = Math.min(1, p.echoes + 0.4);
          p.amp = Math.max(0.4, p.amp - 0.05);
          break;
        case 'Дилей':
          p.echoes = Math.min(1, p.echoes + 0.6);
          break;
        case 'Фильтры':
          p.smoothness = Math.min(1, p.smoothness + 0.5);
          p.freqBias -= 0.3;
          break;
        case 'Модуляция':
          p.chorus = Math.min(1, p.chorus + 0.5);
          break;
        case 'Стерео и пространство':
          p.amp = Math.min(0.9, p.amp + 0.06);
          p.chorus = Math.min(1, p.chorus + 0.2);
          break;
        case 'Утилиты':
          p.noise = Math.max(0.01, p.noise - 0.02);
          break;
      }
    });
    return p;
  }

  /* Линейная интерполяция двух объектов параметров */
  function sfLerpParams(cur, tgt, t) {
    const lerp = (a, b) => a + (b - a) * t;
    return {
      amp:         lerp(cur.amp,         tgt.amp),
      drive:       lerp(cur.drive,       tgt.drive),
      compression: lerp(cur.compression, tgt.compression),
      smoothness:  lerp(cur.smoothness,  tgt.smoothness),
      echoes:      lerp(cur.echoes,      tgt.echoes),
      chorus:      lerp(cur.chorus,      tgt.chorus),
      noise:       lerp(cur.noise,       tgt.noise),
      freqBias:    lerp(cur.freqBias,    tgt.freqBias),
      color:       [
        lerp(cur.color[0], tgt.color[0]),
        lerp(cur.color[1], tgt.color[1]),
        lerp(cur.color[2], tgt.color[2]),
      ],
      brightness: lerp(cur.brightness, tgt.brightness),
    };
  }

  /* Рисуем волну с параметрами p в момент времени t */
  function sfDrawWave(ctx, W, H, t, p) {
    ctx.clearRect(0, 0, W, H);

    const [cr, cg, cb] = p.color;
    const mid = H * 0.5;

    /* Сетка */
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.07)`;
    ctx.lineWidth   = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(0, H * i / 4); ctx.lineTo(W, H * i / 4); ctx.stroke();
    }

    /* Базовые частоты с учётом параметров */
    const freqMult = 1 + p.freqBias * 0.4;
    const speed    = 0.0012 + p.chorus * 0.0008;

    /* Функция сигнала в точке x */
    function signal(x) {
      const phase = x / W * Math.PI * 2 * (3 + freqMult * 2) - t * speed;
      let v = (
        Math.sin(phase)             * 0.45 +
        Math.sin(phase * 1.7 + 0.8) * 0.28 +
        Math.sin(phase * 3.1 + 1.6) * 0.14 * (1 + p.drive * 0.3) +
        Math.sin(phase * 5.3 + 2.4) * 0.08 * (1 + p.drive * 0.5)
      );

      /* Хорус/модуляция — лёгкое дрожание */
      if (p.chorus > 0) {
        const lfo = Math.sin(t * 0.0008 + x / W * Math.PI * 1.5) * p.chorus * 0.06;
        v += Math.sin(phase + lfo) * p.chorus * 0.18;
      }

      /* Компрессия — срезаем пики, поднимаем тихое */
      if (p.compression > 0) {
        const thresh = 1 - p.compression * 0.5;
        const sign   = v >= 0 ? 1 : -1;
        const abs    = Math.abs(v);
        v = sign * (abs > thresh ? thresh + (abs - thresh) * (1 - p.compression * 0.7) : abs);
        v *= (1 + p.compression * 0.3); /* make-up gain */
      }

      /* Сатурация/дисторшн */
      if (p.drive > 0) {
        v = Math.tanh(v * (1 + p.drive)) / Math.tanh(1 + p.drive);
      }

      /* LP сглаживание */
      v *= (1 - p.smoothness * 0.35);

      return v * p.amp;
    }

    /* Эхо-хвосты */
    const echoCount = Math.round(p.echoes * 3);
    for (let e = echoCount; e >= 1; e--) {
      const echoOffset = e * W * 0.18;
      const echoAlpha  = (1 - e / (echoCount + 1)) * p.echoes * 0.25;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const v = signal(x + echoOffset);
        const y = mid - v * (H * 0.42);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${echoAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    /* Основная волна + fill */
    ctx.beginPath();
    const pts = [];
    for (let x = 0; x <= W; x += 2) {
      const v    = signal(x) + (Math.random() - 0.5) * p.noise * 0.3;
      const y    = mid - v * (H * 0.42);
      pts.push([x, y]);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    /* Glow — рисуем широкую прозрачную линию под основной */
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.15)`;
    ctx.lineWidth   = 6;
    ctx.stroke();

    /* Основная линия */
    ctx.beginPath();
    pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.85 * p.brightness})`;
    ctx.lineWidth   = 2;
    ctx.stroke();

    /* Fill под волной — gradient */
    if (pts.length) {
      ctx.beginPath();
      pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
      ctx.lineTo(W, mid); ctx.lineTo(0, mid);
      const grad = ctx.createLinearGradient(0, mid - H * 0.4, 0, mid + H * 0.4);
      grad.addColorStop(0,   `rgba(${cr},${cg},${cb},0.18)`);
      grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.04)`);
      grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0.18)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    /* Центральная линия */
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.15)`;
    ctx.lineWidth   = 1;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();

    /* Бегущий маркер слева направо */
    const markerX = ((t * 0.00035) % 1) * W;
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.35)`;
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(markerX, 0); ctx.lineTo(markerX, H); ctx.stroke();
    ctx.setLineDash([]);
  }

  function sfStartAnimation() {
    sfStopAnimation();
    const canvas = document.getElementById('sf-anim-canvas');
    if (!canvas) return;

    /* Размер */
    const rect = canvas.getBoundingClientRect();
    canvas.width  = Math.round(rect.width  || 800);
    canvas.height = Math.round(rect.height || 120);

    const ctx = canvas.getContext('2d');

    /* Инициализируем параметры */
    if (!_sfSigTgt) _sfSigTgt = sfComputeTarget([]);
    if (!_sfSigCur) _sfSigCur = { ..._sfSigTgt };

    _sfAnimStart = null;

    function loop(ts) {
      _sfAnimId = requestAnimationFrame(loop);
      const canvas2 = document.getElementById('sf-anim-canvas');
      if (!canvas2) { sfStopAnimation(); return; }

      if (!_sfAnimStart) _sfAnimStart = ts;
      const t = ts - _sfAnimStart;

      /* Морфинг к цели */
      _sfSigCur = sfLerpParams(_sfSigCur, _sfSigTgt, SF_LERP);

      sfDrawWave(ctx, canvas.width, canvas.height, t, _sfSigCur);
    }

    _sfAnimId = requestAnimationFrame(loop);
  }

  function sfStopAnimation() {
    if (_sfAnimId) { cancelAnimationFrame(_sfAnimId); _sfAnimId = null; }
  }

  /* Обновляем target при изменении цепочки */
  function sfUpdateViz() {
    _sfSigTgt = sfComputeTarget(_sfChain);
    /* Обновляем подсказку и пилюли без полного ре-рендера */
    const hint = document.getElementById('sf-viz-hint');
    if (hint) {
      hint.innerHTML = _sfChain.length
        ? `Цепочка: ${_sfChain.map(p=>`<span style="color:${p.color}">${p.name}</span>`).join(' → ')}`
        : 'Добавь плагины — волна изменится';
    }
    const pills = document.querySelector('.sf-viz-chain-pills');
    if (pills) {
      pills.innerHTML = `<div class="sf-viz-pill sf-viz-pill-src">Источник</div>`
        + _sfChain.map(p => `
          <div class="sf-viz-pill-arrow">→</div>
          <div class="sf-viz-pill" style="border-color:${p.color}55;color:${p.color}">${p.name}</div>
        `).join('');
    }
  }

  function renderRack() {
    if (!_sfChain.length) {
      return `<div class="sf-rack-hint" id="sf-drop-zone"
                   ondragover="sfDropZoneOver(event)"
                   ondragleave="sfDropZoneLeave(event)"
                   ondrop="sfDropOnZone(event)">
        <div style="font-size:28px;margin-bottom:10px">〰️</div>
        <div>Перетащи плагины сюда</div>
        <div style="font-size:11px;margin-top:6px;opacity:0.6">или дважды кликни в палитре</div>
      </div>`;
    }

    const SOURCE = `
      <div class="sf-slot">
        <div class="sf-slot-connector">
          <div class="sf-connector-line" style="visibility:hidden"></div>
          <div class="sf-connector-dot" style="background:var(--text-3)"></div>
          <div class="sf-connector-line"></div>
        </div>
        <div class="sf-source-label" style="flex:1;margin:4px 0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
          </svg>
          Источник сигнала
        </div>
      </div>`;

    const slots = _sfChain.map((p, i) => `
      <div class="sf-slot" id="sf-slot-${i}"
           ondragover="sfCardOver(event,${i})"
           ondragleave="sfCardLeave(event,${i})"
           ondrop="sfDropOnCard(event,${i})">
        <div class="sf-slot-connector">
          <div class="sf-connector-line"></div>
          <div class="sf-connector-dot" style="background:${p.color}"></div>
          <div class="sf-connector-line"></div>
        </div>
        <div class="sf-card" draggable="true"
             style="--sf-color:${p.color}"
             ondragstart="sfCardDragStart(event,${i})"
             ondragend="sfCardDragEnd(event)">
          <span class="sf-drag-handle">⠿</span>
          <div class="sf-card-dot" style="background:${p.color}"></div>
          <div class="sf-card-body">
            <div class="sf-card-name">${p.name}</div>
            <div class="sf-card-meta">${p.developer} · ${p.category}</div>
          </div>
          <div class="sf-card-actions">
            <button class="sf-card-btn" onclick="sfOpenPlugin('${p.id}')">→</button>
            <button class="sf-card-btn remove" onclick="sfRemove(${i})">✕</button>
          </div>
        </div>
      </div>`).join('');

    const OUTPUT = `
      <div class="sf-slot">
        <div class="sf-slot-connector">
          <div class="sf-connector-line"></div>
          <div class="sf-connector-dot" style="background:var(--text-3)"></div>
          <div class="sf-connector-line" style="visibility:hidden"></div>
        </div>
        <div class="sf-output-label" style="flex:1;margin:4px 0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Мастер / Output
        </div>
      </div>`;

    /* Drop zone at bottom */
    const DROP_ZONE = `
      <div style="margin-top:6px;padding:8px 14px 8px 46px"
           ondragover="sfDropZoneOver(event)"
           ondragleave="sfDropZoneLeave(event)"
           ondrop="sfDropOnZone(event)">
        <div class="sf-rack-hint" style="padding:12px">+ Добавить плагин</div>
      </div>`;

    return SOURCE + slots + OUTPUT + DROP_ZONE;
  }

  function renderSummary() {
    if (!_sfChain.length) {
      return `<div class="sf-summary-box">
        <div class="sf-summary-title">Цепочка</div>
        <div class="sf-empty-hint">Пусто — добавь плагины из палитры</div>
      </div>`;
    }

    const items = _sfChain.map((p, i) => `
      <div class="sf-summary-item">
        <div class="sf-summary-num">${i + 1}</div>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</span>
      </div>`).join('');

    const catMap = {};
    _sfChain.forEach(p => catMap[p.category] = (catMap[p.category] || 0) + 1);
    const catList = Object.entries(catMap).map(([cat, n]) =>
      `<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-2);padding:3px 0">
         <span>${cat}</span><span style="color:var(--text-3)">${n}</span>
       </div>`).join('');

    return `
      <div class="sf-summary-box">
        <div class="sf-summary-title">Цепочка (${_sfChain.length})</div>
        ${items}
      </div>
      <div class="sf-summary-box">
        <div class="sf-summary-title">По категориям</div>
        ${catList}
      </div>
      <button class="sf-export-btn" onclick="sfCopyText()">📋 Скопировать</button>
      <button class="sf-export-btn" style="background:var(--bg-2);color:var(--text);border:1px solid var(--border);margin-top:4px" onclick="sfClear()">🗑 Очистить</button>
    `;
  }

  function getPaletteItems(q) {
    q = (q || '').toLowerCase();
    return PLUGINS.filter(p =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.developer.toLowerCase().includes(q) ||
      (p.tags || []).join(' ').toLowerCase().includes(q)
    );
  }

  function sfCatShort(cat) {
    const map = {
      'EQ': 'EQ', 'Динамика': 'DYN', 'Мастеринг': 'MST',
      'Реверб': 'REV', 'Дилей': 'DLY', 'Стерео и пространство': 'STR',
      'Фильтры': 'FLT', 'Дисторшн и сатурация': 'SAT',
      'Модуляция': 'MOD', 'Утилиты': 'UTL', 'Новые (New)': 'NEW',
    };
    return map[cat] || cat.slice(0, 3).toUpperCase();
  }

  /* ── Palette drag ── */
  window.sfPaletteDragStart = function(e, id) {
    e.dataTransfer.setData('sf-palette-id', id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  window.sfPaletteSearch = function(q) {
    _sfPaletteQ = q;
    const list = document.getElementById('sf-palette-list');
    if (!list) return;
    list.innerHTML = getPaletteItems(q).map(p => `
      <div class="sf-palette-item"
           draggable="true"
           data-id="${p.id}"
           ondragstart="sfPaletteDragStart(event,'${p.id}')"
           ondblclick="sfAddPlugin('${p.id}')">
        <div class="sf-palette-dot" style="background:${p.color}"></div>
        <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</span>
        <span class="sf-palette-cat">${sfCatShort(p.category)}</span>
      </div>`).join('');
  };

  /* ── Drop zone ── */
  window.sfDropZoneOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.querySelector('.sf-rack-hint')?.classList.add('drag-over');
  };
  window.sfDropZoneLeave = function(e) {
    e.currentTarget.querySelector('.sf-rack-hint')?.classList.remove('drag-over');
  };
  window.sfDropOnZone = function(e) {
    e.preventDefault();
    e.currentTarget.querySelector('.sf-rack-hint')?.classList.remove('drag-over');
    const id = e.dataTransfer.getData('sf-palette-id');
    if (id) sfAddPlugin(id);
  };

  /* ── Card drag (reorder) ── */
  window.sfCardDragStart = function(e, idx) {
    _sfDragSrc = idx;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('sf-card-idx', idx);
    setTimeout(() => {
      const card = document.querySelector(`#sf-slot-${idx} .sf-card`);
      if (card) card.style.opacity = '0.35';
    }, 0);
  };
  window.sfCardDragEnd = function(e) {
    document.querySelectorAll('.sf-card').forEach(c => c.style.opacity = '');
    document.querySelectorAll('.sf-card.drag-over-card').forEach(c => c.classList.remove('drag-over-card'));
    _sfDragSrc = null;
  };
  window.sfCardOver = function(e, idx) {
    e.preventDefault();
    if (_sfDragSrc === null || _sfDragSrc === idx) return;
    document.querySelector(`#sf-slot-${idx} .sf-card`)?.classList.add('drag-over-card');
  };
  window.sfCardLeave = function(e, idx) {
    document.querySelector(`#sf-slot-${idx} .sf-card`)?.classList.remove('drag-over-card');
  };
  window.sfDropOnCard = function(e, targetIdx) {
    e.preventDefault();
    document.querySelector(`#sf-slot-${targetIdx} .sf-card`)?.classList.remove('drag-over-card');

    const fromPalette = e.dataTransfer.getData('sf-palette-id');
    if (fromPalette) {
      /* вставляем перед target */
      const p = PLUGINS.find(x => x.id === fromPalette);
      if (p) { _sfChain.splice(targetIdx, 0, p); renderSignalFlow(); return; }
    }

    const srcIdx = parseInt(e.dataTransfer.getData('sf-card-idx'), 10);
    if (isNaN(srcIdx) || srcIdx === targetIdx) return;
    /* reorder */
    const [moved] = _sfChain.splice(srcIdx, 1);
    const insertAt = srcIdx < targetIdx ? targetIdx - 1 : targetIdx;
    _sfChain.splice(insertAt, 0, moved);
    renderSignalFlow();
  };

  /* ── Actions ── */
  window.sfAddPlugin = function(id) {
    const p = PLUGINS.find(x => x.id === id);
    if (!p) return;
    _sfChain.push(p);
    /* Обновляем рэк и визуализатор без полного ре-рендера */
    const rack = document.getElementById('sf-rack');
    if (rack) rack.innerHTML = renderRack();
    const summ = document.querySelector('.sf-summary');
    if (summ) summ.innerHTML = renderSummary();
    sfUpdateViz();
  };
  window.sfRemove = function(idx) {
    _sfChain.splice(idx, 1);
    const rack = document.getElementById('sf-rack');
    if (rack) rack.innerHTML = renderRack();
    const summ = document.querySelector('.sf-summary');
    if (summ) summ.innerHTML = renderSummary();
    sfUpdateViz();
  };
  window.sfClear = function() {
    if (_sfChain.length && !confirm('Очистить цепочку?')) return;
    _sfChain = [];
    const rack = document.getElementById('sf-rack');
    if (rack) rack.innerHTML = renderRack();
    const summ = document.querySelector('.sf-summary');
    if (summ) summ.innerHTML = renderSummary();
    sfUpdateViz();
  };
  window.sfOpenPlugin = function(id) {
    window.selectPlugin(id);
  };
  window.sfCopyText = function() {
    if (!_sfChain.length) return;
    const text = _sfChain.map((p, i) => `${i + 1}. ${p.name} (${p.developer}) — ${p.category}`).join('\n');
    navigator.clipboard.writeText('Signal Flow:\n' + text)
      .then(() => {
        const btn = document.querySelector('.sf-export-btn');
        if (btn) { btn.textContent = '✓ Скопировано!'; setTimeout(() => btn.textContent = '📋 Скопировать', 1500); }
      });
  };

})();
