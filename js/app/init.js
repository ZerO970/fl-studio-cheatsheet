/* ============================================================
   INIT
   ============================================================ */

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    totalCount.textContent = PLUGINS.length;

    document.documentElement.lang = currentLang;
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
      langSwitch.classList.add('no-anim');
      langSwitch.dataset.lang = currentLang;
      void langSwitch.offsetWidth;
      requestAnimationFrame(() => langSwitch.classList.remove('no-anim'));
    }
    const btnRu = document.getElementById('lang-btn-ru');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnRu) btnRu.classList.toggle('active', currentLang === 'ru');
    if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');

    relocalizeStaticChrome();
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

  /* Переприменяет языко-зависимые части статичного UI (вызывается при init и при смене языка) */
  function relocalizeStaticChrome() {
    if (sidebarSearch) sidebarSearch.placeholder = L('searchPlaceholder');
    if (welcomeSearch) welcomeSearch.placeholder = L('welcomeSearchPh');
    const homeBtn = document.getElementById('sidebar-home-btn');
    if (homeBtn) {
      const svg = homeBtn.querySelector('svg');
      homeBtn.textContent = L('homeBtn');
      if (svg) homeBtn.prepend(svg);
    }
    const welcomeSub = document.querySelector('#welcome .welcome-inner > p');
    if (welcomeSub) welcomeSub.innerHTML = `${L('welcomeSubtitle')} · <span id="total-count">${PLUGINS.length}</span> ${L('welcomePluginsOf')}`;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const tab = btn.dataset.tab;
      const labels = {
        overview: currentLang === 'en' ? 'Overview'   : 'Обзор',
        guide:    currentLang === 'en' ? 'Full guide' : 'Полный гайд',
        tips:     currentLang === 'en' ? 'Tips'       : 'Типсы и трюки',
        params:   currentLang === 'en' ? 'Params'     : 'Параметры',
        forum:    currentLang === 'en' ? 'Forums'     : 'С форумов',
      };
      if (labels[tab]) {
        if (tab === 'forum') {
          const svg = btn.querySelector('svg');
          btn.textContent = labels[tab];
          if (svg) btn.prepend(svg);
        } else {
          btn.textContent = labels[tab];
        }
      }
    });
    buildSidebar(searchQuery);
    renderThemeSwitcher();
  }

  /* Пересобирает welcome-экран на текущем языке, сохраняя поиск/тег-фильтр */
  function relocalizeWelcome() {
    const welcomeSub = document.querySelector('#welcome .welcome-inner > p');
    if (welcomeSub) welcomeSub.innerHTML = `${L('welcomeSubtitle')} · <span id="total-count">${PLUGINS.length}</span> ${L('welcomePluginsOf')}`;
    buildCategoryGrid();
    buildTagChips();
    if (searchQuery && searchQuery.length > 1) {
      showSearchResults(searchQuery);
    } else if (_activeTag) {
      showTagResults(_activeTag);
    }
  }

