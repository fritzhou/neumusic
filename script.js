const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function applySiteTheme(mode) {
  root.dataset.theme = mode;
  localStorage.setItem('neumusic-site-theme', mode);
  themeColor?.setAttribute('content', mode === 'dark' ? '#08131f' : '#EDF4FC');
  themeToggle?.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
applySiteTheme(root.dataset.theme || 'light');
themeToggle?.addEventListener('click', () => applySiteTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const themes = [
  {id:'arctic',name:'Arctic Blue',type:'light',tags:['light'],bg:'#EDF6FC',surface:'#FBFDFF',soft:'#E2F0FA',accent:'#126CCD',text:'#12304A',secondary:'#3B8CB4'},
  {id:'midnight',name:'Midnight Navy',type:'dark',tags:['dark'],bg:'#081C32',surface:'#102A45',soft:'#193751',accent:'#21C9E9',text:'#EDF7FF',secondary:'#5FCEBC'},
  {id:'lavender',name:'Lavender Mist',type:'pastel',tags:['light','pastel'],bg:'#F0ECFA',surface:'#FCFAFF',soft:'#E8E0F5',accent:'#7950CC',text:'#291D46',secondary:'#B04E93'},
  {id:'mint',name:'Mint Breeze',type:'pastel',tags:['light','pastel'],bg:'#E9F6F1',surface:'#F8FEFB',soft:'#DDF1E9',accent:'#087B68',text:'#173A33',secondary:'#338798'},
  {id:'sunset',name:'Sunset Peach',type:'pastel',tags:['light','pastel'],bg:'#FBEFE5',surface:'#FFFAF5',soft:'#F7E2D4',accent:'#B84630',text:'#482822',secondary:'#A5633C'},
  {id:'rose',name:'Rose Quartz',type:'pastel',tags:['light','pastel'],bg:'#F8ECF1',surface:'#FFFAFD',soft:'#F2DEE8',accent:'#AE3D71',text:'#442537',secondary:'#9560AC'},
  {id:'emerald',name:'Emerald Night',type:'dark',tags:['dark'],bg:'#08261F',surface:'#103A30',soft:'#194B3E',accent:'#43DAB0',text:'#EDFFF6',secondary:'#3ABDCB'},
  {id:'silver',name:'Monochrome Silver',type:'light',tags:['light'],bg:'#EEF0F3',surface:'#FCFDFE',soft:'#E3E7ED',accent:'#4C5B70',text:'#202938',secondary:'#67748A'},
  {id:'ocean',name:'Ocean Glass',type:'light',tags:['light'],bg:'#DDF5FB',surface:'#F0FCFE',soft:'#CBEAF3',accent:'#0872AF',text:'#082A48',secondary:'#13A8B9'},
  {id:'solar',name:'Solar Gold',type:'light',tags:['light'],bg:'#FBF3DF',surface:'#FFFAED',soft:'#F4E6C4',accent:'#966015',text:'#46331C',secondary:'#BF8426'},
  {id:'cherry',name:'Cherry Noir',type:'dark',tags:['dark'],bg:'#19050B',surface:'#280C14',soft:'#371220',accent:'#EC526E',text:'#FFF3F4',secondary:'#BA304E'},
  {id:'cyber',name:'Cyber Violet',type:'dark',tags:['dark'],bg:'#100B29',surface:'#20163F',soft:'#302155',accent:'#AD82FF',text:'#F4EEFF',secondary:'#59BCD7'},
  {id:'sakura',name:'Frosted Sakura',type:'pastel',tags:['light','pastel'],bg:'#F9EDF6',surface:'#FFF9FC',soft:'#F0DFEC',accent:'#9E4E8E',text:'#41253E',secondary:'#B582B2'},
  {id:'mocha',name:'Mocha Cream',type:'light',tags:['light'],bg:'#F2EAE1',surface:'#FCF7F0',soft:'#E5D9CD',accent:'#7B5947',text:'#3E2E26',secondary:'#AA8060'},
  {id:'aurora',name:'Aurora',type:'dark',tags:['dark'],bg:'#071F2C',surface:'#10343E',soft:'#1B4554',accent:'#4CD9D0',text:'#E9FAFF',secondary:'#9D91F3'},
  {id:'graphite',name:'Graphite Blue',type:'dark',tags:['dark'],bg:'#141D2A',surface:'#263346',soft:'#334257',accent:'#91B5DE',text:'#EEF4FC',secondary:'#6E93C2'}
];

const grid = document.getElementById('themeGrid');
function renderThemes(filter = 'all') {
  if (!grid) return;
  const visible = themes.filter(t => filter === 'all' || t.tags.includes(filter));
  grid.innerHTML = visible.map((t, i) => `
    <article class="pro-theme-card reveal visible" style="--tb:${t.bg};--ts:${t.surface};--tsoft:${t.soft};--ta:${t.accent};--tt:${t.text};--t2:${t.secondary}">
      <div class="theme-mini" aria-hidden="true">
        <div class="theme-blob b1"></div><div class="theme-blob b2"></div>
        <div class="theme-appbar"><span></span><i></i></div>
        <div class="theme-feature"><small>THIS WEEK</small><b>Music of the Week</b><em>›</em></div>
        <div class="theme-line"></div><div class="theme-stats"><i></i><i></i></div>
        <div class="theme-dock"><i></i><i></i><i></i><i></i><i></i></div>
      </div>
      <div class="theme-card-copy"><div><span class="theme-number">${String(i + 1).padStart(2,'0')}</span><h3>${t.name}</h3><small>${t.type === 'dark' ? 'Dark atmosphere' : t.type === 'pastel' ? 'Pastel atmosphere' : 'Light atmosphere'}</small></div><span class="pro-tag">PRO</span></div>
      <div class="palette"><i style="--c:${t.bg}"></i><i style="--c:${t.surface}"></i><i style="--c:${t.accent}"></i><i style="--c:${t.secondary}"></i></div>
    </article>`).join('');
  document.querySelector('.theme-count').textContent = `${visible.length} PRO theme${visible.length === 1 ? '' : 's'}`;
}
renderThemes();

document.querySelectorAll('.theme-filters button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.theme-filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderThemes(btn.dataset.filter);
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
