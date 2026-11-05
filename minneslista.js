// Minneslista på menysidan: pluset vid en rätt öppnar ett fönster där man väljer
// sås och tillägg, och rätten sparas sedan i en lista som man kan ringa eller dela.
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
  // Menyns stavning när den skiljer sig från tilläggets namn, t.ex. "tomat" = "Färsk tomat"
  const ALIAS = { 'tomat': 'färsk tomat', 'färska tomater': 'färsk tomat', 'färsk mozzarella': 'mozzarella', 'vitlök': 'färsk vitlök',
    'färsk paprika': 'paprika', 'körsbärstomat': 'körsbärstomater', 'tryffel': 'tryffeltapenade' };
  const SAUCES = ['Mild', 'Stark', 'Blandad', 'Vitlök'];
  const KEY = 'hedens-minneslista';

  let items = [];
  try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch { items = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* privat läge: listan lever bara tills sidan stängs */ } };

  const plusIcon = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => (k === 'html' ? (node.innerHTML = v) : node.setAttribute(k, v)));
    node.append(...children);
    return node;
  };

  // Det som redan ingår i rätten får "Extra" framför sig
  const onDish = (dish, extra) => (dish.ingredients || []).some((i) => (ALIAS[i] || i) === extra.toLowerCase());
  const extraLabel = (dish, extra) => (onDish(dish, extra) ? `Extra ${extra.toLowerCase()}` : extra);
  const sauceText = (sauce) => (sauce === 'Vitlök' ? 'vitlökssås' : `${sauce.toLowerCase()} sås`);
  const label = (item) => (item.nr ? `Nr ${item.nr} ${item.name}` : item.name);
  const choices = (item) => {
    const text = [...item.extras.map((e) => extraLabel(item, e)), item.sauce && sauceText(item.sauce)].filter(Boolean).join(', ').toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  const sum = () => items.reduce((acc, item) => acc + item.price, 0);
  const hasExtras = () => items.some((item) => item.extras.length);

  const live = el('p', { class: 'visually-hidden', 'aria-live': 'polite' });
  const chip = (input, text) => el('label', { class: 'memo-chip' }, input, text);

  // --- Fönstret där man anpassar en rätt ---
  const customTitle = el('h2', { id: 'custom-title' });
  const customPrice = el('span', { class: 'dish-price' });
  const customIngredients = el('p', { class: 'memo-note' });
  const customBody = el('div');
  const confirmBtn = el('button', { type: 'button', class: 'button button-primary' });
  const cancelBtn = el('button', { type: 'button', class: 'memo-clear' }, 'Avbryt');
  const customClose = el('button', { type: 'button', class: 'memo-close', 'aria-label': 'Stäng' }, '×');
  const custom = el('dialog', { class: 'memo-dialog', 'aria-labelledby': 'custom-title' },
    el('div', { class: 'memo-head' }, customTitle, customClose),
    el('div', { class: 'memo-sub' }, customIngredients, customPrice),
    customBody,
    el('div', { class: 'memo-footer' }, confirmBtn, cancelBtn));

  let draft = null;      // det som väljs i fönstret just nu
  let editIndex = -1;    // -1 = ny rätt, annars platsen i listan som ändras
  let onAdded = null;

  const extraBox = (name, text) => {
    const box = el('input', { type: 'checkbox', value: name });
    box.checked = draft.extras.includes(name);
    box.addEventListener('change', () => {
      draft.extras = EXTRAS.filter((n) => (n === name ? box.checked : draft.extras.includes(n)));
      customBody.querySelectorAll('.memo-group').forEach((g) => g.updateCount());
    });
    return chip(box, text);
  };

  const openCustom = (dish, index = -1, added = null) => {
    draft = { ...dish, extras: [...(dish.extras || [])], sauce: dish.sauce || '' };
    editIndex = index;
    onAdded = added;
    customTitle.textContent = label(dish);
    customPrice.textContent = `${dish.price} kr`;
    customIngredients.textContent = dish.ingredientsText || '';
    confirmBtn.textContent = index < 0 ? 'Lägg i minneslistan' : 'Spara ändringarna';

    const sauces = el('fieldset', { class: 'memo-row' }, el('legend', {}, 'Sås'),
      ...['', ...SAUCES].map((name) => {
        const radio = el('input', { type: 'radio', name: 'memo-sauce', value: name });
        radio.checked = draft.sauce === name;
        radio.addEventListener('change', () => { draft.sauce = name; });
        return chip(radio, name || 'Ingen');
      }));

    const inDish = EXTRAS.filter((e) => onDish(dish, e));
    const more = inDish.length
      ? [el('fieldset', { class: 'memo-row' }, el('legend', {}, 'Mer av det som ingår'), ...inDish.map((e) => extraBox(e, extraLabel(dish, e))))]
      : [];

    // Övriga tillägg i hopfällda grupper; raden visar hur många som är valda i gruppen
    const groups = Object.entries(EXTRA_GROUPS).map(([group, names]) => {
      const rest = names.filter((n) => !inDish.includes(n));
      const count = el('span', { class: 'memo-count' });
      const details = el('details', { class: 'memo-group' }, el('summary', {}, group, count),
        el('div', { class: 'memo-chips' }, ...rest.map((n) => extraBox(n, n))));
      details.updateCount = () => {
        const n = rest.filter((r) => draft.extras.includes(r)).length;
        count.textContent = n ? `${n} ${n === 1 ? 'vald' : 'valda'}` : '';
      };
      details.updateCount();
      return details;
    });

    customBody.replaceChildren(sauces, ...more,
      el('p', { class: 'memo-group-title' }, 'Fler tillägg'), ...groups);
    custom.showModal();
    custom.scrollTop = 0;
  };

  confirmBtn.addEventListener('click', () => {
    const { extras, sauce } = draft;
    if (editIndex < 0) items.push({ ...draft });
    else items[editIndex] = { ...items[editIndex], extras, sauce };
    save(); render();
    live.textContent = editIndex < 0 ? `${draft.name} tillagd i minneslistan` : `${draft.name} ändrad`;
    custom.close();
    onAdded?.();
  });
  cancelBtn.addEventListener('click', () => custom.close());
  customClose.addEventListener('click', () => custom.close());

  // --- Fältet längst ner och själva minneslistan ---
  const barCount = el('span');
  const bar = el('button', { type: 'button', class: 'memo-bar', hidden: '' }, el('span', { class: 'memo-bar-label' }, 'Minneslista'), barCount);
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
  document.body.append(live, bar, dialog, custom);

  const render = () => {
    bar.hidden = items.length === 0;
    barCount.textContent = `${items.length} ${items.length === 1 ? 'rätt' : 'rätter'} · ${sum()} kr`;
    total.textContent = `Summa rätter: ${sum()} kr${hasExtras() ? ' · tillägg betalas i kassan' : ''}`;
    list.replaceChildren(...items.map((item, i) => {
      const edit = el('button', { type: 'button', class: 'memo-link', 'aria-label': `Ändra ${item.name}` }, 'Ändra');
      edit.addEventListener('click', () => openCustom(item, i));
      const remove = el('button', { type: 'button', class: 'memo-link', 'aria-label': `Ta bort ${item.name}` }, 'Ta bort');
      remove.addEventListener('click', () => { items.splice(i, 1); save(); render(); if (!items.length) dialog.close(); });
      return el('li', {},
        el('div', { class: 'memo-item-head' }, el('strong', {}, label(item)), el('span', { class: 'dish-price' }, `${item.price} kr`)),
        el('p', { class: 'memo-choices' }, choices(item) || 'Som på menyn'),
        el('div', { class: 'memo-item-actions' }, edit, remove));
    }));
  };

  // Ett plus vid varje rätt som har ett pris
  document.querySelectorAll('.dish-card').forEach((card) => {
    const priceEl = card.querySelector('.dish-price');
    if (!priceEl) return;
    const ingredientsText = card.querySelector('p')?.textContent.trim() || '';
    const dish = {
      nr: card.querySelector('.dish-number')?.textContent.trim() || '',
      name: card.querySelector('h4').textContent.trim(),
      price: parseInt(priceEl.textContent, 10),
      ingredientsText,
      ingredients: ingredientsText.toLowerCase().split(/,| och /).map((s) => s.trim()).filter(Boolean),
    };
    const add = el('button', { type: 'button', class: 'memo-add', 'aria-label': `Lägg till ${dish.name} i minneslistan`, html: plusIcon });
    add.addEventListener('click', () => openCustom(dish, -1, () => {
      add.classList.remove('is-added');
      void add.offsetWidth;   // starta om bekräftelsen vid flera tryck
      add.classList.add('is-added');
    }));
    priceEl.after(add);
  });

  const asText = () => [
    'Minneslista – Hedens Pizzeria',
    ...items.map((item, i) => `${i + 1}. ${label(item)} (${item.price} kr)${choices(item) ? ` – ${choices(item)}` : ''}`),
    `Summa rätter: ${sum()} kr${hasExtras() ? ' (tillägg betalas i kassan)' : ''}`,
    `Ring ${PHONE}`,
  ].join('\n');

  bar.addEventListener('click', () => { render(); dialog.showModal(); });
  closeBtn.addEventListener('click', () => dialog.close());
  [dialog, custom].forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));   // klick utanför rutan stänger
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
