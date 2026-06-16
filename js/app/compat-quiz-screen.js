/* ============================================================
   COMPATIBILITY + QUIZ SCREENS
   ============================================================ */

  /* ============================================================
     COMPAT SCREEN
  ============================================================ */
  let _compatFilter = 'all';

  window.openCompatScreen = function() {
    _activeFeatureScreen = { type: 'compat' };
    navPush(L('navHome'), () => { navClearHistory(); showWelcome(); });
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
    _activeFeatureScreen = { type: 'quiz' };
    navPush(L('navHome'), () => { navClearHistory(); showWelcome(); });
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
            : `<button class="screen-back" onclick="openQuizScreen()">${L('navRestart')}</button>`}
          <h1 class="screen-title">${L('quizTitle')}</h1>
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
          <span class="quiz-result-plugin-arr">${L('quizOpenPlugin')}</span>
        </div>`;
    }).join('');

    const tips = result.tips && result.tips.length
      ? `<div class="quiz-result-tips">
          <h3>${L('quizKeySettings')}</h3>
          <ul>${result.tips.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>`
      : '';

    const chainBtn = result.chain
      ? `<button class="quiz-result-chain-btn" onclick="openChainDetail('${result.chain}')">
          ${L('quizOpenChain')}
        </button>`
      : '';

    showFeatureScreen(`
      <div class="feature-screen">
        <div class="screen-header">
          <button class="screen-back" onclick="openQuizScreen()">${L('navRestartQuiz')}</button>
          <h1 class="screen-title">${L('quizResultTitle')}</h1>
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
            <button class="quiz-restart-btn" onclick="featureBack()">${L('navBackHome')}</button>
          </div>
        </div>
      </div>
    `);
  }

