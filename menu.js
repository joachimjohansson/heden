// Menysidan: räknar rätterna i flikarna och markerar var på menyn man är.
// Själva menyn står direkt i menu.html, så den syns även om skriptet inte laddas.
(() => {
  const tabBar = document.querySelector('.menu-tabs');
  const mainTabs = [...document.querySelectorAll('.menu-tabs-main a')];
  const subRows = [...document.querySelectorAll('.menu-tabs-sub')];
  const groups = [...document.querySelectorAll('.menu-group')];

  // Antal rätter per huvudkategori, t.ex. "Pizza 62".
  mainTabs.forEach((tab) => {
    const section = document.getElementById(tab.dataset.section);
    tab.querySelector('.tab-count').textContent = section.querySelectorAll('.dish-card').length;
  });

  // Visa rätt rad med underkategorier och markera aktiv flik.
  const setActive = (sectionId, groupId) => {
    mainTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.section === sectionId));
    subRows.forEach((row) => {
      row.hidden = row.dataset.section !== sectionId;
      row.querySelectorAll('a').forEach((link) => {
        const isActive = link.hash === `#${groupId}`;
        link.classList.toggle('active', isActive);
        // Rulla raden i sidled så att den aktiva fliken syns på mobilen.
        if (isActive && !row.hidden) {
          row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
        }
      });
    });
  };

  // Den grupp vars rubrik senast passerat under flikraden räknas som aktiv.
  let current = '';
  const update = () => {
    const line = tabBar.getBoundingClientRect().bottom + 24;
    const group = groups.filter((g) => g.getBoundingClientRect().top <= line).pop() || groups[0];
    if (group.id === current) return;
    current = group.id;
    setActive(group.closest('.food-section').id, group.id);
  };

  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }, { passive: true });

  // Flikraden kan bli högre på smala skärmar; låt hopp till rubriker landa under den.
  const setOffset = () => document.documentElement.style.setProperty('--tabs-height', `${tabBar.offsetHeight}px`);
  window.addEventListener('resize', setOffset);
  setOffset();
  update();

  document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
