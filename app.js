(() => {
  const schedule = [
    { open: 12 * 60, close: 21 * 60 },
    { open: 11 * 60, close: 21 * 60 + 30 },
    { open: 11 * 60, close: 21 * 60 + 30 },
    { open: 11 * 60, close: 21 * 60 + 30 },
    { open: 11 * 60, close: 21 * 60 + 30 },
    { open: 11 * 60, close: 22 * 60 },
    { open: 11 * 60, close: 22 * 60 }
  ];
  const format = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}.${String(minutes % 60).padStart(2, '0')}`;
  const stockholmNow = () => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Stockholm', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    const weekdays = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: weekdays[value.weekday], minute: Number(value.hour) * 60 + Number(value.minute) };
  };
  const renderHours = () => {
    const { day, minute } = stockholmNow();
    const today = schedule[day];
    const rows = document.querySelectorAll('.hours-row');
    rows.forEach((row) => row.classList.toggle('is-today', Number(row.dataset.day) === (day === 0 ? 0 : day === 5 || day === 6 ? 5 : 1)));
    const status = document.getElementById('open-status');
    const todayHours = document.getElementById('today-hours');
    const dot = document.getElementById('open-dot');
    const closing = document.getElementById('closing-note');
    const time = (value) => format(value);
    if (minute >= today.open && minute < today.close) {
      status.textContent = 'Öppet just nu';
      todayHours.textContent = `Stänger idag kl. ${time(today.close)}`;
      closing.textContent = `Stänger idag kl. ${time(today.close)}`;
      dot.classList.add('is-open');
      return;
    }
    dot.classList.remove('is-open');
    if (minute < today.open) {
      status.textContent = `Öppnar idag kl. ${time(today.open)}`;
      todayHours.textContent = `Öppet idag ${time(today.open)}–${time(today.close)}`;
      closing.textContent = `Stänger idag kl. ${time(today.close)}`;
      return;
    }
    const nextDay = (day + 1) % 7;
    status.textContent = `Öppnar imorgon kl. ${time(schedule[nextDay].open)}`;
    todayHours.textContent = `Stängde idag kl. ${time(today.close)}`;
    closing.textContent = `Stängde idag kl. ${time(today.close)}`;
  };
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('is-visible', open);
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-visible');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
  renderHours();
  setInterval(renderHours, 60_000);
})();
