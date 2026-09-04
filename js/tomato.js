  (function() {
    "use strict";

    // ---------- 常量 & DOM 引用 ----------
    const KEY_TASKS = 'js17_tasks';
    const KEY_HIST  = 'js17_history';
    const KEY_THEME = 'js17_theme';
    const KEY_SET   = 'js17_settings';

    const app = document.getElementById('app');
    const timeEl = document.getElementById('time');
    const modeEl = document.getElementById('mode');
    const countEl = document.getElementById('count');
    const logEl = document.getElementById('log');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const skipBtn = document.getElementById('skipBtn');
    const saveBtn = document.getElementById('saveBtn');
    const workInput = document.getElementById('workInput');
    const breakInput = document.getElementById('breakInput');
    const taskInput = document.getElementById('taskInput');
    const taskAdd = document.getElementById('taskAdd');
    const taskList = document.getElementById('taskList');
    const chartCanvas = document.getElementById('chart');

    const THEMES = ['活力橙', '暖阳橙', '落日橙', '深夜橙'];

    // ---------- 主题 ----------
    function applyTheme(name) {
      if (!name) name = '活力橙';
      app.dataset.theme = name;
      try { localStorage.setItem(KEY_THEME, name); } catch (_) {}
      THEMES.forEach(t => {
        const btn = document.getElementById('theme-' + t);
        if (btn) btn.classList.toggle('active', t === name);
      });
    }

    // 初始化主题
    try {
      const saved = localStorage.getItem(KEY_THEME);
      applyTheme(saved || '活力橙');
    } catch (_) { applyTheme('活力橙'); }

    THEMES.forEach(t => {
      const btn = document.getElementById('theme-' + t);
      if (btn) btn.addEventListener('click', () => applyTheme(t));
    });

    // ---------- 任务 ----------
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem(KEY_TASKS) || '[]'); } catch (_) { tasks = []; }

    function saveTasks() {
      try { localStorage.setItem(KEY_TASKS, JSON.stringify(tasks)); } catch (_) {}
    }

    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.done) li.className = 'done';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = task.done;
        cb.addEventListener('change', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.textContent = task.text;

        const del = document.createElement('span');
        del.className = 'del';
        del.textContent = '✕';
        del.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(cb);
        li.appendChild(span);
        li.appendChild(del);
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const text = taskInput.value.trim();
      if (!text) return;
      tasks.push({ id: Date.now(), text, done: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
      drawChart();
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
      drawChart();
    }

    function toggleTask(id) {
      tasks.forEach(t => { if (t.id === id) t.done = !t.done; });
      saveTasks();
      renderTasks();
      drawChart();
    }

    taskAdd.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

    // ---------- 番茄钟 ----------
    let settings = { work: 25, break: 5 };
    try {
      const s = JSON.parse(localStorage.getItem(KEY_SET) || 'null');
      if (s && typeof s === 'object') settings = s;
    } catch (_) {}

    let mode = 'work';            // 'work' | 'break'
    let total = settings.work * 60;
    let remaining = total;
    let ticking = false;
    let timerId = null;

    let history = {};
    try { history = JSON.parse(localStorage.getItem(KEY_HIST) || '{}'); } catch (_) { history = {}; }
    const today = new Date().toISOString().slice(0, 10);
    if (typeof history[today] !== 'number') history[today] = 0;

    function fmt(sec) {
      const m = String(Math.floor(sec / 60)).padStart(2, '0');
      const s = String(sec % 60).padStart(2, '0');
      return m + ':' + s;
    }

    function render() {
      timeEl.textContent = fmt(remaining);
      modeEl.textContent = (mode === 'work') ? '🍅 专注中' : '☕ 休息中';
      startBtn.textContent = ticking ? '⏸ 暂停' : '▶ 开始';
      countEl.textContent = history[today] || 0;
    }

    function log(msg) {
      const t = new Date().toLocaleTimeString('zh-CN');
      logEl.textContent = '[' + t + '] ' + msg + '\n' + logEl.textContent;
    }

    function beep() {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        const ac = new Ctx();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.18;
        osc.start();
        setTimeout(() => { osc.stop(); ac.close(); }, 600);
      } catch (_) {}
    }

    function tick() {
      if (remaining > 0) {
        remaining -= 1;
        render();
      } else {
        clearInterval(timerId);
        timerId = null;
        ticking = false;
        beep();

        if (mode === 'work') {
          history[today] = (history[today] || 0) + 1;
          try { localStorage.setItem(KEY_HIST, JSON.stringify(history)); } catch (_) {}
          log('🍅 一个番茄完成！累计 ' + history[today]);
          mode = 'break';
          total = settings.break * 60;
        } else {
          log('☕ 休息结束，开始下一轮');
          mode = 'work';
          total = settings.work * 60;
        }
        remaining = total;
        render();
        drawChart();
      }
    }

    startBtn.addEventListener('click', function() {
      if (ticking) {
        clearInterval(timerId);
        ticking = false;
        log('⏸ 已暂停');
      } else {
        ticking = true;
        log(mode === 'work' ? '▶ 开始专注' : '▶ 开始休息');
        timerId = setInterval(tick, 1000);
      }
      render();
    });

    resetBtn.addEventListener('click', function() {
      clearInterval(timerId);
      timerId = null;
      ticking = false;
      remaining = total;
      render();
      log('↺ 已重置');
    });

    skipBtn.addEventListener('click', function() {
      clearInterval(timerId);
      timerId = null;
      ticking = false;
      mode = (mode === 'work') ? 'break' : 'work';
      total = (mode === 'work' ? settings.work : settings.break) * 60;
      remaining = total;
      render();
      log('⏭ 跳到' + (mode === 'work' ? '专注' : '休息'));
    });

    saveBtn.addEventListener('click', function() {
      const w = Math.max(1, parseInt(workInput.value, 10) || 25);
      const b = Math.max(1, parseInt(breakInput.value, 10) || 5);
      settings = { work: w, break: b };
      try { localStorage.setItem(KEY_SET, JSON.stringify(settings)); } catch (_) {}
      if (!ticking) {
        total = (mode === 'work' ? w : b) * 60;
        remaining = total;
      }
      render();
      log('💾 设置已保存：专注 ' + w + ' 分 / 休息 ' + b + ' 分');
    });

    // 设置输入框默认值
    workInput.value = settings.work;
    breakInput.value = settings.break;

    // ---------- 图表 ----------
    function last7Days() {
      const arr = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        arr.push(d.toISOString().slice(0, 10));
      }
      return arr;
    }

    function drawChart() {
      const ctx = chartCanvas.getContext('2d');
      const w = chartCanvas.width, h = chartCanvas.height;
      ctx.clearRect(0, 0, w, h);

      const days = last7Days();
      const vals = days.map(d => history[d] || 0);
      const max = Math.max(1, ...vals);

      const bw = w / days.length;
      let color = '#EA580C';
      try {
        const computed = getComputedStyle(app).getPropertyValue('--c-primary').trim();
        if (computed) color = computed;
      } catch (_) {}

      // 绘制柱状图
      vals.forEach((v, i) => {
        const bh = (v / max) * (h - 28);
        ctx.fillStyle = color;
        ctx.fillRect(i * bw + 8, h - bh - 20, bw - 14, bh);

        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(v), i * bw + bw/2, h - 6);
      });
    }

    // ---------- 启动 ----------
    render();
    renderTasks();
    drawChart();

    // 主动同步一次历史 (若今天未初始化)
    if (!history[today]) {
      history[today] = 0;
      try { localStorage.setItem(KEY_HIST, JSON.stringify(history)); } catch (_) {}
    }

    // 额外监听设置变化保持数据一致
    window.addEventListener('storage', function(e) {
      if (e.key === KEY_HIST) {
        try { history = JSON.parse(e.newValue || '{}'); } catch (_) {}
        if (typeof history[today] !== 'number') history[today] = 0;
        countEl.textContent = history[today];
        drawChart();
      }
      if (e.key === KEY_TASKS) {
        try { tasks = JSON.parse(e.newValue || '[]'); } catch (_) { tasks = []; }
        renderTasks();
      }
      if (e.key === KEY_THEME) {
        applyTheme(e.newValue || '活力橙');
      }
    });

  })();