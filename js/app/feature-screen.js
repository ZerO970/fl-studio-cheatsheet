/* ============================================================
   FEATURE SCREEN WRAPPER / NAV HISTORY
   ============================================================ */

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

  /* ── Navigation history ── */
  let _navHistory = []; /* { label, restore } */

  function navPush(label, restore) {
    _navHistory.push({ label, restore });
  }

  function navClearHistory() {
    _navHistory = [];
  }

  window.featureBack = function() {
    stopCategoryAnimation();
    sfStopAnimation();
    const prev = _navHistory.pop();
    if (prev) {
      prev.restore();
    } else {
      hideFeatureScreen();
    }
  };

  /* Back button — shows previous screen name if available */
  const backBtn = (overrideLabel) => {
    const prev = _navHistory[_navHistory.length - 1];
    const label = overrideLabel || (prev ? prev.label : L('navHome'));
    return `
    <button class="screen-back" onclick="featureBack()">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${label}
    </button>`;
  };

