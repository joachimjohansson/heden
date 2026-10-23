# Hedens Pizzeria — demo

En responsiv, statisk webbplats som publiceras direkt med GitHub Pages. Ingen byggkedja eller server behövs.

## Publicera på GitHub Pages

1. Öppna **Settings → Pages** i repot.
2. Under **Build and deployment**, välj **Deploy from a branch**, välj `main` och `/ (root)` och spara.

När sidan ska ersätta pizzeriaheden.se: lägg till domänen under **Settings → Pages → Custom domain** och peka om DNS hos domänleverantören. Byt då även adressen `https://joachimjohansson.github.io/heden/` i `og:`-taggarna och i Google-uppgifterna (JSON-LD) i `index.html` och `menu.html`.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `index.html` | Startsidan |
| `menu.html` | Hela menyn med priser |
| `styles.css` | Gemensam stil. Färger, typsnitt och mått står överst. |
| `menu.css` | Extra stil för menysidan |
| `app.js` | "Öppet just nu" och mobilmenyn på startsidan |
| `menu.js` | Räknar rätterna i flikarna och markerar var på menyn man är |
| `assets/` | Illustrationer, favicon och `dela.png` (bilden som visas när länken delas) |

## Vanliga ändringar

**Ändra eller lägga till en rätt:** öppna `menu.html` och leta upp rätten. Varje rätt är ett `<article class="dish-card">`. Kopiera ett befintligt kort för att lägga till en ny. Antalet i flikarna uppdateras av sig självt.

**Ny kategori på menyn:** lägg till en `<section class="menu-group" id="...">` och en länk med samma `#id` i flikraden (`menu-tabs-sub`) högst upp i `menu.html`.

**Öppettider:** ändra dem i öppettidskortet i `index.html` (se kommentaren där). "Öppet just nu" räknas ut från samma rader. Uppdatera även `openingHoursSpecification` högst upp i filen, så att Google visar rätt tider.

**Stängda dagar (helgdagar, semester):** skriv datumen i `data-closed` på öppettidskortet, t.ex. `data-closed="2026-12-24, 2026-12-25"`. Då visar sidan "Stängt idag" de dagarna.

**Färger:** ändra variablerna i avsnitt 1 överst i `styles.css`.

## Att kontrollera med pizzerian

- Nr 14 och nr 44 heter båda "Mozzarella" och har samma ingredienser. Nr 41 "Inbakad Calzone" har också samma ingredienser.
- Kycklingtallrik kostar 120 kr, kebabtallrik 129 kr.
- Familjepizza nämns i glutentexten men finns inte på menyn.
- Dryck, tillbehör och eventuell utkörning saknas.
