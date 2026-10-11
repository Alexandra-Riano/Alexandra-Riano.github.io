'use strict';
const KEY = 'alex-wellness-v1';

// From "Alexandra Riano Wellness Plan" (Alex Alvarez, ATC) — 1st microcycle, 3 full-body days.
// warm = warm-up sets, n = working sets, reps = target range. All working sets at 2–3 RIR, 60–90 s rest.
const PROGRAM = [
  { day: 1, focus: 'Full body A', exercises: [
    { name: 'Hack Squat', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Chest Press', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Neutral Grip Lat Pulldown', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Chest Supported Row', warm: 1, n: 3, reps: [8, 10] },
    { name: 'Leg Extension', warm: 1, n: 3, reps: [10, 12] }] },
  { day: 2, focus: 'Full body B', exercises: [
    { name: 'Leg Press', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Shoulder Press', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Cable Row', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Pec Fly', warm: 1, n: 3, reps: [8, 12] },
    { name: 'Preacher Curl', warm: 1, n: 3, reps: [8, 12] }] },
  { day: 3, focus: 'Full body C', exercises: [
    { name: 'Forward Smith Machine Lunge', warm: 2, n: 4, reps: [8, 10] },
    { name: 'Incline Chest Press', warm: 2, n: 3, reps: [10, 12] },
    { name: 'Lat Pulldown', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Leg Curl', warm: 2, n: 3, reps: [10, 12] }] }
];
// Plan's calorie targets for muscle gain (~250 kcal surplus) by activity level.
const ACTIVITY = [
  ['sedentary', 'Sedentary', 1524], ['light', 'Light · 1–3×/wk', 1746], ['moderate', 'Moderate · 3–5×/wk', 1860],
  ['intense', 'Intense · 6–7×/wk', 1968], ['very', 'Very intense · daily', 2190]];
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');
const iso = d => { const x = new Date(d); return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`; };
const today = () => iso(Date.now());
const addDays = (s, n) => { const d = new Date(s + 'T12:00'); d.setDate(d.getDate() + n); return iso(d); };
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);
const prettyDate = (d, o = { weekday: 'long', month: 'long', day: 'numeric' }) => new Date(d + 'T12:00').toLocaleDateString(undefined, o);
const shortDate = d => prettyDate(d, { month: 'short', day: 'numeric' });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);
const fmt = n => Math.round(n).toLocaleString();
const r1 = n => Math.round(n * 10) / 10;
const mmss = s => `${Math.floor(s / 60)}:${pad(s % 60)}`;

function defaults() {
  return {
    settings: { units: 'lb', activity: 'moderate', kcal: 1860, protein: 110, fat: 52, carbs: 238, cardioGoal: 150, rest: 90 },
    food: {}, foods: [], weights: [], workouts: [], cardio: [], active: null
  };
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.settings) { const d = defaults(); return { ...d, ...s, settings: { ...d.settings, ...s.settings } }; }
  } catch (e) { /* fall through */ }
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Could not save — storage is full or blocked'); } }

let S = load(), foodDate = today(), sessionOpen = false, restEnd = 0, restTotal = 90, weightRange = 30;

const unit = () => S.settings.units;
const kgToU = kg => unit() === 'lb' ? kg * 2.20462 : kg;
const uToKg = v => unit() === 'lb' ? v / 2.20462 : v;
const step = () => unit() === 'lb' ? 5 : 2.5;

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- derived data ---------- */
function totals(date) {
  return (S.food[date] || []).reduce((t, f) => ({ kcal: t.kcal + +f.kcal, p: t.p + +f.p, c: t.c + +f.c, f: t.f + +f.f }), { kcal: 0, p: 0, c: 0, f: 0 });
}
function weekStart(d = today()) { const x = new Date(d + 'T12:00'); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return iso(x); }
function sortedWorkouts() { return [...S.workouts].sort((a, b) => b.end - a.end); }
function nextDay() { const last = sortedWorkouts()[0]; return last ? last.day % 3 + 1 : 1; }
function volume(w) { return w.exercises.reduce((v, e) => v + e.sets.filter(s => s.kind === 's').reduce((a, s) => a + (+s.weight || 0) * (+s.reps || 0), 0), 0); }
function weekCardio() { const ws = weekStart(); return S.cardio.filter(c => c.date >= ws).reduce((a, c) => a + +c.minutes, 0); }

// Exponentially smoothed trend weight (same idea MacroFactor uses to filter daily water-weight noise).
function trendSeries() {
  let t = null;
  return [...S.weights].sort((a, b) => a.date < b.date ? -1 : 1).map(x => { t = t == null ? x.kg : t + 0.1 * (x.kg - t); return { ...x, trend: t }; });
}
function trendChange(ser, days) {
  if (ser.length < 2) return null;
  const last = ser.at(-1), cutoff = addDays(last.date, -days);
  const prev = [...ser].reverse().find(p => p.date <= cutoff);
  return prev ? kgToU(last.trend - prev.trend) : null;
}

function lastFor(name) {
  for (const w of sortedWorkouts()) {
    const ex = w.exercises.find(e => e.name === name);
    const sets = ex ? ex.sets.filter(s => s.kind === 's') : [];
    if (sets.length) return { date: w.date, sets };
  }
  return null;
}
// Double progression: hit the top of the rep range on every set with ≥2 RIR → add weight.
function suggestion(ex) {
  const last = lastFor(ex.name);
  if (!last) return { text: `First time — pick a weight you can do for ${ex.reps[0]}–${ex.reps[1]} reps with 2–3 left in the tank.`, weight: '' };
  const top = Math.max(...last.sets.map(s => +s.weight || 0));
  const allTop = last.sets.length >= ex.n && last.sets.every(s => +s.reps >= ex.reps[1] && (s.rir === '' || +s.rir >= 2));
  if (allTop && top) return { text: `You hit ${ex.reps[1]} reps on every set last time — go up to ${r1(top + step())} ${unit()}.`, weight: String(r1(top + step())), up: true };
  return { text: top ? `Stay at ${top} ${unit()} and beat last time's reps.` : 'Beat last time.', weight: top ? String(top) : '' };
}

/* ---------- small components ---------- */
function ring(val, target) {
  const r = 52, C = 2 * Math.PI * r, pct = target ? Math.min(val / target, 1) : 0;
  return `<svg viewBox="0 0 120 120" class="ring" aria-hidden="true"><circle cx="60" cy="60" r="${r}" class="ring-bg"/><circle cx="60" cy="60" r="${r}" class="ring-fg ${val > target * 1.05 ? 'over' : ''}" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>`;
}
function bar(label, cls, val, target, u = 'g') {
  return `<div class="macro ${cls}"><div class="macro-top"><span>${label}</span><span><b>${fmt(val)}</b> / ${fmt(target)}${u}</span></div><div class="track"><i style="width:${target ? Math.min(val / target * 100, 100) : 0}%"></i></div></div>`;
}
function weightChart(days, mini = false) {
  const ser = trendSeries();
  if (!ser.length) return `<div class="chart-empty">Log your first weigh-in to start your trend</div>`;
  const end = today(), start = days ? addDays(end, -(days - 1)) : ser[0].date;
  const pts = ser.filter(p => p.date >= start);
  if (!pts.length) return `<div class="chart-empty">No weigh-ins in this range</div>`;
  const W = 340, H = mini ? 80 : 170, px = mini ? 4 : 34, py = 12, span = Math.max(daysBetween(start, end), 1);
  const vals = pts.flatMap(p => [kgToU(p.kg), kgToU(p.trend)]);
  let lo = Math.min(...vals), hi = Math.max(...vals);
  if (hi - lo < 2) { const m = (hi + lo) / 2; lo = m - 1; hi = m + 1; }
  const X = d => px + daysBetween(start, d) / span * (W - px - 6);
  const Y = v => py + (1 - (v - lo) / (hi - lo)) * (H - 2 * py);
  const line = pts.map(p => `${X(p.date).toFixed(1)},${Y(kgToU(p.trend)).toFixed(1)}`).join(' ');
  const dots = pts.map(p => `<circle class="dot" cx="${X(p.date).toFixed(1)}" cy="${Y(kgToU(p.kg)).toFixed(1)}" r="${mini ? 2 : 3.2}"/>`).join('');
  const grid = mini ? '' : [hi, (hi + lo) / 2, lo].map(v => `<line class="grid" x1="${px}" x2="${W}" y1="${Y(v)}" y2="${Y(v)}"/><text class="axis" x="0" y="${Y(v) + 3}">${r1(v)}</text>`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Weight trend chart">${grid}${dots}${pts.length > 1 ? `<polyline class="trend" points="${line}"/>` : ''}</svg>`;
}
function signed(v, u) { if (v == null) return '—'; const s = r1(v); return `<span class="${s > 0 ? 'up' : s < 0 ? 'down' : ''}">${s > 0 ? '+' : ''}${s}</span><small> ${u}</small>`; }

/* ---------- views ---------- */
const VIEWS = {};

VIEWS.today = () => {
  const s = S.settings, t = totals(today()), left = s.kcal - t.kcal;
  const nd = S.active ? S.active.day : nextDay(), p = PROGRAM[nd - 1], ws = weekStart();
  const doneDates = new Set(S.workouts.map(w => w.date));
  const weekW = S.workouts.filter(w => w.date >= ws).length, cardio = weekCardio();
  const ser = trendSeries(), last = ser.at(-1), wk = trendChange(ser, 7);
  const dots = [...Array(7)].map((_, i) => { const d = addDays(ws, i); return `<span class="${doneDates.has(d) ? 'hit' : ''} ${d === today() ? 'now' : ''}"><i></i>${'MTWTFSS'[i]}</span>`; }).join('');
  return `
  <header class="page-head"><p class="kicker">${prettyDate(today())}</p><h1>Today</h1></header>
  <a class="card" href="#food">
    <div class="card-head"><h2>Nutrition</h2><span class="chev">›</span></div>
    <div class="nutri-body">
      <div class="ring-wrap">${ring(t.kcal, s.kcal)}<div class="ring-label"><b>${fmt(Math.abs(left))}</b><span>${left >= 0 ? 'kcal left' : 'kcal over'}</span></div></div>
      <div class="macros">${bar('Protein', 'pro', t.p, s.protein)}${bar('Fat', 'fat', t.f, s.fat)}${bar('Carbs', 'carb', t.c, s.carbs)}</div>
    </div>
    <p class="foot">${fmt(t.kcal)} of ${fmt(s.kcal)} kcal eaten · protein goal ${s.protein} g</p>
  </a>
  <section class="card">
    <div class="card-head"><h2>${S.active ? 'Workout in progress' : 'Next workout'}</h2><span class="muted small">${weekW}/3 this week</span></div>
    <div class="week-dots">${dots}</div>
    <p class="big">Day ${nd} <span>· ${p.focus}</span></p>
    <p class="muted small" style="margin-top:4px">${p.exercises.map(e => esc(e.name)).join(' · ')}</p>
    <button class="btn block" data-act="${S.active ? 'resume' : 'start'}" data-day="${nd}">${S.active ? 'Resume workout' : `Start Day ${nd}`}</button>
  </section>
  <section class="card">
    <div class="card-head"><h2>Weight trend</h2><a class="chev" href="#weight" aria-label="Open weight">›</a></div>
    ${last ? `<div class="trend-big"><b>${r1(kgToU(last.trend))}</b><span class="muted">${unit()} · ${signed(wk, unit() + ' this week')}</span></div>` : ''}
    ${weightChart(30, true)}
    <form data-form="weight" class="inline" style="margin-top:14px">
      <input class="inline-input" name="w" type="number" step="0.1" inputmode="decimal" placeholder="Today's weight (${unit()})" value="${S.weights.find(w => w.date === today()) ? r1(kgToU(S.weights.find(w => w.date === today()).kg)) : ''}">
      <button class="btn small" type="submit">Log</button>
    </form>
  </section>
  <section class="card">
    <div class="card-head"><h2>Cardio this week</h2><span class="muted small">goal ${s.cardioGoal} min</span></div>
    ${bar('Moderate-intensity minutes', 'cardio', cardio, s.cardioGoal, ' min')}
    <p class="hint" style="margin-top:10px">Plan: build toward 150 min/week at 97–135 bpm — brisk walks, incline treadmill, post-lift cardio.</p>
  </section>`;
};

VIEWS.food = () => {
  const s = S.settings, t = totals(foodDate), list = S.food[foodDate] || [];
  const cell = (label, cls, v, tg, u) => `<div class="${cls}"><b>${fmt(v)}</b><span>${label} / ${fmt(tg)}${u}</span><div class="track"><i style="width:${tg ? Math.min(v / tg * 100, 100) : 0}%"></i></div></div>`;
  const meals = MEALS.map(m => {
    const items = list.filter(f => f.meal === m), kc = items.reduce((a, f) => a + +f.kcal, 0);
    return `<section class="card">
      <div class="meal-head"><h3>${m}${kc ? `<span class="muted">${fmt(kc)} kcal</span>` : ''}</h3><button class="add-btn" data-act="addfood" data-meal="${m}" aria-label="Add to ${m}">+</button></div>
      ${items.map(f => `<div class="entry"><div class="name"><b>${esc(f.name)}</b><small>${f.servings && f.servings != 1 ? `${f.servings} servings · ` : ''}<span class="m-dot pro"></span>${r1(f.p)}P<span class="m-dot fat"></span>${r1(f.f)}F<span class="m-dot carb"></span>${r1(f.c)}C</small></div><span class="kcal">${fmt(f.kcal)}</span><button class="del" data-act="delfood" data-id="${f.id}" aria-label="Delete ${esc(f.name)}">✕</button></div>`).join('')}
    </section>`;
  }).join('');
  const prev = S.food[addDays(foodDate, -1)] || [];
  return `
  <header class="page-head row">
    <div><p class="kicker">Food log</p><h1>${foodDate === today() ? 'Today' : prettyDate(foodDate, { weekday: 'short', month: 'short', day: 'numeric' })}</h1></div>
    <div class="date-nav"><button data-act="fdate" data-d="-1" aria-label="Previous day">‹</button><button data-act="fdate" data-d="1" aria-label="Next day" ${foodDate >= today() ? 'disabled' : ''}>›</button></div>
  </header>
  <section class="card"><div class="sum4">
    ${cell('kcal', '', t.kcal, s.kcal, '')}${cell('protein', 'pro', t.p, s.protein, 'g')}${cell('fat', 'fat', t.f, s.fat, 'g')}${cell('carbs', 'carb', t.c, s.carbs, 'g')}
  </div></section>
  ${meals}
  ${!list.length && prev.length ? `<button class="btn ghost block" data-act="copyprev">Copy ${prev.length} items from the day before</button>` : ''}
  <button class="fab" data-act="addfood">+ Add food</button>`;
};

VIEWS.train = () => {
  const nd = nextDay(), ws = weekStart(), weekW = S.workouts.filter(w => w.date >= ws).length, s = S.settings;
  const hist = sortedWorkouts().slice(0, 30).map(w => `
    <details class="hist"><summary><div><b>Day ${w.day} · ${PROGRAM[w.day - 1].focus}</b><span class="muted small">${shortDate(w.date)} · ${Math.max(1, Math.round((w.end - w.start) / 60000))} min${w.cardio ? ` · ${w.cardio} min cardio` : ''}</span></div><span class="pill">${fmt(volume(w))} ${unit()}</span></summary>
      <div class="sets">${w.exercises.filter(e => e.sets.length).map(e => `<p><b>${esc(e.name)}</b> — ${e.sets.filter(x => x.kind === 's').map(x => `${x.weight || 0}×${x.reps || 0}${x.rir !== '' ? ` @${x.rir}` : ''}`).join(', ')}</p>`).join('')}
      ${w.notes ? `<p>📝 ${esc(w.notes)}</p>` : ''}<button class="link danger" data-act="delworkout" data-id="${w.id}">Delete workout</button></div>
    </details>`).join('');
  return `
  <header class="page-head"><p class="kicker">3 full-body days / week</p><h1>Training</h1></header>
  <section class="card">
    <div class="card-head"><h2>${S.active ? 'In progress' : 'Up next'}</h2><span class="muted small">${weekW}/3 this week</span></div>
    <p class="big">Day ${S.active ? S.active.day : nd} <span>· ${PROGRAM[(S.active ? S.active.day : nd) - 1].focus}</span></p>
    <button class="btn block" data-act="${S.active ? 'resume' : 'start'}" data-day="${nd}">${S.active ? 'Resume workout' : `Start Day ${nd}`}</button>
  </section>
  <section class="card">
    <div class="card-head"><h2>Cardio</h2><span class="muted small">${weekCardio()} / ${s.cardioGoal} min this week</span></div>
    ${bar('This week', 'cardio', weekCardio(), s.cardioGoal, ' min')}
    <form data-form="cardio" class="inline" style="margin-top:14px">
      <input class="inline-input" name="minutes" type="number" min="1" inputmode="numeric" placeholder="Minutes">
      <select class="inline-input" name="type" style="flex:1.2"><option>Incline walk</option><option>Brisk walk</option><option>Elliptical</option><option>Rowing</option><option>Cycling</option><option>Jogging</option><option>Other</option></select>
      <button class="btn small" type="submit">Log</button>
    </form>
  </section>
  <h2 class="section-title">Program</h2>
  ${PROGRAM.map(p => `<section class="card">
    <div class="card-head"><h2>Day ${p.day} <span class="muted">· ${p.focus}</span></h2><button class="btn small ghost" data-act="start" data-day="${p.day}">Start</button></div>
    <ul class="ex-list">${p.exercises.map(e => `<li>${esc(e.name)}<span>${e.warm}W + ${e.n} × ${e.reps[0]}–${e.reps[1]}</span></li>`).join('')}</ul>
    <p class="hint" style="margin:10px 0 0">5 min warm-up cardio · working sets at 2–3 RIR · rest 60–90 s · 20 min cardio after</p>
  </section>`).join('')}
  <h2 class="section-title">History</h2>
  <section class="card">${hist || '<p class="empty">Finished workouts show up here.</p>'}</section>`;
};

VIEWS.weight = () => {
  const ser = trendSeries(), last = ser.at(-1), todayW = S.weights.find(w => w.date === today());
  const list = [...ser].reverse().slice(0, 60);
  return `
  <header class="page-head"><p class="kicker">Scale weight & trend</p><h1>Weight</h1></header>
  <section class="card">
    <div class="card-head"><div class="trend-big" style="margin:0">${last ? `<b>${r1(kgToU(last.trend))}</b><span class="muted">${unit()} trend</span>` : '<span class="muted">No data yet</span>'}</div>
      <div class="seg">${[[30, '1M'], [90, '3M'], [0, 'All']].map(([d, l]) => `<button class="${weightRange === d ? 'on' : ''}" data-act="wrange" data-d="${d}">${l}</button>`).join('')}</div></div>
    ${weightChart(weightRange)}
    <div class="stats">
      <div><b>${signed(trendChange(ser, 7), '')}</b><span>7-day change</span></div>
      <div><b>${signed(trendChange(ser, 30), '')}</b><span>30-day change</span></div>
      <div><b>${last ? r1(kgToU(last.kg)) : '—'}</b><span>Last weigh-in</span></div>
    </div>
    <p class="hint" style="margin-top:12px">Dots are daily scale weights; the line is your smoothed trend. Weigh in each morning — the trend ignores day-to-day water swings. For lean gain, a slow upward trend is the goal.</p>
  </section>
  <section class="card">
    <form data-form="weight">
      <div class="grid2"><label class="field"><span>Weight (${unit()})</span><input name="w" type="number" step="0.1" inputmode="decimal" required value="${todayW ? r1(kgToU(todayW.kg)) : ''}"></label>
      <label class="field"><span>Date</span><input name="date" type="date" value="${today()}" max="${today()}"></label></div>
      <button class="btn block" type="submit" style="margin-top:4px">Save weigh-in</button>
    </form>
  </section>
  ${list.length ? `<section class="card">${list.map(p => `<div class="list-row"><span>${prettyDate(p.date, { weekday: 'short', month: 'short', day: 'numeric' })}</span><span><b>${r1(kgToU(p.kg))}</b> <span class="muted small">trend ${r1(kgToU(p.trend))}</span><button class="del" data-act="delweight" data-date="${p.date}" aria-label="Delete">✕</button></span></div>`).join('')}</section>` : ''}`;
};

VIEWS.more = () => {
  const s = S.settings, macroKcal = s.protein * 4 + s.fat * 9 + s.carbs * 4;
  return `
  <header class="page-head"><p class="kicker">Targets & settings</p><h1>Plan</h1></header>
  <section class="card">
    <div class="card-head"><h2>Daily targets</h2></div>
    <div class="setting-row"><label for="s-act">Activity level<small>Sets calories from your plan</small></label><select id="s-act" data-setting="activity">${ACTIVITY.map(([k, l, kc]) => `<option value="${k}" ${s.activity === k ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
    <div class="setting-row"><label for="s-kcal">Calories<small>~250 kcal surplus for muscle gain</small></label><input id="s-kcal" type="number" data-setting="kcal" value="${s.kcal}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-p">Protein (g)<small>Plan range 93–128 g · 20–25 g per meal</small></label><input id="s-p" type="number" data-setting="protein" value="${s.protein}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-f">Fat (g)<small>Not set by the plan — editable</small></label><input id="s-f" type="number" data-setting="fat" value="${s.fat}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-c">Carbs (g)<small>Auto-fills the rest of your calories</small></label><input id="s-c" type="number" data-setting="carbs" value="${s.carbs}" inputmode="numeric"></div>
    <p class="hint" style="margin-top:8px">Macros add up to ${fmt(macroKcal)} kcal${Math.abs(macroKcal - s.kcal) > 25 ? ` — ${fmt(Math.abs(macroKcal - s.kcal))} ${macroKcal > s.kcal ? 'over' : 'under'} your calorie target` : ''}.</p>
  </section>
  <section class="card">
    <div class="card-head"><h2>Training</h2></div>
    <div class="setting-row"><label>Units<small>Body weight & lifts</small></label><div class="seg">${['lb', 'kg'].map(x => `<button class="${s.units === x ? 'on' : ''}" data-act="units" data-u="${x}">${x}</button>`).join('')}</div></div>
    <div class="setting-row"><label for="s-rest">Rest timer (sec)<small>Plan: 60–90 s</small></label><input id="s-rest" type="number" data-setting="rest" value="${s.rest}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-cg">Weekly cardio goal (min)<small>AHA: 150 min moderate</small></label><input id="s-cg" type="number" data-setting="cardioGoal" value="${s.cardioGoal}" inputmode="numeric"></div>
  </section>
  ${S.foods.length ? `<section class="card"><div class="card-head"><h2>My Foods</h2><span class="muted small">${S.foods.length}</span></div>${[...S.foods].sort((a, b) => a.name.localeCompare(b.name)).map(f => `<div class="list-row"><span>${esc(f.name)}<br><small class="muted">${fmt(f.kcal)} kcal · ${r1(f.p)}P ${r1(f.f)}F ${r1(f.c)}C</small></span><button class="del" data-act="delsaved" data-id="${f.id}" aria-label="Remove">✕</button></div>`).join('')}</section>` : ''}
  <section class="card">
    <div class="card-head"><h2>Your data</h2></div>
    <p class="hint">Everything is stored on this device only. Export a backup now and then.</p>
    <div class="btn-row"><button class="btn small ghost" data-act="export">Export backup</button><label class="btn small ghost">Import backup<input id="import-file" type="file" accept="application/json" hidden></label><button class="btn small ghost" data-act="reset" style="color:var(--bad)">Reset all</button></div>
  </section>
  <section class="card note">
    <div class="card-head"><h2>About your plan</h2></div>
    <p>Built from your wellness plan by Alex Alvarez, ATC. Goal: build muscle and strength with a sustainable diet — no yo-yo dieting.</p>
    <p>Calories are a slight surplus (~250 kcal). Protein 1.6–2.2 g/kg body weight. Training is 3 full-body days per week, each set taken to 2–3 reps in reserve, with 5 min of cardio before and 20 min after.</p>
    <p>The plan advises checking with a physician before changing diet or exercise.</p>
  </section>`;
};

/* ---------- routing ---------- */
const TABS = ['today', 'food', 'train', 'weight', 'more'];
function route(keepScroll) {
  const h = location.hash.slice(1), tab = TABS.includes(h) ? h : 'today';
  const y = window.scrollY;
  $$('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  $('#view').innerHTML = VIEWS[tab]();
  window.scrollTo(0, keepScroll ? y : 0);
  $('#resume').hidden = !S.active || sessionOpen;
}
window.addEventListener('hashchange', () => route());

/* ---------- workout session ---------- */
function startWorkout(day) {
  if (S.active && !confirm('You already have a workout in progress. Replace it?')) return;
  const p = PROGRAM[day - 1];
  S.active = {
    id: uid(), day, start: Date.now(), warmup: false, cardio: '', notes: '',
    exercises: p.exercises.map(e => {
      const sg = suggestion(e), last = lastFor(e.name);
      return {
        name: e.name, n: e.n, reps: e.reps, suggest: sg.text, up: !!sg.up,
        lastText: last ? `Last time (${shortDate(last.date)}): ${last.sets.map(s => `${s.weight || 0}×${s.reps || 0}`).join(', ')}` : '',
        sets: [...Array(e.warm)].map(() => ({ kind: 'w', weight: '', reps: '', rir: '', done: false }))
          .concat([...Array(e.n)].map((_, i) => ({ kind: 's', weight: sg.weight, reps: '', rir: '', done: false, ph: last?.sets[i]?.reps || '' })))
      };
    })
  };
  save(); openSession();
}
function openSession() { sessionOpen = true; renderSession(); $('#session').hidden = false; document.body.classList.add('locked'); $('#resume').hidden = true; }
function closeSession() { sessionOpen = false; $('#session').hidden = true; document.body.classList.remove('locked'); route(true); }

function setRow(i, j) {
  const ex = S.active.exercises[i], s = ex.sets[j];
  const base = +ex.sets.find(x => x.kind === 's')?.weight || 0;
  let label, phW = '—', phR, phRir = '—';
  if (s.kind === 'w') {
    const warms = ex.sets.filter(x => x.kind === 'w'), wi = warms.indexOf(s) + 1;
    const pct = warms.length === 1 ? 0.6 : [0.5, 0.75, 0.85][wi - 1] ?? 0.85;
    label = 'W' + wi;
    if (base) phW = String(Math.round(base * pct / step()) * step());
    phR = wi === 1 ? '10' : '5';
  } else {
    label = String(ex.sets.filter(x => x.kind === 's').indexOf(s) + 1);
    phR = s.ph || `${ex.reps[0]}-${ex.reps[1]}`; phRir = '2-3';
  }
  return `<div class="set-row ${s.kind === 'w' ? 'is-warm' : ''} ${s.done ? 'done' : ''}" data-ex="${i}" data-set="${j}">
    <span class="set-tag">${label}</span>
    <input aria-label="Weight" inputmode="decimal" data-k="weight" value="${esc(s.weight)}" placeholder="${esc(phW)}">
    <input aria-label="Reps" inputmode="numeric" data-k="reps" value="${esc(s.reps)}" placeholder="${esc(phR)}">
    <input aria-label="Reps in reserve" inputmode="numeric" data-k="rir" value="${esc(s.rir)}" placeholder="${phRir}">
    <button class="tick" data-act="tick" aria-label="Mark set done">✓</button></div>`;
}
function renderSession() {
  const a = S.active, p = PROGRAM[a.day - 1], sc = $('#session').scrollTop;
  $('#session').innerHTML = `<div class="session-inner">
    <header class="session-head"><button class="icon-btn" data-act="minimize" aria-label="Minimize">⌄</button>
      <div style="text-align:center"><p class="kicker" style="margin:0">Day ${a.day} · ${p.focus}</p><h2 id="elapsed">0:00</h2></div>
      <button class="btn small" data-act="finish">Finish</button></header>
    <section class="card"><label class="check"><input type="checkbox" data-field="warmup" ${a.warmup ? 'checked' : ''}> 5 min warm-up cardio</label>
      <p class="hint" style="margin:6px 0 0 32px">97–135 bpm · jog, elliptical, row, or incline walk at 10–15%</p></section>
    ${a.exercises.map((ex, i) => `<section class="card">
      <div class="ex-head"><h3>${esc(ex.name)}</h3><span class="pill">${ex.n} × ${ex.reps[0]}–${ex.reps[1]} · RIR 2–3</span></div>
      ${ex.lastText ? `<p class="last">${esc(ex.lastText)}</p>` : ''}
      <p class="suggest ${ex.up ? 'up' : ''}">${ex.up ? '↑ ' : ''}${esc(ex.suggest)}</p>
      <div class="set-grid"><span>Set</span><span>${unit()}</span><span>Reps</span><span>RIR</span><span></span></div>
      ${ex.sets.map((_, j) => setRow(i, j)).join('')}
      <button class="link" data-act="addset" data-ex="${i}">+ Add set</button>
    </section>`).join('')}
    <section class="card">
      <label class="field"><span>Post-lift cardio (minutes)</span><input type="number" inputmode="numeric" data-field="cardio" value="${esc(a.cardio)}" placeholder="20"></label>
      <p class="hint" style="margin:0">Moderate intensity — incline treadmill walk. Counts toward your weekly cardio goal.</p>
    </section>
    <section class="card"><label class="field" style="margin:0"><span>Notes</span><textarea data-field="notes" placeholder="How did it feel? Machine settings, seat heights…">${esc(a.notes)}</textarea></label></section>
    <button class="btn block" data-act="finish">Finish workout</button>
    <div style="text-align:center"><button class="link danger" data-act="discard">Discard workout</button></div>
  </div>`;
  $('#session').scrollTop = sc;
  tickElapsed();
}
function tickElapsed() {
  if (!sessionOpen || !S.active) return;
  const s = Math.floor((Date.now() - S.active.start) / 1000), el = $('#elapsed');
  if (el) el.textContent = s >= 3600 ? `${Math.floor(s / 3600)}:${pad(Math.floor(s % 3600 / 60))}:${pad(s % 60)}` : mmss(s);
}
function finishWorkout() {
  const a = S.active;
  if (!a.exercises.some(e => e.sets.some(s => s.done)) && !confirm('No sets are checked off. Finish anyway?')) return;
  const w = {
    id: a.id, day: a.day, date: iso(a.start), start: a.start, end: Date.now(), warmup: a.warmup, cardio: +a.cardio || 0, notes: a.notes,
    exercises: a.exercises.map(e => ({ name: e.name, reps: e.reps, sets: e.sets.filter(s => s.done).map(({ kind, weight, reps, rir }) => ({ kind, weight, reps, rir })) }))
  };
  S.workouts.push(w);
  if (w.cardio > 0) S.cardio.push({ id: uid(), date: w.date, minutes: w.cardio, type: 'Post-lift cardio', workout: w.id });
  S.active = null; save(); stopRest();
  location.hash = '#train'; closeSession();
  toast(`Day ${w.day} logged · ${fmt(volume(w))} ${unit()} total volume`);
}

/* ---------- rest timer ---------- */
function startRest(sec = +S.settings.rest || 90) { restTotal = sec; restEnd = Date.now() + sec * 1000; $('#rest').hidden = false; updateRest(); }
function stopRest() { restEnd = 0; $('#rest').hidden = true; }
function updateRest() {
  if (!restEnd) return;
  const left = Math.max(0, Math.ceil((restEnd - Date.now()) / 1000));
  $('#rest-time').textContent = mmss(left);
  $('#rest-bar').style.width = (left / restTotal * 100) + '%';
  $('#rest-label').textContent = left ? 'Rest' : 'Rest done — next set';
  if (!left) { restEnd = 0; navigator.vibrate?.([200, 100, 200]); setTimeout(() => { if (!restEnd) $('#rest').hidden = true; }, 4000); }
}
setInterval(() => { updateRest(); tickElapsed(); }, 250);

/* ---------- food sheet ---------- */
function openFoodSheet(meal) {
  const f = $('#sheet form'); f.reset();
  const h = new Date().getHours();
  f.meal.value = meal || (h < 11 ? 'Breakfast' : h < 15 ? 'Lunch' : h < 21 ? 'Dinner' : 'Snacks');
  $('#chips').innerHTML = [...S.foods].sort((a, b) => (b.used || 0) - (a.used || 0)).slice(0, 15)
    .map(x => `<button type="button" class="chip" data-act="fillfood" data-id="${x.id}">${esc(x.name)}<small>${fmt(x.kcal)}</small></button>`).join('');
  $('#sheet').showModal();
}
function balanceCarbs() { const s = S.settings; s.carbs = Math.max(0, Math.round((s.kcal - s.protein * 4 - s.fat * 9) / 4)); }

/* ---------- events ---------- */
const ACT = {
  start: b => startWorkout(+b.dataset.day),
  resume: () => openSession(),
  minimize: () => closeSession(),
  finish: () => finishWorkout(),
  discard: () => { if (confirm('Discard this workout? Nothing will be saved.')) { S.active = null; save(); stopRest(); closeSession(); } },
  tick: b => {
    const row = b.closest('.set-row'), i = +row.dataset.ex, j = +row.dataset.set, s = S.active.exercises[i].sets[j];
    if (!s.done) {
      const phW = $('[data-k=weight]', row).placeholder, phR = $('[data-k=reps]', row).placeholder;
      if (s.weight === '' && /^[\d.]+$/.test(phW)) s.weight = phW;
      if (s.reps === '' && /^\d+$/.test(phR)) s.reps = phR;
    }
    s.done = !s.done; save();
    row.outerHTML = setRow(i, j);
    if (s.done && s.kind === 's') startRest();
  },
  addset: b => {
    const ex = S.active.exercises[+b.dataset.ex], work = ex.sets.filter(s => s.kind === 's');
    ex.sets.push({ kind: 's', weight: work.at(-1)?.weight || '', reps: '', rir: '', done: false, ph: '' });
    save(); renderSession();
  },
  rest: b => {
    const d = b.dataset.d;
    if (d === 'skip') return stopRest();
    if (!restEnd) return startRest(Math.max(15, +d));
    restEnd = Math.max(Date.now(), restEnd + +d * 1000);
    restTotal = Math.max(restTotal, Math.ceil((restEnd - Date.now()) / 1000)); updateRest();
  },
  addfood: b => openFoodSheet(b.dataset.meal),
  closesheet: () => $('#sheet').close(),
  fillfood: b => {
    const x = S.foods.find(f => f.id === b.dataset.id), f = $('#sheet form'); if (!x) return;
    f.name.value = x.name; f.kcal.value = x.kcal; f.p.value = x.p; f.f.value = x.f; f.c.value = x.c; f.servings.value = 1;
  },
  delfood: b => { S.food[foodDate] = (S.food[foodDate] || []).filter(f => f.id !== b.dataset.id); save(); route(true); },
  copyprev: () => {
    S.food[foodDate] = (S.food[addDays(foodDate, -1)] || []).map(f => ({ ...f, id: uid() }));
    save(); route(true); toast('Copied from the day before');
  },
  fdate: b => { const d = addDays(foodDate, +b.dataset.d); if (d <= today()) { foodDate = d; route(); } },
  delworkout: b => {
    if (!confirm('Delete this workout from your history?')) return;
    S.workouts = S.workouts.filter(w => w.id !== b.dataset.id);
    S.cardio = S.cardio.filter(c => c.workout !== b.dataset.id); save(); route(true);
  },
  wrange: b => { weightRange = +b.dataset.d; route(true); },
  delweight: b => { S.weights = S.weights.filter(w => w.date !== b.dataset.date); save(); route(true); },
  delsaved: b => { S.foods = S.foods.filter(f => f.id !== b.dataset.id); save(); route(true); },
  units: b => { S.settings.units = b.dataset.u; save(); route(true); },
  export: () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `wellness-backup-${today()}.json`;
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },
  reset: () => { if (confirm('Erase all food, weight and workout data on this device?') && confirm('Really erase everything? Export a backup first if unsure.')) { S = defaults(); save(); route(); toast('All data reset'); } }
};

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (b && ACT[b.dataset.act]) { e.preventDefault(); ACT[b.dataset.act](b, e); }
});
$('#sheet').addEventListener('click', e => { if (e.target === $('#sheet')) $('#sheet').close(); });

document.addEventListener('submit', e => {
  const f = e.target, kind = f.dataset.form; if (!kind) return;
  e.preventDefault();
  if (kind === 'food') {
    const d = Object.fromEntries(new FormData(f));
    const p = +d.p || 0, c = +d.c || 0, fat = +d.f || 0, sv = +d.servings || 1;
    const kcal = d.kcal !== '' ? +d.kcal : Math.round(p * 4 + c * 4 + fat * 9);
    if (!d.name.trim() || !(kcal || p || c || fat)) return toast('Add a name and calories or macros');
    (S.food[foodDate] ??= []).push({ id: uid(), name: d.name.trim(), meal: d.meal, servings: sv, kcal: r1(kcal * sv), p: r1(p * sv), c: r1(c * sv), f: r1(fat * sv) });
    if (d.save) {
      const i = S.foods.findIndex(x => x.name.toLowerCase() === d.name.trim().toLowerCase());
      const item = { name: d.name.trim(), kcal, p, c, f: fat, used: Date.now() };
      if (i >= 0) Object.assign(S.foods[i], item); else S.foods.push({ id: uid(), ...item });
    }
    save(); $('#sheet').close(); route(true); toast(`${d.name.trim()} logged`);
  } else if (kind === 'weight') {
    const v = parseFloat(f.w.value); if (!v) return;
    const date = f.date?.value || today(), kg = uToKg(v), i = S.weights.findIndex(x => x.date === date);
    if (i >= 0) S.weights[i].kg = kg; else S.weights.push({ date, kg });
    save(); route(true); toast('Weigh-in saved');
  } else if (kind === 'cardio') {
    const m = parseInt(f.minutes.value, 10); if (!m) return;
    S.cardio.push({ id: uid(), date: today(), minutes: m, type: f.type.value }); save(); route(true); toast(`${m} min ${f.type.value.toLowerCase()} logged`);
  }
});

document.addEventListener('input', e => {
  const t = e.target;
  if (!S.active || !t.closest('#session')) return;
  if (t.dataset.k) {
    const row = t.closest('.set-row'), ex = S.active.exercises[+row.dataset.ex], s = ex.sets[+row.dataset.set];
    const old = s[t.dataset.k]; s[t.dataset.k] = t.value;
    // Changing a working weight carries forward to the following untouched working sets.
    if (t.dataset.k === 'weight' && s.kind === 's') {
      ex.sets.forEach((x, j) => {
        if (j > +row.dataset.set && x.kind === 's' && !x.done && (x.weight === old || x.weight === '')) {
          x.weight = t.value; const inp = $(`.set-row[data-ex="${row.dataset.ex}"][data-set="${j}"] [data-k=weight]`, $('#session')); if (inp) inp.value = t.value;
        }
      });
      // Refresh warm-up weight hints (they're a % of the first working set).
      ex.sets.forEach((x, j) => {
        if (x.kind !== 'w') return;
        const r = $(`.set-row[data-ex="${row.dataset.ex}"][data-set="${j}"]`, $('#session'));
        if (r && !r.contains(document.activeElement)) r.outerHTML = setRow(+row.dataset.ex, j);
      });
    }
  } else if (t.dataset.field) {
    S.active[t.dataset.field] = t.type === 'checkbox' ? t.checked : t.value;
  }
  save();
});

document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.setting) {
    const k = t.dataset.setting, v = k === 'activity' ? t.value : Math.max(0, +t.value || 0);
    S.settings[k] = v;
    if (k === 'activity') S.settings.kcal = ACTIVITY.find(a => a[0] === v)[2];
    if (['activity', 'kcal', 'protein', 'fat'].includes(k)) balanceCarbs();
    save(); route(true); toast('Targets updated');
  }
  if (t.id === 'import-file' && t.files[0]) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const d = JSON.parse(r.result);
        if (!d.settings) throw new Error('bad file');
        S = { ...defaults(), ...d, settings: { ...defaults().settings, ...d.settings } }; save(); route(); toast('Backup restored');
      } catch (err) { toast('That file is not a Wellness backup'); }
    };
    r.readAsText(t.files[0]);
  }
});

route();
if (S.active && location.hash === '#session') openSession();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('service-worker.js').catch(() => {});
