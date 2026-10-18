// Builds one spoken episode per study-plan day: node tools/build-podcast.js [--only w1d1] [--scripts-only]
// Requires macOS `say` and `afinfo`. Writes audio/*.m4a and audio/episodes.js.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.join(__dirname, '..'), out = path.join(root, 'audio');
const VOICE = process.env.VOICE || 'Samantha', RATE = process.env.RATE || '175';
const args = process.argv.slice(2), only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null, scriptsOnly = args.includes('--scripts-only');

const src = f => fs.readFileSync(path.join(root, f), 'utf8');
const app = src('app.js'), plan = src('plan.js');
const grab = (s, name, end) => { const a = s.indexOf('[', s.indexOf(name)); return eval('(' + s.slice(a, s.indexOf(end, a) + end.length - 1) + ')'); };
const L = grab(app, 'const L=', ']];'), D = grab(app, 'const D=', ']];'), WEEKS = grab(plan, 'const WEEKS=', '\n];');
const QB = eval('(' + src('questions.js').replace(/^[\s\S]*?const QB=/, '').replace(/;\s*$/, '') + ')');
const WEEK_DOMAIN = ['staffing', 'staffing', 'staffing', 'organizations', 'business', 'business', 'reporting', 'security'];
const lesson = id => L.find(x => x[0] === id), dom = id => D.find(d => d[0] === id)[1];

const P = ms => ` [[slnc ${ms}]] `;
const speak = t => t
  // Drop course-book page citations such as "(B1 p. 82)" or "Answer key, B2 p. 275." so they are not read aloud.
  .replace(/\s*\((?:Answer key, )?B[12] pp?\. [^)]*\)/g, '').replace(/(?:Answer key, )?\bB[12] pp?\. [\d–\-, ;BpP.]+\.?/g, '')
  .replace(/\bBP\b/g, 'business process').replace(/\bBPs\b/g, 'business processes')
  .replace(/\bvs\.?\b/g, 'versus').replace(/\be\.g\.,?/g, 'for example,').replace(/&/g, ' and ')
  .replace(/ > /g, ', then ').replace(/ · /g, ', ').replace(/—/g, ', ').replace(/→/g, ' to ')
  .replace(/\bHCM\b/g, 'H C M').replace(/\bJM\b/g, 'Job Management').replace(/\bPM\b/g, 'Position Management')
  .replace(/\bCOAS\b/g, 'C O A S').replace(/\bCOUS\b/g, 'C O U S').replace(/\bCOO\b/g, 'C O O')
  .replace(/(\d+)%\+/g, '$1% or higher').replace(/#(\d)/g, 'number $1')
  .replace(/bp:/g, 'B P colon').replace(/event:/g, 'event colon');
const listSay = a => a.length === 2 ? a.join(' and ') : a.length > 1 ? a.slice(0, -1).join(', ') + ', and ' + a[a.length - 1] : a[0];
const ord = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// Deterministic shuffle so answer letters vary but builds are repeatable.
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const allQ = id => { const x = lesson(id), p = x[10].split('|'); return [[p[0], ...p.slice(1), x[12]], ...(QB[id] || [])]; };
function askQ(q, n) {
  const opts = q.slice(1, 5).map((t, i) => ({ t, ok: i === 0 })), shuffled = opts.map(o => [rnd(), o]).sort((a, b) => a[0] - b[0]).map(p => p[1]);
  const letters = 'ABCD', ans = shuffled.findIndex(o => o.ok);
  return `Question ${ord[n] || n + 1}.${P(400)}${q[0]}${P(700)}` +
    shuffled.map((o, i) => `${letters[i]}: ${o.t}.${P(450)}`).join('') +
    `Take a moment.${P(5000)}The answer is ${letters[ans]}: ${shuffled[ans].t}.${P(500)}${q[5]}${P(1400)}`;
}

function learnEp(x) {
  const dec = x[5].split(';').map(v => v.split('|'));
  return [
    `Today's objective is ${x[2]}, in the ${dom(x[1])} domain.${P(600)}In one line: ${x[3]}${P(1200)}`,
    `Let's start with the mental model.${P(500)}${x[4]}${P(1200)}`,
    `Now, the distinctions you need to know.${P(500)}` + dec.map(d => `${d[0]}: ${d[1]}.${P(700)}`).join('') + P(600),
    `Here's how it shows up at work.${P(500)}${x[6]}${P(1200)}`,
    `Task and report names to recognize: ${listSay(x[7].split(';'))}.${P(1200)}`,
    `And the exam trap to watch for.${P(500)}${x[8]}${P(1500)}`,
    `Quick check. I'll read each question and the choices, then pause so you can answer out loud.${P(1000)}` +
    allQ(x[0]).slice(1, 4).map((q, i) => askQ(q, i)).join(''),
  ];
}
function reviewEp(w, s) {
  let ids = w.sessions.filter(v => v[3]).map(v => v[3]);
  if (ids.length < 2) ids = [...new Set([...WEEKS.slice(0, WEEKS.indexOf(w)).flatMap(z => z.sessions.filter(v => v[3]).map(v => v[3])).filter(id => lesson(id)[1] === lesson(ids[0])[1]).slice(-2), ...ids])];
  return [
    `Today is a review session. ${s[2]}${P(1000)}This week's goal: ${w.focus}${P(1200)}`,
    ...ids.map(id => { const x = lesson(id); return `Recap: ${x[2]}.${P(500)}${x[4]}${P(700)}` + x[5].split(';').map(d => d.split('|')).map(d => `${d[0]}: ${d[1]}.${P(500)}`).join('') + `Remember the trap: ${x[8]}${P(1300)}`; }),
    `Two retrieval questions to finish.${P(800)}` + ids.slice(0, 2).map((id, i) => askQ(allQ(id)[4 + (i % 2)], i)).join(''),
  ];
}
function testEp(w, s, wi) {
  const mock = s[1].includes('Mock exam');
  let pool;
  if (mock) pool = D.flatMap(d => L.filter(x => x[1] === d[0]).flatMap(x => allQ(x[0]).slice(s[1].includes('#2') ? 10 : 7, s[1].includes('#2') ? 11 : 8)));
  const doms = [...new Set([WEEK_DOMAIN[wi], ...w.sessions.filter(v => v[3]).map(v => lesson(v[3])[1])])];
  if (!mock) pool = L.filter(x => doms.includes(x[1])).flatMap(x => allQ(x[0]).slice(5 + (wi % 2), 7 + (wi % 2)));
  pool = pool.map(q => [rnd(), q]).sort((a, b) => a[0] - b[0]).map(p => p[1]).slice(0, mock ? 12 : 8);
  return [
    `This is an audio drill for ${s[1]}.${P(500)}${mock ? 'A mixed set across all five domains.' : 'All questions come from ' + listSay(doms.map(dom)) + '.'} Answer each one out loud before the reveal.${P(1200)}`,
    pool.map((q, i) => askQ(q, i)).join(''),
    `That's the drill. When you're parked, take the full quiz in the app to log your score.`,
  ];
}

fs.mkdirSync(out, { recursive: true });
const eps = [];
WEEKS.forEach((w, wi) => w.sessions.forEach((s, si) => {
  const id = `w${wi + 1}d${si + 1}`, x = s[3] ? lesson(s[3]) : null;
  // Seed per episode so editing one day does not reshuffle the answer letters in every later episode.
  seed = [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2147483647, 7) || 7;
  const body = s[0] === 'learn' && x ? learnEp(x) : s[0] === 'test' ? testEp(w, s, wi) : reviewEp(w, s);
  const script = speak(`Week ${wi + 1}, day ${si + 1}. ${s[1]}.${P(1200)}` + body.join('') + `${P(800)}End of week ${wi + 1}, day ${si + 1}.`);
  const file = path.join(out, id + '.m4a');
  if (!only || only === id) {
    fs.writeFileSync(path.join(out, id + '.txt'), script);
    if (!scriptsOnly && (args.includes('--force') || only || !fs.existsSync(file))) {
      // `say` occasionally stalls; retry with a timeout.
      for (let tries = 1; ; tries++) {
        try { execFileSync('say', ['-v', VOICE, '-r', RATE, '-o', file, '--file-format=m4af', '--data-format=aac', '--bit-rate=48000', '-f', path.join(out, id + '.txt')], { timeout: 90000 }); break; }
        catch (e) { if (tries >= 3) throw e; console.error(`retrying ${id}`); }
      }
    }
  }
  let dur = 0;
  if (fs.existsSync(file)) dur = Math.round(parseFloat(execFileSync('afinfo', [file]).toString().match(/estimated duration: ([\d.]+)/)[1]));
  eps.push({ id, w: wi, d: si, title: s[1], type: s[0], dur });
}));
fs.writeFileSync(path.join(out, 'episodes.js'), 'const EPISODES=' + JSON.stringify(eps) + ';\n');
console.log(eps.map(e => `${e.id} ${e.type.padEnd(6)} ${Math.floor(e.dur / 60)}:${String(e.dur % 60).padStart(2, '0')} ${e.title}`).join('\n'));
