'use strict';
const KEY = 'alex-wellness-v1';

// From "Alexandra Riano Wellness Plan" (Alex Alvarez, ATC), 1st microcycle, 3 full-body days.
// warm = warm-up sets, n = working sets, reps = target range. All working sets at 2-3 RIR, 60-90 s rest.
const PROGRAM = [
  { day: 1, focus: 'Full body A', exercises: [
    { name: 'Hack Squat', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Chest Press', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Neutral Grip Lat Pulldown', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Chest Supported Row', warm: 1, n: 3, reps: [8, 10] },
    { name: 'Leg Extension', warm: 1, n: 3, reps: [10, 12] }] },
  { day: 2, focus: 'Full body B', exercises: [
    { name: '45° Leg Press', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Shoulder Press', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Cable Row', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Pec Fly', warm: 1, n: 3, reps: [8, 12] },
    { name: 'Preacher Curl', warm: 1, n: 3, reps: [8, 12] }] },
  { day: 3, focus: 'Full body C', exercises: [
    { name: 'Machine Hip Abduction', warm: 1, n: 3, reps: [12, 15], alts: ['45° Back Extension', 'Machine Hip Thrust'] },
    { name: 'Incline Chest Press', warm: 2, n: 3, reps: [10, 12] },
    { name: 'Lat Pulldown', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Seated Leg Curl', warm: 2, n: 3, reps: [10, 12] }] }
];
// Plan's calorie targets for muscle gain (~250 kcal surplus) by activity level.
const ACTIVITY = [
  ['sedentary', 'Sedentary', 1524], ['light', 'Light (1-3×/wk)', 1746], ['moderate', 'Moderate (3-5×/wk)', 1860],
  ['intense', 'Intense (6-7×/wk)', 1968], ['very', 'Very intense (daily)', 2190]];
// Home version on Tonal, a cable machine: every move uses the cable arms (handles, rope or ankle strap).
// Same day numbers hit the same areas as the gym days, so the rotation continues whichever place you train.
// Tiers are from Jeff Nippard's lists. Cable Squat is the one exception: no cable quad move is ranked A/S,
// and it is the closest squat pattern Tonal can load. inc = progression jump in lb.
const TONAL = [
  { day: 1, focus: 'Full body A', exercises: [
    { name: 'Cable Squat', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Seated Cable Fly', warm: 1, n: 3, reps: [10, 12], inc: 2 },
    { name: 'Neutral-Grip Cable Pulldown', warm: 1, n: 3, reps: [8, 10] },
    { name: 'Seated Cable Row', warm: 1, n: 3, reps: [8, 10] },
    { name: 'Cable Lateral Raise', warm: 1, n: 3, reps: [12, 15], inc: 2 }] },
  { day: 2, focus: 'Full body B', exercises: [
    { name: 'Cable Romanian Deadlift', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Cable Crossover', warm: 1, n: 3, reps: [10, 12], inc: 2 },
    { name: 'Wide-Grip Cable Row', warm: 1, n: 3, reps: [10, 12] },
    { name: 'Bayesian Cable Curl', warm: 1, n: 3, reps: [10, 12], inc: 2 },
    { name: 'Rope Face Pull', warm: 1, n: 3, reps: [12, 15], inc: 2 }] },
  { day: 3, focus: 'Full body C', exercises: [
    { name: 'Cable Squat', warm: 2, n: 3, reps: [8, 10] },
    { name: 'Wide-Grip Cable Pulldown', warm: 1, n: 3, reps: [8, 10] },
    { name: 'Cable Press-Around', warm: 1, n: 3, reps: [10, 12], inc: 2 },
    { name: 'Overhead Cable Triceps Extension', warm: 1, n: 3, reps: [10, 12], inc: 2 },
    { name: 'Cable Glute Kickback', warm: 1, n: 3, reps: [12, 15], inc: 2 }] }
];
const PLACES = { gym: { label: 'Gym', days: PROGRAM }, tonal: { label: 'Tonal', days: TONAL } };
const daysFor = place => (PLACES[place] || PLACES.gym).days;
const planOf = w => daysFor(w.place)[w.day - 1];
// Swap-in options for exercises that have alts. Picking one in a workout makes it the default next time.
const ALTS = {
  '45° Back Extension': { warm: 1, n: 3, reps: [10, 15] },
  'Machine Hip Thrust': { warm: 2, n: 3, reps: [8, 12] }
};
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

// Start/finish photos from free-exercise-db (public domain, github.com/yuhonas/free-exercise-db), stored in img/.
const FORM = {
  'Hack Squat': { img: 'Hack_Squat', cues: ['Back and shoulders flat against the pads, feet shoulder-width', 'Lower until thighs are just below parallel', 'Drive up through your heels without locking your knees'] },
  'Chest Press': { img: 'Leverage_Chest_Press', cues: ['Set the seat so handles line up with mid-chest', 'Chest up, shoulder blades pinched back', 'Press forward, pause, return slowly without resting the stack'] },
  'Neutral Grip Lat Pulldown': { img: 'V-Bar_Pulldown', cues: ['Palms facing each other, thighs locked under the pad', 'Lean back slightly, chest up', 'Pull elbows down until the handle nearly touches your chest, return slowly'] },
  'Chest Supported Row': { img: 'Lying_T-Bar_Row', cues: ['Upper chest at the top of the pad', 'Pull elbows back close to your sides', 'Squeeze your shoulder blades, lower under control. Keep your chest on the pad'] },
  'Leg Extension': { img: 'Leg_Extensions', cues: ['Pad sits just above your ankles, knees in line with the machine pivot', 'Straighten your legs fully and pause a second', 'Lower slowly back to about 90°'] },
  '45° Leg Press': { img: 'Leg_Press', cues: ['Feet shoulder-width in the middle of the platform', 'Lower until knees reach about 90°, lower back flat on the pad', 'Push through your heels, don\'t lock your knees at the top'] },
  'Shoulder Press': { img: 'Leverage_Shoulder_Press', cues: ['Handles start at shoulder height, chest up', 'Press straight up without arching your lower back', 'Lower back to shoulder height under control'] },
  'Cable Row': { img: 'Seated_Cable_Rows', cues: ['Knees slightly bent, sit tall with chest up', 'Pull the handle to your belly, elbows close to your body', 'Squeeze your back for a second, let your arms extend slowly'] },
  'Pec Fly': { img: 'Butterfly', cues: ['Back flat on the pad, arms roughly parallel to the floor', 'Bring the handles together in a hugging arc', 'Squeeze your chest, then open slowly until you feel a stretch'] },
  'Preacher Curl': { img: 'Machine_Preacher_Curls', cues: ['Backs of your upper arms flat on the pad', 'Curl up. Only your forearms move', 'Lower slowly all the way down'] },
  'Machine Hip Abduction': { img: 'Thigh_Abductor', cues: ['Sit tall with the pads on the outside of your knees', 'Push your knees out as wide as you can and pause a second', 'Return slowly. Lean your torso slightly forward to hit more of your glutes'] },
  '45° Back Extension': { img: 'Hyperextensions_Back_Extensions', cues: ['Set the pad so it sits just below your hip crease', 'Hinge at the hips and lower your chest toward the floor', 'Squeeze your glutes to come up to a straight line. Don\'t arch past it'] },
  'Cable Squat': { tonal: 'Both handles, arms low, handles held at your shoulders', cues: ['Face Tonal, hold a handle at each shoulder with elbows tucked', 'Sit down between your heels until thighs reach parallel, chest tall', 'Drive up through mid-foot. No photo yet: it looks like a goblet squat with a handle in each hand'] },
  'Seated Cable Fly': { img: 'Cable_Crossover', tonal: 'Handles, arms at chest height, sit on the bench facing away', cues: ['Sit tall with arms open and elbows slightly bent (photo shows the standing version)', 'Hug the handles together in front of your chest', 'Open slowly until you feel a deep chest stretch'] },
  'Neutral-Grip Cable Pulldown': { img: 'V-Bar_Pulldown', tonal: 'Handles, arms high, kneel facing Tonal', cues: ['Palms facing each other, lean back slightly', 'Pull your elbows down to your sides until hands reach your upper chest', 'Return slowly to a full stretch overhead'] },
  'Seated Cable Row': { img: 'Seated_Cable_Rows', tonal: 'Handles, arms low, sit facing Tonal', cues: ['Sit tall with knees slightly bent', 'Row the handles to your belly, elbows close to your body', 'Squeeze your back for a second, then reach forward slowly'] },
  'Cable Lateral Raise': { img: 'Standing_Low-Pulley_Deltoid_Raise', tonal: 'One handle, arm low, stand side-on to Tonal', cues: ['Hold the handle with the hand farther from Tonal, cable across your body', 'Raise your arm out to the side, leading with the elbow, to shoulder height', 'Lower slowly. Do all reps, then switch arms'] },
  'Cable Romanian Deadlift': { img: 'Cable_Deadlifts', tonal: 'Both handles, arms low, stand facing Tonal', cues: ['Soft knees, push your hips straight back toward the wall behind you', 'Let the handles travel down your shins until you feel a big hamstring stretch', 'Squeeze your glutes to stand tall. Keep your back flat'] },
  'Cable Crossover': { img: 'Cable_Crossover', tonal: 'Handles, arms high, one step forward from Tonal', cues: ['Stagger your feet and lean slightly forward', 'Sweep the handles down and together in front of your hips', 'Return slowly until your chest is stretched'] },
  'Wide-Grip Cable Row': { img: 'Seated_Cable_Rows', tonal: 'Handles, arms at chest height, sit facing Tonal', cues: ['Palms down, arms wide', 'Row with elbows flared out about 45° toward your upper chest', 'Squeeze your upper back, then reach forward slowly'] },
  'Bayesian Cable Curl': { img: 'Standing_One-Arm_Cable_Curl', tonal: 'One handle, arm low, face away from Tonal', cues: ['Face away and step forward so the cable pulls your arm slightly behind you (photo shows a regular cable curl)', 'Curl up without letting your elbow drift forward', 'Lower slowly to a full stretch. Do all reps, then switch arms'] },
  'Rope Face Pull': { img: 'Face_Pull', tonal: 'Rope, arms at head height, stand facing Tonal', cues: ['Grip the rope with thumbs toward you', 'Pull toward your forehead, spreading the rope apart', 'Squeeze the back of your shoulders, return slowly'] },
  'Wide-Grip Cable Pulldown': { img: 'Wide-Grip_Lat_Pulldown', tonal: 'Handles, arms high and angled wide, kneel facing Tonal', cues: ['Hands wider than your shoulders, lean back slightly', 'Pull the handles to your upper chest, driving elbows down and back', 'Return slowly to a full stretch'] },
  'Cable Press-Around': { img: 'Single-Arm_Cable_Crossover', tonal: 'One handle, arm at chest height, back to Tonal', cues: ['Stand with your back to Tonal, handle at chest level', 'Press forward and across your body past the middle of your chest', 'Return slowly into the stretch. Do all reps, then switch arms'] },
  'Overhead Cable Triceps Extension': { img: 'Cable_Rope_Overhead_Triceps_Extension', tonal: 'Rope, arms low, face away from Tonal', cues: ['Face away with the rope behind your head, elbows pointing up', 'Straighten your arms overhead without moving your elbows', 'Lower slowly into a deep stretch behind your head'] },
  'Cable Glute Kickback': { img: 'One-Legged_Cable_Kickback', tonal: 'Ankle strap, arm low, hold Tonal for balance', cues: ['Strap one ankle and hinge forward slightly', 'Kick the leg straight back, squeezing your glute at the top', 'Return slowly without arching your lower back. Then switch legs'] },
  'Machine Hip Thrust': { img: 'Barbell_Hip_Thrust', cues: ['Upper back on the pad, feet flat about shoulder-width (photo shows the barbell version, same movement)', 'Drive your hips up until your body is straight from shoulders to knees', 'Squeeze your glutes for a second at the top, lower slowly'] },
  'Incline Chest Press': { img: 'Leverage_Incline_Chest_Press', cues: ['Handles start near your upper chest', 'Chest up, shoulder blades pinched back', 'Press up and forward, return slowly'] },
  'Lat Pulldown': { img: 'Wide-Grip_Lat_Pulldown', cues: ['Grip a little wider than shoulders, thighs under the pad', 'Lean back slightly, pull the bar to your upper chest', 'Drive your elbows down and back, return slowly to a full stretch'] },
  'Seated Leg Curl': { img: 'Seated_Leg_Curl', cues: ['Pad just above your heels, thigh pad snug above your knees', 'Curl your heels down and back as far as you can', 'Pause, then return slowly'] }
};
// Muscles worked: [main, also worked]. Keys match the body-map regions below.
const MUSCLES = {
  'Hack Squat': [['quads'], ['glutes', 'adductors']],
  'Chest Press': [['chest'], ['fdelt', 'triceps']],
  'Neutral Grip Lat Pulldown': [['lats'], ['upperback', 'rdelt', 'biceps']],
  'Chest Supported Row': [['upperback'], ['lats', 'rdelt', 'biceps', 'traps']],
  'Leg Extension': [['quads'], []],
  '45° Leg Press': [['quads', 'glutes'], ['adductors']],
  'Shoulder Press': [['fdelt'], ['sdelt', 'triceps']],
  'Cable Row': [['lats', 'upperback'], ['rdelt', 'biceps']],
  'Pec Fly': [['chest'], ['fdelt']],
  'Preacher Curl': [['biceps'], ['forearms']],
  'Machine Hip Abduction': [['glutes'], []],
  '45° Back Extension': [['glutes', 'hams'], ['lowerback']],
  'Cable Squat': [['quads'], ['glutes', 'adductors']],
  'Seated Cable Fly': [['chest'], ['fdelt']],
  'Neutral-Grip Cable Pulldown': [['lats'], ['upperback', 'rdelt', 'biceps']],
  'Seated Cable Row': [['lats', 'upperback'], ['rdelt', 'biceps']],
  'Cable Lateral Raise': [['sdelt'], []],
  'Cable Romanian Deadlift': [['hams', 'glutes'], ['lowerback']],
  'Cable Crossover': [['chest'], ['fdelt']],
  'Wide-Grip Cable Row': [['upperback'], ['rdelt', 'lats', 'biceps']],
  'Bayesian Cable Curl': [['biceps'], ['forearms']],
  'Rope Face Pull': [['rdelt', 'upperback'], ['traps']],
  'Wide-Grip Cable Pulldown': [['lats'], ['upperback', 'biceps']],
  'Cable Press-Around': [['chest'], ['fdelt']],
  'Overhead Cable Triceps Extension': [['triceps'], []],
  'Cable Glute Kickback': [['glutes'], ['hams']],
  'Machine Hip Thrust': [['glutes'], ['hams', 'quads']],
  'Incline Chest Press': [['chest'], ['fdelt', 'triceps']],
  'Lat Pulldown': [['lats'], ['upperback', 'biceps']],
  'Seated Leg Curl': [['hams'], ['calves']]
};
const MUSCLE_NAMES = { quads: 'quads', glutes: 'glutes', adductors: 'inner thighs', chest: 'chest', fdelt: 'front delts', sdelt: 'side delts', rdelt: 'rear delts', triceps: 'triceps', biceps: 'biceps', forearms: 'forearms', lats: 'lats', upperback: 'upper back', traps: 'traps', lowerback: 'lower back', hams: 'hamstrings', calves: 'calves' };
const BODY = 'M80 62 Q60 64 50 90 L42 196 L56 198 L66 134 L68 182 Q65 190 67 198 L64 292 L67 302 L66 382 L70 398 L90 398 L92 302 L97 212 L103 212 L108 302 L110 398 L130 398 L134 382 L133 302 L136 292 L133 198 Q135 190 132 182 L134 134 L144 198 L158 196 L150 90 Q140 64 120 62 Z';
const ARM_FORE = 'M48 144 Q42 170 44 194 L55 194 Q60 168 62 144 Z', ARM_UP = 'M54 100 Q46 120 50 140 L62 140 Q67 120 65 102 Z', SDELT = 'M62 68 Q48 74 48 96 L54 96 Q55 80 66 71 Z';
const FRONT_MAP = { sdelt: SDELT, fdelt: 'M76 70 Q62 72 56 96 L66 98 Q70 82 82 75 Z', chest: 'M98 74 L82 74 Q68 84 68 102 Q78 113 98 109 Z', biceps: ARM_UP, forearms: ARM_FORE,
  abs: 'M87 113 L98 113 L98 178 L89 178 Q85 150 87 113 Z', obliques: 'M84 113 Q72 117 70 134 Q71 162 83 182 L87 178 Q82 150 84 113 Z', quads: 'M69 198 Q61 244 70 290 L92 292 Q96 244 90 204 Z',
  adductors: 'M91 204 Q97 244 93 272 L99 262 L99 206 Z', calves: 'M69 304 Q63 340 71 380 L85 380 Q91 342 90 304 Z' };
const BACK_MAP = { sdelt: SDELT, rdelt: 'M76 70 Q62 72 56 96 L66 98 Q70 82 82 75 Z', traps: 'M100 56 L82 68 Q90 82 100 98 Z', upperback: 'M99 100 L84 74 Q73 82 74 102 Q86 114 99 120 Z',
  lats: 'M73 106 Q64 124 69 160 Q82 152 99 136 L99 124 Q85 118 73 106 Z', triceps: ARM_UP, forearms: ARM_FORE, lowerback: 'M88 142 L99 138 L99 182 L86 184 Q84 162 88 142 Z',
  glutes: 'M68 188 Q63 216 75 228 Q91 232 99 222 L99 190 Z', hams: 'M69 232 Q63 262 71 292 L92 292 Q97 262 96 232 Z', calves: 'M69 304 Q61 332 71 362 L86 364 Q93 332 90 304 Z' };
function bodyMap(main, also, compact) {
  const fig = (set, x) => `<g transform="translate(${x},0)"><path class="b" d="${BODY}"/><ellipse class="b" cx="100" cy="32" rx="18" ry="22"/>${Object.entries(set).map(([k, d]) => {
    const cls = main.includes(k) ? 'm p' : also.includes(k) ? 'm s' : 'm';
    return `<path class="${cls}" d="${d}"/><path class="${cls}" d="${d}" transform="translate(200,0) scale(-1,1)"/>`;
  }).join('')}</g>`;
  return `<svg class="body-map ${compact ? 'compact' : ''}" viewBox="0 0 400 ${compact ? 404 : 424}" role="img" aria-label="Muscles worked: ${main.map(k => MUSCLE_NAMES[k]).join(', ')}">${fig(FRONT_MAP, 0)}${fig(BACK_MAP, 200)}${compact ? '' : '<text x="100" y="420">Front</text><text x="300" y="420">Back</text>'}</svg>`;
}
// The exercise actually used for a program slot (respects a saved swap).
function pick(e) {
  const chosen = S.swaps?.[e.name];
  const spec = chosen && ALTS[chosen] ? { ...ALTS[chosen], name: chosen } : e;
  return { ...spec, slot: e.name, options: e.alts ? [e.name, ...e.alts] : null };
}
const dayExercises = p => p.exercises.map(pick);
function dayMap(p) {
  const main = [...new Set(dayExercises(p).flatMap(e => musclesFor(e.name)[0]))];
  const also = [...new Set(dayExercises(p).flatMap(e => musclesFor(e.name)[1]))].filter(k => !main.includes(k));
  return `<div class="day-map">${bodyMap(main, also, true)}<p class="map-legend"><span><i class="p"></i>${main.map(k => MUSCLE_NAMES[k]).join(', ')}</span>${also.length ? `<span><i class="s"></i>${also.map(k => MUSCLE_NAMES[k]).join(', ')}</span>` : ''}</p></div>`;
}
function musclesFor(name) { return MUSCLES[name] || [[], []]; }
const nippard = name => `https://www.youtube.com/results?search_query=${encodeURIComponent('Jeff Nippard how to ' + name.replace('45° ', ''))}`;

const $ = (s, r = document) => r.querySelector(s);
const icon = n => `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
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
    settings: { place: 'gym', theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', units: 'lb', activity: 'moderate', kcal: 1860, protein: 110, fat: 52, carbs: 238, cardioGoal: 150, rest: 90 },
    food: {}, foods: [], weights: [], workouts: [], cardio: [], active: null, swaps: {}
  };
}
// Old exercise names → current, so history and last-time suggestions carry over.
const RENAMED = { 'Leg Press': '45° Leg Press', 'Leg Curl': 'Seated Leg Curl' };
function migrate(s) {
  [...(s.workouts || []), ...(s.active ? [s.active] : [])].forEach(w => w.exercises.forEach(e => {
    if (RENAMED[e.name]) e.name = RENAMED[e.name];
    if (e.suggest) e.suggest = e.suggest.replace(/ \u2014 (\w)/, (m, c) => '. ' + c.toUpperCase()).replace(/\u2013/g, '-');
  }));
  return s;
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.settings) { const d = defaults(); return migrate({ ...d, ...s, settings: { ...d.settings, ...s.settings } }); }
  } catch (e) { /* fall through */ }
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Could not save. Storage is full or blocked.'); } }

let S = load(), foodDate = today(), foodOnToday = true, sessionOpen = false, restEnd = 0, restTotal = 90, weightRange = 30;

const unit = () => S.settings.units;
// Theme only changes when the button is tapped. Older saves with 'auto' get pinned to whatever showed at the time.
if (S.settings.theme !== 'dark' && S.settings.theme !== 'light') S.settings.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try { if (JSON.parse(localStorage.getItem(KEY))?.settings?.theme !== S.settings.theme) save(); } catch (e) { save(); }
const isDark = () => S.settings.theme === 'dark';
function applyTheme() {
  document.documentElement.dataset.theme = S.settings.theme;
  const dark = isDark();
  $$('meta[name=theme-color]').forEach(m => { m.removeAttribute('media'); m.content = dark ? '#0c0c0e' : '#f2f2f6'; });
}
applyTheme();
const kgToU = kg => unit() === 'lb' ? kg * 2.20462 : kg;
const uToKg = v => unit() === 'lb' ? v / 2.20462 : v;
const step = () => unit() === 'lb' ? 5 : 2.5;
const incFor = ex => ex.inc && unit() === 'lb' ? ex.inc : step();

// In-app confirm. The browser's own confirm pop-up is silently blocked in some in-app browsers and installed web apps.
function ask(message, okLabel = 'OK', danger = false) {
  return new Promise(resolve => {
    const d = $('#ask'); $('#ask-msg').textContent = message;
    const ok = $('#ask-ok'); ok.textContent = okLabel; ok.classList.toggle('danger', danger);
    const onClose = () => { d.removeEventListener('close', onClose); resolve(d.returnValue === 'ok'); };
    d.returnValue = ''; d.addEventListener('close', onClose); d.showModal(); ok.focus();
  });
}
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
  if (!last) return { text: `First time. Pick a weight you can do for ${ex.reps[0]}-${ex.reps[1]} reps with 2-3 left in the tank.`, weight: '' };
  const top = Math.max(...last.sets.map(s => +s.weight || 0));
  const allTop = last.sets.length >= ex.n && last.sets.every(s => +s.reps >= ex.reps[1] && (s.rir === '' || +s.rir >= 2));
  if (allTop && top) return { text: `You hit ${ex.reps[1]} reps on every set last time. Go up to ${r1(top + incFor(ex))} ${unit()}.`, weight: String(r1(top + incFor(ex))), up: true };
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
function signed(v, u) { if (v == null) return '-'; const s = r1(v); return `<span class="${s > 0 ? 'up' : s < 0 ? 'down' : ''}">${s > 0 ? '+' : ''}${s}</span><small> ${u}</small>`; }

// Gym / Tonal picker for where the next workout happens. Remembered between workouts.
function placePicker() {
  return `<div class="seg place-seg" role="group" aria-label="Where are you training?">${Object.entries(PLACES).map(([k, v]) => `<button class="${S.settings.place === k ? 'on' : ''}" data-act="place" data-p="${k}" aria-pressed="${S.settings.place === k}">${v.label}</button>`).join('')}</div>`;
}
// Dumbbell-shaped button that opens a day's workout. With a label it's full width; without, a compact icon.
function dumbbell(day, label, place = S.settings.place) {
  return `<button class="db ${label ? '' : 'mini'}" data-act="start" data-day="${day}" data-place="${place}" aria-label="Open Day ${day} ${PLACES[place].label} workout"><i class="pl"></i><i class="pl s"></i><span class="bar">${label ? esc(label) : ''}</span><i class="pl s"></i><i class="pl"></i></button>`;
}
function formThumb(name, small) {
  const f = FORM[name]; if (!f) return '';
  if (!f.img) return small ? `<span class="thumb sm no-photo" aria-hidden="true">${icon('barbell')}</span>`
    : `<button class="thumb-btn no-photo" data-act="form" data-name="${esc(name)}" aria-label="How to do ${esc(name)}">${icon('barbell')}<span>Form</span></button>`;
  return small ? `<img class="thumb sm" src="img/${f.img}_1.jpg" alt="" loading="lazy">`
    : `<button class="thumb-btn" data-act="form" data-name="${esc(name)}" aria-label="How to do ${esc(name)}"><img class="thumb" src="img/${f.img}_1.jpg" alt="" loading="lazy"><span>Form</span></button>`;
}
function openForm(name) {
  const f = FORM[name]; if (!f) return;
  $('#demo-body').innerHTML = `
    <div class="sheet-head"><h2 id="demo-title">${esc(name)}</h2><button type="button" class="icon-btn" data-act="closedemo" aria-label="Close">${icon('x')}</button></div>
${f.img ? `<div class="demo-anim" aria-label="${esc(name)} movement, start to finish"><img src="img/${f.img}_0.jpg" alt="${esc(name)} start position"><img class="end" src="img/${f.img}_1.jpg" alt="${esc(name)} finish position"></div>
    <div class="demo-frames"><figure><img src="img/${f.img}_0.jpg" alt=""><figcaption>Start</figcaption></figure><figure><img src="img/${f.img}_1.jpg" alt=""><figcaption>Finish</figcaption></figure></div>` : '<p class="hint" style="margin:0 0 4px">No photo for this cable move yet. Follow the setup and tips below.</p>'}
    <div class="map-block">${bodyMap(...musclesFor(name))}<p class="map-legend"><span><i class="p"></i>Main: ${musclesFor(name)[0].map(k => MUSCLE_NAMES[k]).join(', ')}</span>${musclesFor(name)[1].length ? `<span><i class="s"></i>Also: ${musclesFor(name)[1].map(k => MUSCLE_NAMES[k]).join(', ')}</span>` : ''}</p></div>
    ${f.tonal ? `<p class="setup-line"><b>Tonal setup:</b> ${esc(f.tonal)}</p>` : ''}
    <ol class="cues">${f.cues.map(c => `<li>${esc(c)}</li>`).join('')}</ol>
    <a class="btn block ghost" href="${nippard(name)}" target="_blank" rel="noopener">${icon('brand-youtube')}Watch Jeff Nippard on YouTube</a>
    <p class="hint" style="text-align:center;margin-top:10px">Photos: free-exercise-db (public domain)</p>`;
  $('#demo').showModal();
}

/* ---------- views ---------- */
const VIEWS = {};

VIEWS.today = () => {
  const s = S.settings, t = totals(today()), left = s.kcal - t.kcal;
  const nd = S.active ? S.active.day : nextDay(), p = S.active ? planOf(S.active) : daysFor(S.settings.place)[nd - 1], ws = weekStart();
  const doneDates = new Set(S.workouts.map(w => w.date));
  const weekW = S.workouts.filter(w => w.date >= ws).length, cardio = weekCardio();
  const ser = trendSeries(), last = ser.at(-1), wk = trendChange(ser, 7);
  const dots = [...Array(7)].map((_, i) => { const d = addDays(ws, i); return `<span class="${doneDates.has(d) ? 'hit' : ''} ${d === today() ? 'now' : ''}"><i></i>${'MTWTFSS'[i]}</span>`; }).join('');
  return `
  <header class="page-head"><p class="kicker">${prettyDate(today())}</p><h1>Today</h1></header>
  <a class="card" href="#food">
    <div class="card-head"><h2>Nutrition</h2><span class="chev">${icon('chevron-right')}</span></div>
    <div class="nutri-body">
      <div class="ring-wrap">${ring(t.kcal, s.kcal)}<div class="ring-label"><b>${fmt(Math.abs(left))}</b><span>${left >= 0 ? 'kcal left' : 'kcal over'}</span></div></div>
      <div class="macros">${bar('Protein', 'pro', t.p, s.protein)}${bar('Fat', 'fat', t.f, s.fat)}${bar('Carbs', 'carb', t.c, s.carbs)}</div>
    </div>
    <p class="foot">${fmt(t.kcal)} of ${fmt(s.kcal)} kcal eaten</p>
  </a>
  <section class="card">
    <div class="card-head"><h2>${S.active ? 'Workout in progress' : 'Next workout'}</h2><span class="muted small">${weekW}/3 this week</span></div>
    <div class="week-dots">${dots}</div>
    ${S.active ? '' : placePicker()}
    <p class="big">Day ${nd}<span>${S.active ? PLACES[S.active.place || 'gym'].label + ', ' : ''}${p.focus}</span></p>
    <p class="muted small" style="margin-top:4px">${dayExercises(p).map(e => esc(e.name)).join(', ')}</p>
    ${S.active ? '<button class="btn block" data-act="resume">Resume workout</button>' : dumbbell(nd, `Day ${nd}`)}
  </section>
  <section class="card">
    <div class="card-head"><h2>Weight trend</h2><a class="chev" href="#weight" aria-label="Open weight">${icon('chevron-right')}</a></div>
    ${last ? `<div class="trend-big"><b>${r1(kgToU(last.trend))}</b><span class="muted">${unit()}</span><span>${signed(wk, unit() + ' this week')}</span></div>` : ''}
    ${weightChart(30, true)}
    <form data-form="weight" class="inline" style="margin-top:14px">
      <label class="field"><span>Today's weight (${unit()})</span><input name="w" type="number" step="0.1" min="30" max="700" inputmode="decimal" value="${S.weights.find(w => w.date === today()) ? r1(kgToU(S.weights.find(w => w.date === today()).kg)) : ''}"></label>
      <button class="btn small" type="submit">Log</button>
    </form>
  </section>
  <section class="card">
    <div class="card-head"><h2>Cardio this week</h2><span class="muted small">goal ${s.cardioGoal} min</span></div>
    ${bar('Moderate-intensity minutes', 'cardio', cardio, s.cardioGoal, ' min')}
    <p class="hint" style="margin-top:10px">Build toward 150 min a week at 97-135 bpm: brisk walks, incline treadmill, post-lift cardio.</p>
  </section>`;
};

VIEWS.food = () => {
  const s = S.settings, t = totals(foodDate), list = S.food[foodDate] || [];
  const cell = (label, cls, v, tg, u) => `<div class="${cls}"><b>${fmt(v)}</b><span>${label} / ${fmt(tg)}${u}</span><div class="track"><i style="width:${tg ? Math.min(v / tg * 100, 100) : 0}%"></i></div></div>`;
  const meals = MEALS.map(m => {
    const items = list.filter(f => f.meal === m), kc = items.reduce((a, f) => a + +f.kcal, 0);
    return `<section class="card">
      <div class="meal-head"><h3>${m}${kc ? `<span class="muted">${fmt(kc)} kcal</span>` : ''}</h3><button class="add-btn" data-act="addfood" data-meal="${m}" aria-label="Add to ${m}">${icon('plus')}</button></div>
      ${items.map(f => `<div class="entry"><div class="name"><b>${esc(f.name)}</b><small>${f.servings && f.servings != 1 ? `${f.servings} servings, ` : ''}<span class="m-dot pro"></span>${r1(f.p)}P<span class="m-dot fat"></span>${r1(f.f)}F<span class="m-dot carb"></span>${r1(f.c)}C</small></div><span class="kcal">${fmt(f.kcal)}</span><button class="del" data-act="delfood" data-id="${f.id}" aria-label="Delete ${esc(f.name)}">${icon('x')}</button></div>`).join('')}
    </section>`;
  }).join('');
  const prev = S.food[addDays(foodDate, -1)] || [];
  return `
  <header class="page-head row">
    <div><h1>${foodDate === today() ? 'Today' : prettyDate(foodDate, { weekday: 'short', month: 'short', day: 'numeric' })}</h1></div>
    <div class="date-nav"><button data-act="fdate" data-d="-1" aria-label="Previous day">${icon('chevron-left')}</button><button data-act="fdate" data-d="1" aria-label="Next day" ${foodDate >= today() ? 'disabled' : ''}>${icon('chevron-right')}</button></div>
  </header>
  <section class="card"><div class="sum4">
    ${cell('kcal', '', t.kcal, s.kcal, '')}${cell('protein', 'pro', t.p, s.protein, 'g')}${cell('fat', 'fat', t.f, s.fat, 'g')}${cell('carbs', 'carb', t.c, s.carbs, 'g')}
  </div></section>
  ${meals}
  ${!list.length && prev.length ? `<button class="btn ghost block" data-act="copyprev">Copy ${prev.length} items from the day before</button>` : ''}
  <button class="fab" data-act="addfood">${icon('plus')}Add food</button>`;
};

VIEWS.train = () => {
  const nd = nextDay(), ws = weekStart(), weekW = S.workouts.filter(w => w.date >= ws).length, s = S.settings;
  const last = sortedWorkouts()[0];
  return `
  <header class="page-head"><h1>Training</h1></header>
  <section class="card">
    <div class="card-head"><h2>${S.active ? 'In progress' : 'Up next'}</h2><span class="muted small">${weekW}/3 this week</span></div>
    ${S.active ? '' : placePicker()}
    <p class="big">Day ${S.active ? S.active.day : nd}<span>${S.active ? PLACES[S.active.place || 'gym'].label + ', ' + planOf(S.active).focus : daysFor(S.settings.place)[nd - 1].focus}</span></p>
    ${S.active ? '<button class="btn block" data-act="resume">Resume workout</button>' : dumbbell(nd, `Day ${nd}`)}
  </section>
  <section class="card">
    <div class="card-head"><h2>Cardio</h2><span class="muted small">${weekCardio()} / ${s.cardioGoal} min this week</span></div>
    ${bar('This week', 'cardio', weekCardio(), s.cardioGoal, ' min')}
    <form data-form="cardio" class="inline" style="margin-top:14px">
      <label class="field"><span>Minutes</span><input name="minutes" type="number" min="1" inputmode="numeric"></label>
      <label class="field" style="flex:1.3"><span>Type</span><select name="type"><option>Incline walk</option><option>Brisk walk</option><option>Elliptical</option><option>Rowing</option><option>Cycling</option><option>Jogging</option><option>Other</option></select></label>
      <button class="btn small" type="submit">Log</button>
    </form>
  </section>
  <div class="program-head"><h2 class="section-title">${PLACES[S.settings.place].label} program</h2>${placePicker()}</div>
  ${S.settings.place === 'tonal' ? '<p class="hint program-note">Same day numbers as the gym, so you can mix: Day 1 at the gym, Day 2 on Tonal. Moves not in the Tonal library can be done in Free Lift.</p>' : ''}
  ${daysFor(S.settings.place).map(p => `<section class="card">
    <div class="card-head"><h2>Day ${p.day}<span class="muted">${p.focus}</span></h2>${dumbbell(p.day)}</div>
    ${dayMap(p)}
    <ul class="ex-list">${dayExercises(p).map(e => `<li><button class="ex-link" data-act="form" data-name="${esc(e.name)}">${formThumb(e.name, true)}<span class="ex-name"><span class="ex-label">${esc(e.name)}</span>${FORM[e.name]?.tonal && S.settings.place === 'tonal' ? `<small class="alt-note">${esc(FORM[e.name].tonal)}</small>` : ''}${e.options ? `<small class="alt-note">Swap options: ${e.options.filter(o => o !== e.name).map(esc).join(', ')}</small>` : ''}</span></button><span>${e.warm}W + ${e.n} × ${e.reps[0]}-${e.reps[1]}</span></li>`).join('')}</ul>
    <p class="hint" style="margin:10px 0 0">Warm up 5 min. Working sets at 2-3 RIR, 60-90 s rest. ${S.settings.place === 'tonal' ? '20 min brisk walk after if you can.' : '20 min cardio after.'}</p>
  </section>`).join('')}
  <a class="card" href="#history">
    <div class="card-head" style="margin:0"><div><h2>History</h2><p class="muted small">${last ? `Last: Day ${last.day} (${PLACES[last.place || 'gym'].label}), ${shortDate(last.date)}` : 'Finished workouts show up here'}</p></div><span class="chev">${icon('chevron-right')}</span></div>
  </a>`;
};

/* ---------- history ---------- */
let historyMode = 'workouts';
// Per exercise, the heaviest working-set weight seen before each workout (chronological), for PR badges.
function prMap() {
  const best = {}, prs = new Set();
  [...S.workouts].sort((a, b) => a.end - b.end).forEach(w => w.exercises.forEach(e => {
    const top = Math.max(0, ...e.sets.filter(x => x.kind === 's').map(x => +x.weight || 0));
    if (top > 0 && best[e.name] !== undefined && top > best[e.name]) prs.add(w.id + '|' + e.name);
    if (top > 0) best[e.name] = Math.max(best[e.name] || 0, top);
  }));
  return prs;
}
const setChip = x => `<span class="chip-set ${x.kind === 'w' ? 'warm' : ''}">${x.kind === 'w' ? '<i>W</i>' : ''}<b>${esc(x.weight || 0)}</b> × ${esc(x.reps || 0)}${x.kind === 's' && x.rir !== '' && x.rir != null ? `<small>RIR ${esc(x.rir)}</small>` : ''}</span>`;
function workoutCard(w, prs) {
  const done = w.exercises.filter(e => e.sets.length);
  const sets = done.reduce((a, e) => a + e.sets.filter(x => x.kind === 's').length, 0);
  const mins = Math.max(1, Math.round((w.end - w.start) / 60000));
  return `<article class="card hcard">
    <div class="card-head"><div><h2>${prettyDate(w.date, { weekday: 'short', month: 'short', day: 'numeric' })}</h2><p class="muted small">Day ${w.day}: ${planOf(w)?.focus || ''}<span class="place-tag">${PLACES[w.place || 'gym'].label}</span></p></div><span class="muted small">${mins} min</span></div>
    <div class="hstats"><div><b>${fmt(volume(w))}</b><span>${unit()} volume</span></div><div><b>${sets}</b><span>working sets</span></div><div><b>${w.cardio || 0}</b><span>min cardio</span></div></div>
    ${done.length ? done.map(e => `<div class="hex">
      <div class="hex-name">${formThumb(e.name, true)}<b>${esc(e.name)}</b>${prs.has(w.id + '|' + e.name) ? `<span class="pr">${icon('trophy')}PR</span>` : ''}</div>
      <div class="chip-row">${e.sets.map(setChip).join('')}</div></div>`).join('') : '<p class="empty">No sets logged in this workout.</p>'}
    ${w.notes ? `<p class="hnote">${icon('notes')}<span>${esc(w.notes)}</span></p>` : ''}
    <button class="link danger" data-act="delworkout" data-id="${w.id}">Delete workout</button>
  </article>`;
}
function exerciseSummaries() {
  const by = {};
  [...S.workouts].sort((a, b) => a.end - b.end).forEach(w => w.exercises.forEach(e => {
    const work = e.sets.filter(x => x.kind === 's'); if (!work.length) return;
    (by[e.name] ??= []).push({ date: w.date, end: w.end, sets: work, top: Math.max(0, ...work.map(x => +x.weight || 0)) });
  }));
  return Object.entries(by).map(([name, sessions]) => {
    const bestSet = sessions.flatMap(s => s.sets).reduce((b, x) => (+x.weight || 0) > (+b.weight || 0) || ((+x.weight || 0) === (+b.weight || 0) && +x.reps > +b.reps) ? x : b);
    return { name, sessions, bestSet, lastEnd: sessions.at(-1).end };
  }).sort((a, b) => b.lastEnd - a.lastEnd);
}
// Change in top working weight from the first logged session to the latest.
function progress(sessions) {
  if (sessions.length < 2) return `<div class="prog"><span class="muted small">Progress</span><b class="muted">First session</b></div>`;
  const d = r1(sessions.at(-1).top - sessions[0].top);
  return `<div class="prog"><span class="muted small">Since ${shortDate(sessions[0].date)}</span><b class="${d > 0 ? 'up' : d < 0 ? 'down' : 'muted'}">${d > 0 ? '+' : ''}${d === 0 ? 'Same weight' : `${d} ${unit()}`}</b></div>`;
}
VIEWS.history = () => {
  const seg = `<div class="seg hist-seg">${[['workouts', 'Workouts'], ['exercises', 'Exercises']].map(([k, l]) => `<button class="${historyMode === k ? 'on' : ''}" data-act="hmode" data-m="${k}">${l}</button>`).join('')}</div>`;
  if (!S.workouts.length) return `<header class="page-head"><h1>History</h1></header>${seg}
    <section class="card"><p class="empty" style="margin:0">No workouts yet. Finish a workout and every exercise, set and weight shows up here.</p></section>`;
  let body;
  if (historyMode === 'exercises') {
    body = exerciseSummaries().map(x => `<article class="card hcard">
      <div class="hex-name">${formThumb(x.name, true)}<b>${esc(x.name)}</b></div>
      <div class="ex-sum"><div><span class="muted small">Best set</span><b>${esc(x.bestSet.weight || 0)} ${unit()} × ${esc(x.bestSet.reps || 0)}</b></div>${progress(x.sessions)}</div>
      ${[...x.sessions].reverse().slice(0, 6).map(s => `<div class="sess"><span class="muted small">${shortDate(s.date)}</span><div class="chip-row">${s.sets.map(setChip).join('')}</div></div>`).join('')}
    </article>`).join('') || '<section class="card"><p class="empty" style="margin:0">No working sets logged yet.</p></section>';
  } else {
    const prs = prMap(); let month = '';
    body = sortedWorkouts().map(w => {
      const m = prettyDate(w.date, { month: 'long', year: 'numeric' });
      const headr = m !== month ? `<h2 class="section-title">${m}</h2>` : ''; month = m;
      return headr + workoutCard(w, prs);
    }).join('');
  }
  return `<header class="page-head"><h1>History</h1></header>${seg}${body}`;
};

VIEWS.weight = () => {
  const ser = trendSeries(), last = ser.at(-1), todayW = S.weights.find(w => w.date === today());
  const list = [...ser].reverse().slice(0, 60);
  return `
  <header class="page-head"><h1>Weight</h1></header>
  <section class="card">
    <div class="card-head"><div class="trend-big" style="margin:0">${last ? `<b>${r1(kgToU(last.trend))}</b><span class="muted">${unit()} trend</span>` : '<span class="muted">No data yet</span>'}</div>
      <div class="seg">${[[30, '1M'], [90, '3M'], [0, 'All']].map(([d, l]) => `<button class="${weightRange === d ? 'on' : ''}" data-act="wrange" data-d="${d}">${l}</button>`).join('')}</div></div>
    ${weightChart(weightRange)}
    <div class="stats">
      <div><b>${signed(trendChange(ser, 7), '')}</b><span>7-day change</span></div>
      <div><b>${signed(trendChange(ser, 30), '')}</b><span>30-day change</span></div>
      <div><b>${last ? r1(kgToU(last.kg)) : '-'}</b><span>Last weigh-in</span></div>
    </div>
    <p class="hint" style="margin-top:12px">Dots are daily scale weights; the line is your smoothed trend. Weigh in each morning. The trend ignores day-to-day water swings. For lean gain, a slow upward trend is the goal.</p>
  </section>
  <section class="card">
    <form data-form="weight">
      <div class="grid2"><label class="field"><span>Weight (${unit()})</span><input name="w" type="number" step="0.1" min="30" max="700" inputmode="decimal" required value="${todayW ? r1(kgToU(todayW.kg)) : ''}"></label>
      <label class="field"><span>Date</span><input name="date" type="date" value="${today()}" max="${today()}"></label></div>
      <button class="btn block" type="submit" style="margin-top:4px">Save weigh-in</button>
    </form>
  </section>
  ${list.length ? `<section class="card">${list.map(p => `<div class="list-row"><span>${prettyDate(p.date, { weekday: 'short', month: 'short', day: 'numeric' })}</span><span><b>${r1(kgToU(p.kg))}</b> <span class="muted small">trend ${r1(kgToU(p.trend))}</span><button class="del" data-act="delweight" data-date="${p.date}" aria-label="Delete">${icon('x')}</button></span></div>`).join('')}</section>` : ''}`;
};

VIEWS.more = () => {
  const s = S.settings, macroKcal = s.protein * 4 + s.fat * 9 + s.carbs * 4;
  return `
  <header class="page-head"><h1>Plan</h1></header>
  <section class="card">
    <div class="card-head"><h2>Daily targets</h2></div>
    <div class="setting-row"><label for="s-act">Activity level<small>Sets calories from your plan</small></label><select id="s-act" data-setting="activity">${ACTIVITY.map(([k, l, kc]) => `<option value="${k}" ${s.activity === k ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
    <div class="setting-row"><label for="s-kcal">Calories<small>~250 kcal surplus for muscle gain</small></label><input id="s-kcal" type="number" data-setting="kcal" value="${s.kcal}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-p">Protein (g)<small>Plan: 93-128 g, about 20-25 g per meal</small></label><input id="s-p" type="number" data-setting="protein" value="${s.protein}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-f">Fat (g)<small>Not set by the plan</small></label><input id="s-f" type="number" data-setting="fat" value="${s.fat}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-c">Carbs (g)<small>Auto-fills the rest of your calories</small></label><input id="s-c" type="number" data-setting="carbs" value="${s.carbs}" inputmode="numeric"></div>
    <p class="hint" style="margin-top:8px">Macros add up to ${fmt(macroKcal)} kcal${Math.abs(macroKcal - s.kcal) > 25 ? `, ${fmt(Math.abs(macroKcal - s.kcal))} ${macroKcal > s.kcal ? 'over' : 'under'} your calorie target` : ''}.</p>
  </section>
  <section class="card">
    <div class="card-head"><h2>Training</h2></div>
    <div class="setting-row"><label>Units<small>Body weight & lifts</small></label><div class="seg">${['lb', 'kg'].map(x => `<button class="${s.units === x ? 'on' : ''}" data-act="units" data-u="${x}">${x}</button>`).join('')}</div></div>
    <div class="setting-row"><label for="s-rest">Rest timer (sec)<small>Plan: 60-90 s</small></label><input id="s-rest" type="number" data-setting="rest" value="${s.rest}" inputmode="numeric"></div>
    <div class="setting-row"><label for="s-cg">Weekly cardio goal (min)<small>AHA: 150 min moderate</small></label><input id="s-cg" type="number" data-setting="cardioGoal" value="${s.cardioGoal}" inputmode="numeric"></div>
  </section>
  ${S.foods.length ? `<section class="card"><div class="card-head"><h2>My Foods</h2><span class="muted small">${S.foods.length}</span></div>${[...S.foods].sort((a, b) => a.name.localeCompare(b.name)).map(f => `<div class="list-row"><span>${esc(f.name)}<br><small class="muted">${fmt(f.kcal)} kcal, ${r1(f.p)}P ${r1(f.f)}F ${r1(f.c)}C</small></span><button class="del" data-act="delsaved" data-id="${f.id}" aria-label="Remove">${icon('x')}</button></div>`).join('')}</section>` : ''}
  <section class="card">
    <div class="card-head"><h2>Your data</h2></div>
    <p class="hint">Everything is stored on this device only. Export a backup now and then.</p>
    <div class="btn-row"><button class="btn small ghost" data-act="export">Export backup</button><label class="btn small ghost">Import backup<input id="import-file" type="file" accept="application/json" hidden></label><button class="btn small ghost" data-act="reset" style="color:var(--bad)">Reset all</button></div>
  </section>
  <section class="card note">
    <div class="card-head"><h2>About your plan</h2></div>
    <p>Built from your wellness plan by Alex Alvarez, ATC. Goal: build muscle and strength with a sustainable diet and no yo-yo dieting.</p>
    <p>Calories are a slight surplus (~250 kcal). Protein 1.6-2.2 g/kg body weight. Training is 3 full-body days per week, each set taken to 2-3 reps in reserve, with 5 min of cardio before and 20 min after.</p>
    <p>The plan advises checking with a physician before changing diet or exercise.</p>
  </section>`;
};

/* ---------- routing ---------- */
const TABS = ['today', 'food', 'train', 'history', 'weight', 'more'];
function route(keepScroll) {
  const h = location.hash.slice(1), tab = TABS.includes(h) ? h : 'today';
  const y = window.scrollY;
  if (foodOnToday) foodDate = today(); // app left open past midnight
  $$('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  $('#view').innerHTML = `<button class="theme-btn" data-act="theme" aria-label="${isDark() ? 'Switch to light mode' : 'Switch to dark mode'}">${icon(isDark() ? 'sun' : 'moon')}</button>` + VIEWS[tab]();
  window.scrollTo(0, keepScroll ? y : 0);
  $('#resume').hidden = !S.active || sessionOpen;
  document.body.classList.toggle('has-resume', !$('#resume').hidden);
}
window.addEventListener('hashchange', () => route());
document.addEventListener('visibilitychange', () => { if (!document.hidden && !sessionOpen) route(true); });

/* ---------- workout session ---------- */
async function startWorkout(day, place = S.settings.place) {
  if (S.active && !(await ask('You already have a workout in progress. Replace it?', 'Replace', true))) return;
  const p = daysFor(place)[day - 1];
  S.active = {
    id: uid(), day, place, start: Date.now(), warmup: false, cardio: '', notes: '',
    exercises: dayExercises(p).map(buildExercise)
  };
  save(); openSession();
}
function buildExercise(e) {
  const sg = suggestion(e), last = lastFor(e.name);
  return {
    name: e.name, slot: e.slot, options: e.options, n: e.n, reps: e.reps, inc: e.inc, suggest: sg.text, up: !!sg.up,
    lastText: last ? `Last time (${shortDate(last.date)}): ${last.sets.map(s => `${s.weight || 0}×${s.reps || 0}`).join(', ')}` : '',
    sets: [...Array(e.warm)].map(() => ({ kind: 'w', weight: '', reps: '', rir: '', done: false }))
      .concat([...Array(e.n)].map((_, i) => ({ kind: 's', weight: sg.weight, reps: '', rir: '', done: false, ph: last?.sets[i]?.reps || '' })))
  };
}
async function swapExercise(i, name) {
  const ex = S.active.exercises[i];
  if (ex.sets.some(s => s.done) && !(await ask('Swap this exercise? Sets you checked off for it will be cleared.', 'Swap'))) return renderSession();
  const slot = planOf(S.active).exercises.find(e => e.name === ex.slot);
  S.swaps = { ...S.swaps, [slot.name]: name === slot.name ? undefined : name };
  S.active.exercises[i] = buildExercise(pick(slot));
  save(); renderSession(); toast(`Swapped to ${name}`);
}
function openSession() { sessionOpen = true; renderSession(); $('#session').hidden = false; document.body.classList.add('locked'); $('#resume').hidden = true; }
function closeSession() { sessionOpen = false; $('#session').hidden = true; document.body.classList.remove('locked'); route(true); }

function setRow(i, j) {
  const ex = S.active.exercises[i], s = ex.sets[j];
  const base = +ex.sets.find(x => x.kind === 's')?.weight || 0;
  let label, phW = '', phR, phRir = '';
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
    <button class="tick" data-act="tick" aria-label="Mark set done">${icon('check')}</button></div>`;
}
function renderSession() {
  const a = S.active, p = planOf(a), tonal = a.place === 'tonal', sc = $('#session').scrollTop;
  $('#session').innerHTML = `<div class="session-inner">
    <header class="session-head"><button class="icon-btn" data-act="minimize" aria-label="Minimize">${icon('chevron-down')}</button>
      <div style="text-align:center"><h2>Day ${a.day}</h2><p class="kicker" style="margin:0">${PLACES[a.place || 'gym'].label}, ${p.focus}</p></div>
      <button class="btn small" data-act="finish">Finish</button></header>
    <section class="card"><label class="check"><input type="checkbox" data-field="warmup" ${a.warmup ? 'checked' : ''}> 5 min warm-up cardio</label>
      <p class="hint" style="margin:6px 0 0 32px">${tonal ? '97-135 bpm. Brisk walk, jumping jacks or a Tonal warm-up' : '97-135 bpm. Jog, elliptical, row or incline walk (10-15%)'}</p></section>
    ${a.exercises.map((ex, i) => `<section class="card">
      <div class="ex-head">${formThumb(ex.name)}<div class="ex-title"><h3>${esc(ex.name)}</h3><span class="pill">${ex.n} × ${ex.reps[0]}-${ex.reps[1]} @ RIR 2-3</span><span class="muscles">${musclesFor(ex.name)[0].map(k => MUSCLE_NAMES[k]).join(', ')}</span>${tonal && FORM[ex.name]?.tonal ? `<span class="setup">${esc(FORM[ex.name].tonal)}</span>` : ''}</div></div>
      ${ex.options ? `<label class="swap">Swap <select data-swap="${i}">${ex.options.map(o => `<option ${o === ex.name ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>` : ''}
      ${ex.lastText ? `<p class="last">${esc(ex.lastText)}</p>` : ''}
      <p class="suggest ${ex.up ? 'up' : ''}">${ex.up ? icon('arrow-up') : ''}<span>${esc(ex.suggest)}</span></p>
      <div class="set-grid"><span>Set</span><span>${unit()}</span><span>Reps</span><span>RIR</span><span></span></div>
      ${ex.sets.map((_, j) => setRow(i, j)).join('')}
      <button class="link" data-act="addset" data-ex="${i}">Add set</button>
    </section>`).join('')}
    <section class="card">
      <label class="field"><span>Post-lift cardio (minutes)</span><input type="number" inputmode="numeric" data-field="cardio" value="${esc(a.cardio)}" placeholder="20"></label>
      <p class="hint" style="margin:0">Moderate intensity, like an incline treadmill walk. Counts toward your weekly cardio goal.</p>
    </section>
    <section class="card"><label class="field" style="margin:0"><span>Notes</span><textarea data-field="notes" placeholder="How did it feel? Machine settings, seat heights…">${esc(a.notes)}</textarea></label></section>
    <button class="btn block" data-act="finish">Finish workout</button>
    <div style="text-align:center"><button class="link danger" data-act="discard">Discard workout</button></div>
  </div>`;
  $('#session').scrollTop = sc;
}
let finishing = false;
async function finishWorkout() {
  const a = S.active;
  if (!a || finishing) return;
  finishing = true;
  try {
    if (!a.exercises.some(e => e.sets.some(s => s.done)) && !(await ask('No sets are checked off. Finish anyway?', 'Finish'))) return;
    if (S.active !== a) return;
    const w = {
      id: a.id, day: a.day, place: a.place || 'gym', date: iso(a.start), start: a.start, end: Date.now(), warmup: a.warmup, cardio: +a.cardio || 0, notes: a.notes,
      exercises: a.exercises.map(e => ({ name: e.name, reps: e.reps, sets: e.sets.filter(s => s.done).map(({ kind, weight, reps, rir }) => ({ kind, weight, reps, rir })) }))
    };
    S.workouts.push(w);
    if (w.cardio > 0) S.cardio.push({ id: uid(), date: w.date, minutes: w.cardio, type: 'Post-lift cardio', workout: w.id });
    S.active = null; save(); stopRest();
    location.hash = '#train'; closeSession();
    toast(`Day ${w.day} logged. ${fmt(volume(w))} ${unit()} total volume`);
  } finally { finishing = false; }
}

/* ---------- rest timer ---------- */
function startRest(sec = +S.settings.rest || 90) { restTotal = sec; restEnd = Date.now() + sec * 1000; $('#rest').hidden = false; updateRest(); }
function stopRest() { restEnd = 0; $('#rest').hidden = true; }
function updateRest() {
  if (!restEnd) return;
  const left = Math.max(0, Math.ceil((restEnd - Date.now()) / 1000));
  $('#rest-time').textContent = mmss(left);
  $('#rest-bar').style.width = (left / restTotal * 100) + '%';
  $('#rest-label').textContent = left ? 'Rest' : 'Rest done. Next set';
  if (!left) { restEnd = 0; navigator.vibrate?.([200, 100, 200]); setTimeout(() => { if (!restEnd) $('#rest').hidden = true; }, 4000); }
}
setInterval(updateRest, 250);

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
  start: b => startWorkout(+b.dataset.day, b.dataset.place || S.settings.place),
  place: b => { S.settings.place = b.dataset.p; save(); route(true); },
  resume: () => openSession(),
  minimize: () => closeSession(),
  finish: () => finishWorkout(),
  discard: async () => { if (await ask('Discard this workout? Nothing will be saved.', 'Discard', true)) { S.active = null; save(); stopRest(); closeSession(); } },
  tick: b => {
    const row = b.closest('.set-row'), i = +row.dataset.ex, j = +row.dataset.set, s = S.active.exercises[i].sets[j];
    if (!s.done) {
      const phW = $('[data-k=weight]', row).placeholder, phR = $('[data-k=reps]', row).placeholder;
      if (s.weight === '' && /^[\d.]+$/.test(phW)) s.weight = phW;
      if (s.reps === '' && /^\d+$/.test(phR)) s.reps = phR;
      if (s.kind === 's' && !(+s.reps > 0)) { $('[data-k=reps]', row).focus(); return toast('Enter your reps first'); }
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
  form: b => openForm(b.dataset.name),
  closedemo: () => $('#demo').close(),
  fillfood: b => {
    const x = S.foods.find(f => f.id === b.dataset.id), f = $('#sheet form'); if (!x) return;
    f.name.value = x.name; f.kcal.value = x.kcal; f.p.value = x.p; f.f.value = x.f; f.c.value = x.c; f.servings.value = 1;
  },
  delfood: b => { S.food[foodDate] = (S.food[foodDate] || []).filter(f => f.id !== b.dataset.id); save(); route(true); },
  copyprev: () => {
    S.food[foodDate] = (S.food[addDays(foodDate, -1)] || []).map(f => ({ ...f, id: uid() }));
    save(); route(true); toast('Copied from the day before');
  },
  fdate: b => { const d = addDays(foodDate, +b.dataset.d); if (d <= today()) { foodDate = d; foodOnToday = d === today(); route(); } },
  delworkout: async b => {
    if (!(await ask('Delete this workout from your history?', 'Delete', true))) return;
    S.workouts = S.workouts.filter(w => w.id !== b.dataset.id);
    S.cardio = S.cardio.filter(c => c.workout !== b.dataset.id); save(); route(true);
  },
  wrange: b => { weightRange = +b.dataset.d; route(true); },
  delweight: b => { S.weights = S.weights.filter(w => w.date !== b.dataset.date); save(); route(true); },
  delsaved: b => { S.foods = S.foods.filter(f => f.id !== b.dataset.id); save(); route(true); },
  theme: () => { S.settings.theme = isDark() ? 'light' : 'dark'; save(); applyTheme(); route(true); },
  hmode: b => { historyMode = b.dataset.m; route(true); },
  units: b => {
    const to = b.dataset.u; if (to === S.settings.units) return;
    // Lift weights are stored in the unit they were entered in, so convert them along with the label.
    const k = to === 'kg' ? 1 / 2.20462 : 2.20462, conv = w => w === '' || isNaN(+w) ? w : String(to === 'kg' ? Math.round(+w * k * 2) / 2 : Math.round(+w * k));
    [...S.workouts, ...(S.active ? [S.active] : [])].forEach(w => w.exercises.forEach(e => e.sets.forEach(x => { x.weight = conv(x.weight); })));
    S.settings.units = to;
    if (S.active) S.active.exercises.forEach(e => { const f = buildExercise({ ...e, warm: 0 }); Object.assign(e, { suggest: f.suggest, up: f.up, lastText: f.lastText }); });
    save(); route(true); toast(`Switched to ${to}`);
  },
  export: () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `wellness-backup-${today()}.json`;
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },
  reset: async () => { if (await ask('Erase all food, weight and workout data on this device?', 'Erase', true) && await ask('Really erase everything? Export a backup first if unsure.', 'Erase everything', true)) { S = defaults(); save(); applyTheme(); route(); toast('All data reset'); } }
};

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (b && ACT[b.dataset.act]) { e.preventDefault(); ACT[b.dataset.act](b, e); }
});
['#sheet', '#demo'].forEach(id => $(id).addEventListener('click', e => { if (e.target === $(id)) $(id).close(); }));

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
    const v = parseFloat(f.w.value);
    if (!(v >= 30 && v <= 700)) return toast(`Enter a weight between 30 and 700 ${unit()}`);
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
  if (t.dataset.swap !== undefined && S.active) return swapExercise(+t.dataset.swap, t.value);
  if (t.dataset.setting) {
    const k = t.dataset.setting, v = k === 'activity' ? t.value : +t.value;
    const min = ['fat', 'carbs'].includes(k) ? 0 : 1;
    if (k !== 'activity' && (t.value.trim() === '' || !(v >= min))) { t.value = S.settings[k]; return toast('Enter a number'); }
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
        S = migrate({ ...defaults(), ...d, settings: { ...defaults().settings, ...d.settings } }); save(); applyTheme(); route(); toast('Backup restored');
      } catch (err) { toast('That file is not a Wellness backup'); }
    };
    r.readAsText(t.files[0]);
  }
});

route();
if (S.active && location.hash === '#session') openSession();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('service-worker.js').catch(() => {});
