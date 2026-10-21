(function(){
const PKEY='hcm-core-podcast',RATES=[1,1.25,1.5,0.85];
let ps;try{ps=JSON.parse(localStorage.getItem(PKEY))}catch(e){}
if(!ps||typeof ps!=='object')ps={i:0,t:0,rate:1,v:2};
// Saved positions from before the plan was reordered point at the old episode order.
if(ps.v!==2){const old=Object.keys(PLAN_MOVES)[ps.i],n=old&&PLAN_MOVES[old].split('-').map(Number),j=n?EPISODES.findIndex(e=>e.w===n[0]&&e.d===n[1]):-1;ps.i=j<0?0:j;ps.v=2}
if(!(ps.i>=0&&ps.i<EPISODES.length))ps.i=0;if(!RATES.includes(ps.rate))ps.rate=1;if(!(ps.t>=0))ps.t=0;try{localStorage.setItem(PKEY,JSON.stringify(ps))}catch(e){}
const au=new Audio();au.preload='none';
const fmt=s=>{s=Math.max(0,Math.round(s||0));return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`};
const ep=()=>EPISODES[ps.i];
const label=e=>`Week ${e.w+1} · Day ${e.d+1}`;
const keep=()=>{try{localStorage.setItem(PKEY,JSON.stringify(ps))}catch(e){}};

const bar=document.createElement('div');bar.id='pod';bar.hidden=true;bar.setAttribute('role','region');bar.setAttribute('aria-label','Audio lesson player');
bar.innerHTML=`<div class="pod-info"><small id="podLabel"></small><b id="podTitle"></b></div>
<input id="podSeek" type="range" min="0" max="100" step="1" value="0" aria-label="Seek">
<div class="pod-time"><span id="podCur">0:00</span><span id="podDur">0:00</span></div>
<div class="pod-controls">
<button id="podRate" class="pod-rate" aria-label="Playback speed">1×</button>
<button id="podBack" aria-label="Back 15 seconds"><i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i><span>15</span></button>
<button id="podPlay" class="pod-play" aria-label="Play"><i class="ph ph-play" aria-hidden="true"></i></button>
<button id="podFwd" aria-label="Forward 30 seconds"><i class="ph ph-arrow-clockwise" aria-hidden="true"></i><span>30</span></button>
<button id="podNext" aria-label="Next episode"><i class="ph ph-skip-forward" aria-hidden="true"></i></button>
</div>`;
document.body.append(bar);
const $p=id=>document.getElementById(id);

function load(i,t=0){ps.i=Math.max(0,Math.min(EPISODES.length-1,i));ps.t=t;keep();const e=ep();
  au.src=`audio/${e.id}.m4a`;au.playbackRate=ps.rate;au.dataset.start=t;
  $p('podLabel').textContent=label(e);$p('podTitle').textContent=e.title;$p('podDur').textContent=fmt(e.dur);$p('podSeek').max=e.dur||100;
  if('mediaSession' in navigator)navigator.mediaSession.metadata=new MediaMetadata({title:e.title,artist:`${label(e)} · HCM Core Study Lab`,album:'HCM Core audio lessons'});
  renderCard();}
function play(i,t){if(i!==undefined&&(i!==ps.i||!au.src))load(i,t);else if(!au.src)load(ps.i,ps.t);bar.hidden=false;document.body.classList.add('has-pod');au.play().catch(()=>{});}
function toggle(){au.paused?play():au.pause()}
function skip(sec){au.currentTime=Math.max(0,Math.min((au.duration||ep().dur),au.currentTime+sec))}
function next(){if(ps.i<EPISODES.length-1)play(ps.i+1,0)}
function prev(){if(au.currentTime>5)au.currentTime=0;else if(ps.i>0)play(ps.i-1,0)}

au.addEventListener('loadedmetadata',()=>{const t=+au.dataset.start||0;if(t&&t<au.duration-3)au.currentTime=t;au.dataset.start=0;$p('podSeek').max=Math.round(au.duration);$p('podDur').textContent=fmt(au.duration)});
let lastSave=0;
au.addEventListener('timeupdate',()=>{$p('podCur').textContent=fmt(au.currentTime);$p('podSeek').value=Math.round(au.currentTime);ps.t=au.currentTime;if(Date.now()-lastSave>4000){lastSave=Date.now();keep()}});
const sync=()=>{const on=!au.paused;$p('podPlay').innerHTML=`<i class="ph ph-${on?'pause':'play'}" aria-hidden="true"></i>`;$p('podPlay').setAttribute('aria-label',on?'Pause':'Play');if('mediaSession' in navigator)navigator.mediaSession.playbackState=on?'playing':'paused';renderCard();keep()};
au.addEventListener('play',sync);au.addEventListener('pause',sync);
au.addEventListener('ended',()=>{if(ps.i<EPISODES.length-1)play(ps.i+1,0);else{ps.t=0;keep();sync()}});

$p('podPlay').onclick=toggle;$p('podBack').onclick=()=>skip(-15);$p('podFwd').onclick=()=>skip(30);$p('podNext').onclick=next;
$p('podSeek').oninput=e=>{au.currentTime=+e.target.value};
$p('podRate').onclick=()=>{ps.rate=RATES[(RATES.indexOf(ps.rate)+1)%RATES.length];au.playbackRate=ps.rate;$p('podRate').textContent=ps.rate+'×';keep()};
$p('podRate').textContent=ps.rate+'×';
if('mediaSession' in navigator){const m=navigator.mediaSession;
  [['play',()=>play()],['pause',()=>au.pause()],['seekbackward',()=>skip(-15)],['seekforward',()=>skip(30)],['nexttrack',next],['previoustrack',prev]].forEach(([a,f])=>{try{m.setActionHandler(a,f)}catch(e){}});}

function renderCard(){const c=document.getElementById('listenCard');if(!c)return;const e=ep(),playing=!au.paused,started=ps.t>5,total=EPISODES.reduce((n,x)=>n+x.dur,0);
  c.innerHTML=`<div><h2>Listen while driving</h2><p>One audio episode per study day, ${EPISODES.length} in all (${Math.round(total/60)} min). Episodes play in order and keep going with your screen locked.</p></div>
  <button id="listenGo" class="primary listen-go"><i class="ph ph-${playing?'pause':'play'}" aria-hidden="true"></i>${playing?'Pause':started?'Resume':'Play'} ${label(e)}: ${e.title}${started&&!playing?` · ${fmt(e.dur-ps.t)} left`:''}</button>`;
  document.getElementById('listenGo').onclick=()=>playing?au.pause():play();}
const card=document.createElement('article');card.id='listenCard';card.className='listen-card';
document.querySelector('#plan .plan-overview').after(card);renderCard();

window.podcast={play,epFor:(wi,si)=>EPISODES.findIndex(e=>e.w===wi&&e.d===si),fmt};
})();
