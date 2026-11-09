const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){
  const closeMenu=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open')};
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.body.classList.toggle('menu-open',open);
    if(open){const firstLink=nav.querySelector('a');if(firstLink&&window.matchMedia('(max-width: 900px)').matches)firstLink.focus()}
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus()}});
  document.addEventListener('click',event=>{if(nav.classList.contains('open')&&!nav.contains(event.target)&&!toggle.contains(event.target))closeMenu()});
}
const revealItems=document.querySelectorAll('.reveal');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduceMotion||!('IntersectionObserver'in window)){revealItems.forEach(el=>el.classList.add('visible'))}
else{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  revealItems.forEach(el=>observer.observe(el));
}
function handleImageFailure(event){
  const img=event.target;
  if(!(img instanceof HTMLImageElement))return;
  const frame=img.closest('.image,.photo-frame,.hero-image,.gallery,.menu-service-art,.spa-feature-image');
  if(frame){frame.classList.add('image-unavailable');img.remove()}
}
document.addEventListener('error',handleImageFailure,true);
document.querySelectorAll('img').forEach(img=>{
  img.decoding='async';
  if(!img.hasAttribute('loading')&&img.closest('.hero-image')===null)img.loading='lazy';
  if(img.closest('.hero-image')){img.loading='eager';img.fetchPriority='high'}
});

function applyElaneContent(){
  if(!window.ElaneStore)return;
  const settings=window.ElaneStore.getSettings();
  document.querySelectorAll('.announcement').forEach(el=>el.textContent=settings.announcement);
  document.querySelectorAll('[data-site-setting]').forEach(el=>{
    const key=el.getAttribute('data-site-setting');
    if(Object.prototype.hasOwnProperty.call(settings,key))el.textContent=settings[key];
  });
}
applyElaneContent();
window.addEventListener('elane:datachange',applyElaneContent);
