// Minneslista på menysidan: ett plus vid varje rätt sparar den i en lista,
// där man kan välja tillägg och sås och sedan ringa eller dela listan.
// Ingen beställning skickas – listan finns bara i besökarens webbläsare.
(() => {
  const PHONE = '031-20 70 95';
  const PHONE_LINK = 'tel:+4631207095';
  // Alla ingredienser som finns på menyn, i grupper. Lägg till här om menyn får nya.
  const EXTRA_GROUPS = {
    'Kött': ['Skinka', 'Salami', 'Pepperonikorv', 'Bacon', 'Köttfärs', 'Kebabkött', 'Kyckling', 'Oxfilé', 'Parmaskinka'],
    'Fisk och skaldjur': ['Räkor', 'Musslor', 'Krabba', 'Tonfisk', 'Ansjovis', 'Sardeller'],
    'Ost': ['Ost', 'Mozzarella', 'Fetaost', 'Getost', 'Gorgonzola', 'Parmesanost', 'Fårost'],
    'Grönsaker och frukt': ['Lök', 'Rödlök', 'Champinjoner', 'Paprika', 'Färsk tomat', 'Körsbärstomater', 'Soltorkade tomater',
      'Oliver', 'Feferoni', 'Jalapeño', 'Chili', 'Gurka', 'Ananas', 'Banan', 'Kronärtskocka', 'Sparris', 'Kapris',
      'Ruccolasallad', 'Isbergssallad', 'Färsk vitlök'],
    'Övrigt': ['Pommes frites', 'Falafel', 'Ägg', 'Pesto', 'Bearnaisesås', 'Currysås', 'Honung', 'Jordnötter',
      'Tryffeltapenade', 'Curry', 'Tabasco', 'Oregano', 'Peppar'],
  };
  const EXTRAS = Object.values(EXTRA_GROUPS).flat();
  const SAUCES = ['Mild', 'Stark', 'Blandad', 'Vitlök'];
  const KEY = 'hedens-minneslista';

  let items = [];
  try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch { items = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* privat läge: listan lever bara tills sidan stängs */ } };

  const plusIcon = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => (k === 'html' ? (node.innerHTML = v) : node.setAttribute(k, v)));
    node.append(...children);
    return node;
  };

  // Uppläsning för skärmläsare när något läggs till
  const live = el('p', { class: 'visually-hidden', 'aria-live': 'polite' });

  // Fältet längst ner som visar hur många rätter som är sparade
  const barCount = el('span');
  const bar = el('button', { type: 'button', class: 'memo-bar', hidden: '' }, el('span', { class: 'memo-bar-label' }, 'Minneslista'), barCount);

  // Själva listan i en dialogruta
  const list = el('ol', { class: 'memo-list' });
  const total = el('p', { class: 'memo-total' });
  const shareBtn = el('button', { type: 'button', class: 'button button-phone' }, 'Dela listan');
  const clearBtn = el('button', { type: 'button', class: 'memo-clear' }, 'Töm listan');
  const closeBtn = el('button', { type: 'button', class: 'memo-close', 'aria-label': 'Stäng minneslistan' }, '×');
  const dialog = el('dialog', { class: 'memo-dialog', 'aria-labelledby': 'memo-title' },
    el('div', { class: 'memo-head' }, el('h2', { id: 'memo-title' }, 'Minneslista'), closeBtn),
    el('p', { class: 'memo-note' }, 'Ingen beställning skickas härifrån. Ring och läs upp numren, så står maten klar.'),
    list, total,
    el('div', { class: 'memo-actions' }, el('a', { class: 'button button-primary', href: PHONE_LINK }, `Ring ${PHONE}`), shareBtn),
    clearBtn);
  document.body.append(live, bar, dialog);

  const label = (item) => (item.nr ? `Nr ${item.nr} ${item.name}` : item.name);
  const extrasText = (item) => [item.extras.length && `extra ${item.extras.join(', ').toLowerCase()}`, item.sauce && `${item.sauce.toLowerCase()} sås`].filter(Boolean).join(', ');
  const sum = () => items.reduce((acc, item) => acc + item.price, 0);
  const hasExtras = () => items.some((item) => item.extras.length);

  // Antal och summa; uppdateras utan att listan ritas om, så att fokus ligger kvar
  const renderTotals = () => {
    bar.hidden = items.length === 0;
    barCount.textContent = `${items.length} ${items.length === 1 ? 'rätt' : 'rätter'} · ${sum()} kr`;
    total.textContent = `Summa rätter: ${sum()} kr${hasExtras() ? ' · tillägg betalas i kassan' : ''}`;
  };

  const render = () => {
    renderTotals();
    list.replaceChildren(...items.map((item, i) => {
      // Tilläggen ligger hopfällda; raden visar det man valt
      const chosen = el('span', { class: 'memo-chosen' });
      const showChosen = () => { chosen.textContent = item.extras.length ? item.extras.join(', ') : 'Lägg till något'; };
      showChosen();
      const extras = el('details', { class: 'memo-extras' },
        el('summary', {}, el('span', { class: 'memo-extras-label' }, 'Tillägg'), chosen),
        ...Object.entries(EXTRA_GROUPS).map(([group, names]) => el('fieldset', {}, el('legend', {}, group),
          ...names.map((name) => {
            const box = el('input', { type: 'checkbox', value: name });
            box.checked = item.extras.includes(name);
            box.addEventListener('change', () => {
              item.extras = EXTRAS.filter((n) => (n === name ? box.checked : item.extras.includes(n)));
              save(); renderTotals(); showChosen();
            });
            return el('label', { class: 'memo-chip' }, box, name);
          }))));
      const sauces = el('fieldset', {}, el('legend', {}, 'Sås'),
        ...['', ...SAUCES].map((name) => {
          const radio = el('input', { type: 'radio', name: `sas-${i}`, value: name });
          radio.checked = item.sauce === name;
          radio.addEventListener('change', () => { item.sauce = name; save(); renderTotals(); });
          return el('label', { class: 'memo-chip' }, radio, name || 'Ingen');
        }));
      const remove = el('button', { type: 'button', class: 'memo-remove', 'aria-label': `Ta bort ${item.name}` }, 'Ta bort');
      remove.addEventListener('click', () => { items.splice(i, 1); save(); render(); if (!items.length) dialog.close(); });
      return el('li', {},
        el('div', { class: 'memo-item-head' }, el('strong', {}, label(item)), el('span', { class: 'dish-price' }, `${item.price} kr`), remove),
        sauces, extras);
    }));
  };

  // Ett plus vid varje rätt som har ett pris
  document.querySelectorAll('.dish-card').forEach((card) => {
    const priceEl = card.querySelector('.dish-price');
    if (!priceEl) return;
    const dish = {
      nr: card.querySelector('.dish-number')?.textContent.trim() || '',
      name: card.querySelector('h4').textContent.trim(),
      price: parseInt(priceEl.textContent, 10),
    };
    const add = el('button', { type: 'button', class: 'memo-add', 'aria-label': `Lägg till ${dish.name} i minneslistan`, html: plusIcon });
    add.addEventListener('click', () => {
      items.push({ ...dish, extras: [], sauce: '' });
      save(); render();
      live.textContent = `${dish.name} tillagd i minneslistan`;
      add.classList.remove('is-added');
      void add.offsetWidth;   // starta om bekräftelsen vid flera tryck
      add.classList.add('is-added');
    });
    priceEl.after(add);
  });

  const asText = () => [
    'Minneslista – Hedens Pizzeria',
    ...items.map((item, i) => `${i + 1}. ${label(item)} (${item.price} kr)${extrasText(item) ? ` – ${extrasText(item)}` : ''}`),
    `Summa rätter: ${sum()} kr${hasExtras() ? ' (tillägg betalas i kassan)' : ''}`,
    `Ring ${PHONE}`,
  ].join('\n');

  bar.addEventListener('click', () => { render(); dialog.showModal(); });
  closeBtn.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });   // klick utanför rutan stänger
  clearBtn.addEventListener('click', () => { items = []; save(); render(); dialog.close(); });
  shareBtn.addEventListener('click', async () => {
    const text = asText();
    try {
      if (navigator.share) await navigator.share({ title: 'Minneslista – Hedens Pizzeria', text });
      else { await navigator.clipboard.writeText(text); shareBtn.textContent = 'Kopierad!'; setTimeout(() => { shareBtn.textContent = 'Dela listan'; }, 2000); }
    } catch { /* användaren avbröt delningen */ }
  });

  render();
})();
