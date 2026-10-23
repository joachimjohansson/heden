// Startsidan: "Öppet just nu", mobilmenyn och årtalet i sidfoten.
// Öppettiderna läses från öppettidskortet i index.html, så de behöver bara ändras där.
(() => {
  const dayNames = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  const hoursCard = document.querySelector('.hours-card');
  const rows = [...document.querySelectorAll('.hours-row')];

  // "11.00" -> minuter efter midnatt
  const toMinutes = (text) => {
    const [h, m] = text.trim().split(/[.:]/).map(Number);
    return h * 60 + (m || 0);
  };
  const format = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}.${String(minutes % 60).padStart(2, '0')}`;

  // Bygg ett schema per veckodag från raderna i HTML.
  const schedule = {};
  rows.forEach((row) => {
    const [open, close] = row.querySelector('b').textContent.split(/[–-]/).map(toMinutes);
    row.dataset.days.split(',').forEach((day) => { schedule[Number(day)] = { open, close, row }; });
  });
  const closedDates = (hoursCard.dataset.closed || '').split(',').map((d) => d.trim()).filter(Boolean);

  // Datum, veckodag och klockslag i svensk tid, oavsett var besökaren är.
  const swedishDate = (offsetDays = 0) => {
    const date = new Date(Date.now() + offsetDays * 864e5);
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit',
      weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(date).map(({ type, value }) => [type, value]));
    return {
      iso: `${parts.year}-${parts.month}-${parts.day}`,
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday),
      minute: Number(parts.hour) * 60 + Number(parts.minute)
    };
  };
  const hoursFor = (date) => (closedDates.includes(date.iso) ? null : schedule[date.day]);

  // Nästa dag då vi har öppet, t.ex. "imorgon kl. 11.00" eller "måndag kl. 11.00".
  const nextOpening = () => {
    for (let offset = 1; offset <= 14; offset += 1) {
      const date = swedishDate(offset);
      const hours = hoursFor(date);
      if (hours) return `${offset === 1 ? 'imorgon' : dayNames[date.day]} kl. ${format(hours.open)}`;
    }
    return null;
  };

  const status = document.getElementById('open-status');
  const todayHours = document.getElementById('today-hours');
  const dot = document.getElementById('open-dot');
  const closingNote = document.getElementById('closing-note');

  const show = (title, subtitle, note, isOpen) => {
    status.textContent = title;
    todayHours.textContent = subtitle;
    closingNote.textContent = note;
    dot.classList.toggle('is-open', isOpen);
  };

  const renderHours = () => {
    const now = swedishDate();
    const today = hoursFor(now);
    rows.forEach((row) => row.classList.toggle('is-today', schedule[now.day].row === row));
    const next = nextOpening();

    if (!today) {
      show('Stängt idag', next ? `Öppnar ${next}` : '', 'Vi håller stängt idag.', false);
    } else if (now.minute < today.open) {
      show(`Öppnar idag kl. ${format(today.open)}`, `Öppet idag ${format(today.open)}–${format(today.close)}`, `Stänger idag kl. ${format(today.close)}`, false);
    } else if (now.minute < today.close) {
      show('Öppet just nu', `Stänger idag kl. ${format(today.close)}`, `Stänger idag kl. ${format(today.close)}`, true);
    } else {
      show(next ? `Öppnar ${next}` : 'Stängt', `Stängde idag kl. ${format(today.close)}`, `Stängde idag kl. ${format(today.close)}`, false);
    }
  };

  // Mobilmenyn
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('is-visible', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });
  renderHours();
  setInterval(renderHours, 60_000);
})();
