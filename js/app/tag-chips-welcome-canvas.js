/* ============================================================
   TAG CHIPS + WELCOME CANVAS
   ============================================================ */

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
              data-tag="${tag}"
              onclick="selectTag('${tag}')">
          <span class="tag-chip-hash">#</span>${tL(tag)}
        </span>`).join('') +
        (top.length > SHOW_INIT
          ? `<span class="tag-chips-more" onclick="toggleTagChips()">
               ${expanded ? L('tagChipsCollapse') : `${L('tagChipsMore')} ${top.length - SHOW_INIT}`}
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
      c.classList.toggle('active', c.dataset.tag === tag);
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

