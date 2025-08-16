// Minimal JS to render projects, handle modal, theme toggle, and mobile menu
(() => {
  const projects = [
    {
      id: 'p1',
      title: 'Project One',
      description: 'A responsive web app demonstrating great UX and performance.',
      details: 'Built with HTML, CSS, and JavaScript. Features responsive layout, accessible components and a progressive enhancement approach.',
      tags: ['HTML','CSS','JS'],
      color: '#7F5AF0'
    },
    {
      id: 'p2',
      title: 'Project Two',
      description: 'Design system and component library.',
      details: 'Design tokens, components, documentation site and theming support.',
      tags: ['Design','Components'],
      color: '#00C2FF'
    },
    {
      id: 'p3',
      title: 'Project Three',
      description: 'Performance-first landing page template.',
      details: 'Optimized images, critical CSS inlined, and Lighthouse score focused improvements.',
      tags: ['Performance','SEO'],
      color: '#FF6B6B'
    }
  ];

  // helper to create simple svg placeholder as data URI
  function svgDataUri(title, color='#7F5AF0', w=800, h=480){
    const text = title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'>
      <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='${color}'/><stop offset='1' stop-color='#1F2937'/></linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='36' fill='rgba(255,255,255,0.95)'>${text}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // render project cards
  const grid = document.getElementById('projects-grid');
  function renderProjects(){
    grid.innerHTML = '';
    projects.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${svgDataUri(p.title, p.color)}" loading="lazy" alt="${p.title} screenshot placeholder" />
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.description}</p>
          <div class="card-actions">
            <button class="btn open-project" data-id="${p.id}">Details</button>
            <a class="btn ghost" href="#contact">Hire</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // modal logic
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  function openModal(project){
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <img src="${svgDataUri(project.title, project.color, 900, 420)}" alt="${project.title} large screenshot" style="width:100%;border-radius:8px;margin:0.5rem 0" />
      <p>${project.details}</p>
      <p><strong>Tags:</strong> ${project.tags.join(', ')}</p>
    `;
    document.body.style.overflow = 'hidden';
    // focus trap beginning
    document.getElementById('modal-close').focus();
  }
  function closeModal(){
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('.open-project');
    if(openBtn){
      const id = openBtn.dataset.id;
      const project = projects.find(p => p.id === id);
      if(project) openModal(project);
    }
    if(e.target.id === 'modal-close' || e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.hidden){ closeModal(); }
  });

  // theme toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if(stored) root.setAttribute('data-theme', stored);

  function setTheme(theme){
    if(theme === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    if(open){ mobileNav.hidden = true; menuToggle.textContent = '☰'; }
    else { mobileNav.hidden = false; menuToggle.textContent = '✕'; }
  });

  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // initial render
  renderProjects();

  // attach close button handler
  document.getElementById('modal-close').addEventListener('click', closeModal);

  // A small accessibility enhancement: when clicking a nav anchor, close mobile nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if(!mobileNav.hidden){
        mobileNav.hidden = true;
        menuToggle.setAttribute('aria-expanded','false');
        menuToggle.textContent = '☰';
      }
    });
  });
})();