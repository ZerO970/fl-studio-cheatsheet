/* ============================================================
   COMPARE SCREEN + PLUGIN PICKER
   ============================================================ */

  /* ============================================================
     COMPARE SCREEN
  ============================================================ */
  window.openCompareScreen = function(presetId) {
    _activeFeatureScreen = { type: 'compare' };
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
           <span class="compare-picker-hint">${L('comparePick')}</span>
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
           <span class="compare-picker-hint">${L('comparePick')}</span>
         </div>`;

    const splitView = (comparePluginA && comparePluginB)
      ? renderCompareSplit(comparePluginA, comparePluginB)
      : `<div style="text-align:center;padding:40px 0;color:var(--text-3);font-size:13px">
           ${L('comparePrompt')}
         </div>`;

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          ${backBtn()}
          <h1 class="screen-title">${L('compareTitle')}</h1>
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
      const tags = (p.tags || []).map(t => `<span class="compare-tag">${tL(t)}</span>`).join('');
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
              <div class="compare-section-title">${L('labelDescription')}</div>
              <div class="compare-desc">${p.shortDesc}</div>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">${L('comparePros')}</div>
              <ul class="compare-list pros">${pros}</ul>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">${L('compareCons')}</div>
              <ul class="compare-list cons">${cons}</ul>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">${L('compareWhen')}</div>
              <div class="compare-desc">${p.when || '—'}</div>
            </div>
            <div class="compare-section">
              <div class="compare-section-title">${L('compareTags')}</div>
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
          <input id="picker-search-input" type="text" placeholder="${L('pickerSearchPh')}"
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

