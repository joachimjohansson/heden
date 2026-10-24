// Startsidan: "Öppet just nu" och årtalet i sidfoten.
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

  // Nästa dag då vi har öppet: veckodag, tid och om det är imorgon.
  const nextOpenDay = () => {
    for (let offset = 1; offset <= 14; offset += 1) {
      const date = swedishDate(offset);
      const hours = hoursFor(date);
      if (hours) return { day: date.day, open: hours.open, tomorrow: offset === 1 };
    }
    return null;
  };
  // T.ex. "imorgon kl. 11.00" eller "måndag kl. 11.00"
  const nextOpening = () => {
    const next = nextOpenDay();
    return next && `${next.tomorrow ? 'imorgon' : dayNames[next.day]} kl. ${format(next.open)}`;
  };
  // "fredag" -> "fredagar"
  const onDays = (day) => `på ${dayNames[day]}ar`;

  const status = document.getElementById('open-status');
  const todayHours = document.getElementById('today-hours');
  const dot = document.getElementById('open-dot');
  const closingNote = document.getElementById('closing-note');
  const heroStatus = document.getElementById('hero-status-text');
  const heroDot = document.getElementById('hero-dot');

  // heroLines är raderna under rubriken på mobilen, t.ex. ["Öppet nu.", "Stänger 22.00 på fredagar"].
  const show = (title, subtitle, note, isOpen, heroLines) => {
    status.textContent = title;
    todayHours.textContent = subtitle;
    closingNote.textContent = note;
    heroStatus.replaceChildren(...heroLines.map((text) => {
      const line = document.createElement('span');
      line.textContent = text;
      return line;
    }));
    dot.classList.toggle('is-open', isOpen);
    heroDot.classList.toggle('is-open', isOpen);
  };

  const renderHours = () => {
    const now = swedishDate();
    const today = hoursFor(now);
    rows.forEach((row) => row.classList.toggle('is-today', schedule[now.day].row === row));
    const next = nextOpening();
    const nextDay = nextOpenDay();

    // Sista värdet i varje show() är raderna under rubriken på mobilen.
    if (!today) {
      show('Stängt idag', next ? `Öppnar ${next}` : '', 'Vi håller stängt idag.', false,
        next ? ['Stängt idag.', `Öppnar ${next}`] : ['Stängt idag.']);
    } else if (now.minute < today.open) {
      show(`Öppnar idag kl. ${format(today.open)}`, `Öppet idag ${format(today.open)}–${format(today.close)}`, `Stänger idag kl. ${format(today.close)}`, false,
        ['Stängt nu.', `Öppnar ${format(today.open)} ${onDays(now.day)}`]);
    } else if (now.minute < today.close) {
      show('Öppet nu', `Stänger ${format(today.close)} ${onDays(now.day)}`, `Stänger idag kl. ${format(today.close)}`, true,
        ['Öppet nu.', `Stänger ${format(today.close)} ${onDays(now.day)}`]);
    } else {
      show(next ? `Öppnar ${next}` : 'Stängt', `Stängde idag kl. ${format(today.close)}`, `Stängde idag kl. ${format(today.close)}`, false,
        nextDay ? ['Stängt nu.', `Öppnar ${format(nextDay.open)} ${onDays(nextDay.day)}`] : ['Stängt.']);
    }
  };

  document.querySelectorAll('.year').forEach((el) => { el.textContent = new Date().getFullYear(); });
  renderHours();
  setInterval(renderHours, 60_000);

  // Safari på iPhone visar bara trycket på knapparna (:active) om sidan lyssnar på touch.
  document.addEventListener('touchstart', () => {}, { passive: true });
})();
