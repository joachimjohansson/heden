// Menysidan: markerar var på menyn man är.
// Själva menyn står direkt i menu.html, så den syns även om skriptet inte laddas.
(() => {
  const tabBar = document.querySelector('.menu-tabs');
  const mainTabs = [...document.querySelectorAll('.menu-tabs-main a')];
  const subRows = [...document.querySelectorAll('.menu-tabs-sub')];
  const sections = [...document.querySelectorAll('.food-section')];
  const groups = [...document.querySelectorAll('.menu-group')];

  // Visa rätt rad med underkategorier och markera aktiv flik.
  // aria-current talar om för skärmläsare vilken flik som är vald.
  const mark = (link, isActive) => {
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  };

  let current = '';
  const setActive = (sectionId, groupId) => {
    current = groupId;
    mainTabs.forEach((tab) => mark(tab, tab.dataset.section === sectionId));
    subRows.forEach((row) => {
      row.hidden = row.dataset.section !== sectionId;
      row.querySelectorAll('a').forEach((link) => {
        const isActive = link.hash === `#${groupId}`;
        mark(link, isActive);
        // Rulla raden i sidled så att den aktiva fliken syns på mobilen.
        if (isActive && !row.hidden) {
          row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
        }
      });
    });
  };

  // Först väljs den menydel vars rubrik senast passerat under flikraden, sedan
  // gruppen inom den delen. Längst ner på sidan räknas sista delen som aktiv,
  // eftersom en kort sista del aldrig hinner nå upp till flikraden.
  // Flikraden får bakgrund först när den fastnat högst upp.
  const setStuck = () => tabBar.classList.toggle('is-stuck', tabBar.getBoundingClientRect().top <= 0);

  const update = () => {
    const line = tabBar.getBoundingClientRect().bottom + 24;
    const passed = (el) => el.getBoundingClientRect().top <= line;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const section = atBottom ? sections[sections.length - 1] : sections.filter(passed).pop() || sections[0];
    const inSection = groups.filter((g) => section.contains(g));
    const group = (atBottom ? null : inSection.filter(passed).pop()) || inSection[0];
    if (group.id !== current) setActive(section.id, group.id);
  };

  // Vid tryck på en flik markeras den direkt, och scrollen dit får inte
  // flytta markeringen förrän den stannat.
  let locked = null;
  document.querySelectorAll('.menu-tabs a').forEach((link) => link.addEventListener('click', () => {
    const target = document.querySelector(link.hash);
    const section = target.closest('.food-section');
    const group = target.classList.contains('menu-group') ? target : section.querySelector('.menu-group');
    setActive(section.id, group.id);
    clearTimeout(locked);
    locked = setTimeout(() => { locked = null; }, 1200);
  }));

  let queued = false;
  window.addEventListener('scroll', () => {
    setStuck();
    if (queued || locked) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }, { passive: true });
  window.addEventListener('scrollend', () => { clearTimeout(locked); locked = null; });

  // Flikraden kan bli högre på smala skärmar; låt hopp till rubriker landa under den.
  const setOffset = () => document.documentElement.style.setProperty('--tabs-height', `${tabBar.offsetHeight}px`);
  window.addEventListener('resize', setOffset);
  setOffset();
  setStuck();
  update();

  document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
