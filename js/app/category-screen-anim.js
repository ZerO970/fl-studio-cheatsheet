/* ============================================================
   CATEGORY SCREEN + BACKGROUND ANIMATIONS
   ============================================================ */

  /* ============================================================
     CATEGORY SCREEN — полный экран категории с canvas-анимацией
  ============================================================ */

  let _catAnimId    = null;
  let _catAnimStart = null;
  let _activeFeatureScreen = null;

  window.openCategoryScreen = function(cat) {
    _activeFeatureScreen = { type: 'category', cat };
    /* Не пушим если уже на feature-screen (переход между категориями) */
    const fs = document.getElementById('feature-screen');
    const onFeature = fs && !fs.classList.contains('hidden');
    if (!onFeature) {
      navPush(L('navHome'), () => { navClearHistory(); showWelcome(); });
    }
    stopCategoryAnimation();

    const catInfo = CATEGORIES[cat] || { color: '#888', icon: '·' };
    const plugins = PLUGINS.filter(p => p.category === cat);
    const desc    = (CAT_DESC_LANG[currentLang] || CAT_DESC_LANG.ru)[cat] || '';

    const cards = plugins.map(raw => {
      const p = tP(raw);
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
              <div class="cat-screen-title">${CAT_NAMES[currentLang][cat] || cat}</div>
              <div class="cat-screen-count">${plugins.length} ${L('catScreenPlugins')}</div>
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

