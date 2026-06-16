/* ============================================================
   CORE — i18n, global state, DOM refs
   ============================================================ */


  /* ── i18n ── */
  let currentLang = localStorage.getItem('fl-lang') || 'ru';
  const L = key => (LANG[currentLang] || LANG.ru)[key] || key;
  const tL = tag => currentLang === 'en' ? (TAG_EN[tag] || tag) : tag;
  function tP(p) {
    if (currentLang !== 'en') return p;
    const en = (typeof PLUGINS_EN !== 'undefined') && PLUGINS_EN[p.id];
    const ft = (typeof FORUM_TIPS_EN !== 'undefined') && FORUM_TIPS_EN[p.id];
    if (!en && !ft) return p;
    return Object.assign({}, p, en || {}, ft ? { forumTips: ft } : {});
  }
  function tChain(c) {
    if (currentLang !== 'en') return c;
    const en = (typeof CHAINS_EN !== 'undefined') && CHAINS_EN[c.id];
    if (!en) return c;
    const steps = c.steps.map((s, i) => Object.assign({}, s, (en.steps && en.steps[i]) || {}));
    return Object.assign({}, c, en, { steps });
  }
  function tCompat(c) {
    if (currentLang !== 'en') return c;
    const en = (typeof COMPAT_EN !== 'undefined') && COMPAT_EN[c.a + '__' + c.b];
    if (!en) return c;
    return Object.assign({}, c, en);
  }
  function tQuizQuestion(id, q) {
    if (currentLang !== 'en') return q;
    const en = (typeof QUIZ_EN !== 'undefined') && QUIZ_EN.questions[id];
    if (!en) return q;
    const answers = q.answers.map((a, i) => Object.assign({}, a, en.answers && en.answers[i] != null ? { label: en.answers[i] } : {}));
    return Object.assign({}, q, { text: en.text || q.text }, { answers });
  }
  function tQuizResult(id, r) {
    if (currentLang !== 'en') return r;
    const en = (typeof QUIZ_EN !== 'undefined') && QUIZ_EN.results[id];
    if (!en) return r;
    return Object.assign({}, r, en);
  }
  window.setLang = function(lang) {
    if (lang === currentLang) return;
    const sw = document.getElementById('lang-switch');
    if (sw) sw.dataset.lang = lang;
    const btnRu = document.getElementById('lang-btn-ru');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnRu) btnRu.classList.toggle('active', lang === 'ru');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    const detailOpen   = detailEl  && !detailEl.classList.contains('hidden');
    const welcomeOpen  = welcomeEl && !welcomeEl.classList.contains('hidden');
    const fs           = document.getElementById('feature-screen');
    const featureOpen  = fs && !fs.classList.contains('hidden');
    const categoryOpen = featureOpen && _activeFeatureScreen && _activeFeatureScreen.type === 'category';

    if (!(detailOpen || welcomeOpen || categoryOpen)) {
      localStorage.setItem('fl-lang', lang);
      setTimeout(() => location.reload(), 320);
      return;
    }

    currentLang = lang;
    localStorage.setItem('fl-lang', lang);
    document.documentElement.lang = currentLang;
    relocalizeStaticChrome();

    if (detailOpen && currentPlugin) {
      const fresh = PLUGINS.find(p => p.id === currentPlugin.id);
      if (fresh) {
        const savedTab = currentTab;
        currentPlugin = tP(fresh);
        renderDetail(currentPlugin);
        switchTab(savedTab);
      }
    } else if (categoryOpen) {
      openCategoryScreen(_activeFeatureScreen.cat);
    } else if (welcomeOpen) {
      relocalizeWelcome();
    }
  };

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

