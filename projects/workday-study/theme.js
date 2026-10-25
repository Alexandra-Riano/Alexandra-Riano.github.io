(function(){
  const key='hcm-core-theme';
  let saved=null;try{saved=localStorage.getItem(key)}catch(e){}
  const preferred=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.dataset.theme=preferred;
  /* Keep the browser bar color in step with the in-app theme, not just the OS setting. */
  function bar(t){document.querySelectorAll('meta[name="theme-color"]').forEach(m=>{m.content=t==='dark'?'#07111d':'#f4f7fb';m.removeAttribute('media')})}
  function sync(button){const dark=document.documentElement.dataset.theme==='dark';button.innerHTML=`<i class="ph ph-${dark?'sun':'moon'}" aria-hidden="true"></i>`;button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'Turn off dark mode':'Turn on dark mode');button.title=dark?'Use light mode':'Use dark mode'}
  addEventListener('DOMContentLoaded',()=>{const button=document.getElementById('themeBtn');sync(button);bar(document.documentElement.dataset.theme);button.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem(key,next)}catch(e){}sync(button);bar(next)});
    /* With no saved choice, follow the OS when it switches. */
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{let s=null;try{s=localStorage.getItem(key)}catch(x){}if(s)return;const t=e.matches?'dark':'light';document.documentElement.dataset.theme=t;sync(button);bar(t)})});
})();
