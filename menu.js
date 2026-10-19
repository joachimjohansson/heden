(() => {
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const renderGroups = (groups, targetId) => {
    const target = document.getElementById(targetId);
    target.innerHTML = groups.map((group) => `
      <section class="menu-group">
        <h3>${escape(group.category)}</h3>
        <div class="dish-grid">${group.items.map(([number, name, description, price]) => `
          <article class="dish-card">
            <div class="dish-heading">${number ? `<span class="dish-number">${escape(number)}</span>` : ''}<h4>${escape(name)}</h4><span class="dish-price">${escape(price)} kr</span></div>
            <p>${escape(description)}</p>
          </article>`).join('')}
        </div>
      </section>`).join('');
  };
  renderGroups(window.HEDENS_MENU.pizzas, 'pizza-groups');
  renderGroups(window.HEDENS_MENU.kebab, 'kebab-groups');
  renderGroups(window.HEDENS_MENU.salads, 'salad-groups');
  document.getElementById('year').textContent = new Date().getFullYear();
  const tabs = [...document.querySelectorAll('.menu-tabs a')];
  const sections = [...document.querySelectorAll('.food-section')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) tabs.forEach((tab) => tab.classList.toggle('active', tab.hash === `#${visible.target.id}`));
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
  }
})();
