# Idéer

Tankar som inte är bestämda än. Varje idé är märkt med om den gäller **Heden**, **Grundsajt** (mallen i `../grundsajt`) eller båda.

---

## Kunden uppdaterar priserna själv

**Gäller:** Heden och Grundsajt
**Status:** Idé, inte påbörjad

### Problemet
Priserna står direkt i `menu.html`, så varje prisändring måste gå via oss. Kunden är en pizzabagare som vill ha det enkelt. Oftast handlar det om att höja alla pizzor med 10 kr eller ändra ett par enskilda priser.

### Förslag: ett Google-kalkylark styr menyn
1. **Kalkylark** med en rad per rätt och kolumnerna *Nr, Namn, Innehåll, Pris, Kategori*. Kunden ändrar i Sheets-appen i mobilen och behöver inget nytt konto eller verktyg.
2. **GitHub Action** som hämtar arket som CSV, bygger om menyn och committar till `main`. GitHub Pages publicerar sedan som vanligt. Den körs varje natt och kan även köras direkt via en knapp "Publicera" i arket, med Apps Script som anropar workflow-dispatch.
3. **Spärrar** så att inget konstigt går ut:
   - Priset måste vara ett tal inom ett rimligt spann, till exempel 20–500 kr.
   - Försvinner fler än ett par rätter på en gång stoppas publiceringen.
   - Om något stoppas lämnas sajten orörd och vi får ett mejl.
4. Gärna ett enkelt sätt att höja alla priser i en kategori på en gång.

Menyn ska fortfarande vara vanlig HTML i den publicerade sidan, så att den syns för Google och fungerar utan JavaScript. Därför bygger skriptet sidan när arket ändras och läser inte arket i webbläsaren.

### Varför inte "skicka in en meny och låt ett skript sköta resten"?
Att fota eller skicka en PDF av menyn och låta ett skript eller en AI läsa av den är lockande men riskabelt. Läses 129 av som 139 går felet ut utan att någon märker det, och fel pris ger bråk i kassan. Dessutom blir det fler delar som kan gå sönder.

**Möjlig senare variant:** kunden sms:ar eller mejlar "Hawaii 135, Kebabpizza 145". Ett skript tolkar det och svarar med vad som kommer att ändras, och publicerar först när kunden svarat JA. Det är värt att bygga först om kalkylarket visar sig vara för krångligt.

### Det som behöver göras först
- **Heden:** flytta ut rätterna från `menu.html` till en datafil, till exempel CSV eller JSON, och generera `<article class="dish-card">`-korten från den.
- **Grundsajt:** mallen bygger redan sajter från en konfigurationsfil. Kalkylarket kan då bli ännu en källa till den filen, så att alla kunder på mallen får prisuppdateringar på köpet. Det är troligen där idén hör hemma på sikt.

### Öppna frågor
- Vem äger kalkylarket, vi eller kunden?
- Ska ändringar publiceras direkt eller en gång per natt?
- Behövs samma sak för öppettiderna? De står i dag i `index.html` på två ställen.
