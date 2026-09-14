(function(){
  const key='hcm-core-theme';
  const saved=localStorage.getItem(key);
  const preferred=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.dataset.theme=preferred;
  function sync(button){const dark=document.documentElement.dataset.theme==='dark';button.textContent=dark?'☀':'☾';button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'Turn off dark mode':'Turn on dark mode');button.title=dark?'Use light mode':'Use dark mode'}
  addEventListener('DOMContentLoaded',()=>{const button=document.getElementById('themeBtn');sync(button);button.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem(key,next);sync(button)})});
})();
