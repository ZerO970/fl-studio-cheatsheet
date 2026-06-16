/* ============================================================
   SIGNAL FLOW VISUALIZER
   ============================================================ */

  /* ============================================================
     SIGNAL FLOW VISUALIZER
  ============================================================ */
  let _sfChain = [];          /* [{id, name, color, category, developer}] */
  let _sfDragSrc = null;      /* index of card being dragged within rack */
  let _sfPaletteQ = '';

  window.openSignalFlow = function() {
    _activeFeatureScreen = { type: 'signalFlow' };
    navPush(L('navHome'), () => { navClearHistory(); showWelcome(); });
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
              ${_sfChain.length ? `${L('sfChainLabel')} ${_sfChain.map(p=>`<span style="color:${p.color}">${p.name}</span>`).join(' → ')}` : L('sfAddHint')}
            </span>
          </div>
          <canvas id="sf-anim-canvas" class="sf-anim-canvas"></canvas>
          <div class="sf-viz-chain-pills">
            <div class="sf-viz-pill sf-viz-pill-src">${L('sfSource')}</div>
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
            <div class="sf-palette-title">${L('sfPaletteTitle')}</div>
            <input class="sf-palette-search" type="text"
                   placeholder="${L('sfPaletteSearchPh')}" value="${_sfPaletteQ}"
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
        ? `${L('sfChainLabel')} ${_sfChain.map(p=>`<span style="color:${p.color}">${p.name}</span>`).join(' → ')}`
        : L('sfAddHintShort');
    }
    const pills = document.querySelector('.sf-viz-chain-pills');
    if (pills) {
      pills.innerHTML = `<div class="sf-viz-pill sf-viz-pill-src">${L('sfSource')}</div>`
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
        <div>${L('sfDrop')}</div>
        <div style="font-size:11px;margin-top:6px;opacity:0.6">${currentLang === 'en' ? 'or double-click in palette' : 'или дважды кликни в палитре'}</div>
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
          ${currentLang === 'en' ? 'Signal Source' : 'Источник сигнала'}
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
            <div class="sf-card-meta">${p.developer} · ${CAT_NAMES[currentLang][p.category] || p.category}</div>
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
          ${currentLang === 'en' ? 'Master / Output' : 'Мастер / Output'}
        </div>
      </div>`;

    /* Drop zone at bottom */
    const DROP_ZONE = `
      <div style="margin-top:6px;padding:8px 14px 8px 46px"
           ondragover="sfDropZoneOver(event)"
           ondragleave="sfDropZoneLeave(event)"
           ondrop="sfDropOnZone(event)">
        <div class="sf-rack-hint" style="padding:12px">${L('sfAddPlugin')}</div>
      </div>`;

    return SOURCE + slots + OUTPUT + DROP_ZONE;
  }

  function renderSummary() {
    if (!_sfChain.length) {
      return `<div class="sf-summary-box">
        <div class="sf-summary-title">${L('sfChainLabel').replace(':','')}</div>
        <div class="sf-empty-hint">${L('sfEmpty')}</div>
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
        <div class="sf-summary-title">${L('sfChainLabel').replace(':','')} (${_sfChain.length})</div>
        ${items}
      </div>
      <div class="sf-summary-box">
        <div class="sf-summary-title">${L('sfByCategory')}</div>
        ${catList}
      </div>
      <button class="sf-export-btn" onclick="sfCopyText()">📋 ${currentLang === 'en' ? 'Copy' : 'Скопировать'}</button>
      <button class="sf-export-btn" style="background:var(--bg-2);color:var(--text);border:1px solid var(--border);margin-top:4px" onclick="sfClear()">🗑 ${currentLang === 'en' ? 'Clear' : 'Очистить'}</button>
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

