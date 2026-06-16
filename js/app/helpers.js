/* ============================================================
   HELPERS (icons, badges, themes)
   ============================================================ */

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
    { id: 'dark',      labelRu: 'Тёмная',  labelEn: 'Dark',  dot: '#222' },
    { id: 'fl-orange', labelRu: 'FL Orange',labelEn: 'FL Orange', dot: '#FF6B00' },
    { id: 'light',     labelRu: 'Светлая', labelEn: 'Light', dot: '#e0e0e0' },
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
    document.querySelector('.theme-switcher')?.remove();
    const wrap = document.createElement('div');
    wrap.className = 'theme-switcher';
    const current = localStorage.getItem('fl-theme') || 'dark';
    wrap.innerHTML = THEMES.map(t => {
      const label = currentLang === 'en' ? t.labelEn : t.labelRu;
      return `
      <button class="theme-btn${t.id === current ? ' active' : ''}"
              data-theme="${t.id}"
              onclick="setTheme('${t.id}')"
              title="${label}">
        <span class="theme-btn-dot" style="background:${t.dot};border:1px solid var(--border-2)"></span>
        ${label}
      </button>`;
    }).join('');
    document.getElementById('sidebar').insertBefore(
      wrap,
      document.querySelector('.sidebar-home-wrap')
    );
  }

  window.setTheme = function(id) { applyTheme(id); };

