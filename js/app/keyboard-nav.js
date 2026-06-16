/* ============================================================
   KEYBOARD NAVIGATION
   ============================================================ */

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
      const tabs = ['overview', 'guide', 'tips', 'params', 'forum'];
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

