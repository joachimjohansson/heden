---
name: Hedens Pizzeria
description: Kvarterspizzerian på Heden i Göteborg – meny, öppettider och ring och beställ.
colors:
  san-marzano: "#bc4734"
  san-marzano-deep: "#9d3829"
  oliv: "#1f4d33"
  oliv-leaf: "#415f42"
  deg: "#f6f1e7"
  deg-toasted: "#ece6d9"
  swoosh: "#ece4d3"
  card-white: "#fffdf8"
  ink: "#1d2d27"
  text-soft: "#58645e"
  muted: "#5c6862"
  line: "#ddd7ca"
  line-soft: "#e9e3d7"
  icon-bg: "#f0ebdf"
  open-green: "#56865b"
  closed-amber: "#d79a3d"
  card-pizza: "#e7d9bd"
  card-kebab: "#dbe2d4"
  card-salad: "#ebdfcc"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(62px, 7vw, 93px)"
    fontWeight: 600
    lineHeight: 0.98
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "45px"
    fontWeight: 600
    lineHeight: 0.98
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1
  dish:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  card: "13px"
  panel: "14px"
  pill: "99px"
  round: "50%"
spacing:
  page-padding: "56px"
  content-width: "1208px"
  page-width: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.san-marzano}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.san-marzano-deep}"
  button-phone:
    backgroundColor: "#faf7f0"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 20px"
  menu-card:
    backgroundColor: "{colors.card-pizza}"
    rounded: "{rounded.card}"
    padding: "19px"
    height: "300px"
  quick-info:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.panel}"
    padding: "0 32px"
---

# Design System: Hedens Pizzeria

## Overview

**Creative North Star: "Kvarterets menytavla"**

Sidan ska läsas som tavlan bakom disken på en kvarterspizzeria: varm, tydlig och utan omvägar. Det viktigaste står störst – vad det finns att äta, vad det kostar, om det är öppet och hur man ringer. Allt annat är tyst bakgrund på ett krämvitt "deg"-papper.

Tonen är vänlig och lokal, aldrig trendig. Ett enda typsnitt, Bricolage Grotesque, bär allt från rubrik till pris, och hierarkin byggs med storlek och färg, inte med fler typsnitt. Tomatrött (San Marzano) är handlingsfärgen; mörkgrönt (Oliv) är rubrikfärgen. Pizzafotot är sidans enda riktiga bild och får ta plats.

Tätheten är måttlig: luftig i toppen där besökaren bestämmer sig, tät och skannbar i menyn där de letar.

**Key Characteristics:**
- Ett typsnitt, fem storlekar (93/45/28/22/17 px) och nästan bara vikt 600 och 400.
- Tomatröd endast för handling och pris; grönt för rubriker.
- Krämvitt papper med varma, nästan osynliga skuggor.
- Runda knappar, mjukt rundade kort.
- Telefonnumret finns alltid inom räckhåll, på mobilen som fast knapp.

## Colors

Varm italiensk kökspalett: tomat, oliv och mjöl, med dämpade jordtoner för korten.

### Primary
- **San Marzano** (#bc4734): knappar, priser, rätternas nummer, textlänkar och "Heden" i rubriken. Allt som betyder "gör något" eller "kostar något".
- **San Marzano mörk** (#9d3829): hovring på knappar och länkar som ligger på svepet.

### Secondary
- **Oliv** (#1f4d33): alla rubriker h1–h3 (minst 6,9:1 mot alla bakgrunder).
- **Olivblad** (#415f42): ikoner och små detaljer.

### Neutral
- **Deg** (#f6f1e7): sidans bakgrund.
- **Rostad deg** (#ece6d9) och **Svep** (#ece4d3): bakgrund för "Hitta hit" och svepet överst.
- **Kortvit** (#fffdf8): snabbinforutan.
- **Bläck** (#1d2d27): brödtext och rätternas namn.
- **Mjuk text** (#58645e) och **Dämpad** (#5c6862): hjälptexter, klarar 4,5:1.
- **Linje** (#ddd7ca) och **Mjuk linje** (#e9e3d7): ramar och avdelare.
- **Menykorten**: Pizza (#e7d9bd), Kebab (#dbe2d4), Sallad (#ebdfcc).
- **Öppet** (#56865b) och **Stängt** (#d79a3d): bara för statusprickarna.

### Named Rules
**The Tomato Means Action Rule.** San Marzano används bara för knappar, priser, nummer och länkar. Aldrig som dekor eller bakgrundsyta.

**The Green Heads Rule.** Rubriker är Oliv; rätternas namn är Bläck, så att menyn förblir lugn att läsa.

## Typography

**Display Font:** Bricolage Grotesque (med system-ui, sans-serif)
**Body Font:** Bricolage Grotesque (med system-ui, sans-serif)

**Character:** En vänlig grotesk med lite egen personlighet i de stora graderna, som en handmålad skylt; neutral och lättläst i brödtext.

### Hierarchy
- **Display** (600, clamp(62px, 7vw, 93px), 0.98; 68px på mobil): "Pizzeria Heden" och "Menyn". Bara en per sida.
- **Headline** (600, 45px, 0.98): sektionsrubriker, även på mobil.
- **Title** (600, 28px, 1): menykort, öppettider och menygrupper.
- **Dish** (600, 22px, 1.25): rätternas namn i menyn.
- **Body** (400, 17px, 1.5): all löptext.
- **Label** (600, 17px): navigering, knappar, överrader, adressrad och loggans namn.

### Named Rules
**The Five Sizes Rule.** Nya element får någon av storlekarna 93 (68), 45, 28, 22 eller 17 px. Symboler är 20 px. Undantag kräver ett beslut, inte en känsla.

**The 600 Rule.** Vikt 500 används inte. Text är antingen 400 eller 600.

## Layout

Innehållet ligger i en kolumn på max 1208 px (sidhuvud och topp 1320 px) med 56 px luft på sidorna. Startsidan går uppifrån och ned: topp med pizza, snabbinfo, menykort, öppettider och sidfot. Menysidan har klistrade flikar högst upp och menygrupperna i två kolumner.

Brytpunkter vid 850 px (surfplatta: snabbinfon i två kolumner) och 620 px (mobil: en kolumn, snabbinfon döljs, fast ringknapp längst ner, pizzan rak och centrerad).

## Elevation & Depth

Nästan platt. Djup skapas av papperstoner och mycket svaga, varma skuggor. Rutor vilar med en knappt synlig skugga; menykort lyfter 4 px vid hovring. Pizzafotot har en mjuk droppskugga så att den ligger på sidan.

### Shadow Vocabulary
- **Viloskugga** (`box-shadow: 0 10px 30px #382b1208`): snabbinfo och öppettidskort.
- **Hovringslyft** (`box-shadow: 0 15px 30px #1d2d271a`): menykort under muspekare.
- **Fast ringknapp** (`box-shadow: 0 6px 18px #1d2d2730`): mobilens ringknapp, som måste synas över allt.
- **Pizzaskugga** (`filter: drop-shadow(0 22px 18px color-mix(in srgb, #493d27 24%, transparent))`): fotot i toppen.

### Named Rules
**The Barely There Rule.** Skuggor ska kännas, inte synas. Ingen skugga mörkare än 20 % utom ringknappen.

## Shapes

Mjukt och vänligt. Knappar är helt runda (99px), kort har 13 px hörn och större rutor 14 px. Ikonplattor och loggans "H" är cirklar. Inga skarpa hörn och inga streckade ramar.

## Components

### Buttons
- **Shape:** helt rundade (99px).
- **Primary:** San Marzano med vit text, 14px 20px, vikt 600.
- **Hover / Focus:** lyfter 2 px och mörknar till San Marzano mörk; bara på enheter med muspekare. Ingen rörelse vid reducerad rörelse.
- **Telefon:** ljus yta (#faf7f0) med tunn linje och Bläck-text, bredvid huvudknappen.

### Cards / Containers
- **Menykort:** 300 px höga, 13 px hörn, en egen jordton per kategori, foto och text i nederkanten; lyfter vid hovring.
- **Snabbinfo:** Kortvit ruta med 14 px hörn, tunn mjuk linje och viloskugga; tre kolumner med status, telefon och adress.

### Navigation
- Text i vikt 600, 17 px, Bläck; blir San Marzano vid hovring. Loggan är en röd cirkel med "H" och "Hedens Pizzeria" på en rad. På menysidan finns klistrade flikar; den valda är ifylld mörkgrön.

### Ringknapp (signaturkomponent)
Fast i nederkanten på mobilen, San Marzano, helt rundad, med numret 031-20 70 95. Den viktigaste handlingen på sajten ska alltid vara ett tumtryck bort.

## Do's and Don'ts

### Do:
- **Do** använd San Marzano (#bc4734) för allt som är en handling eller ett pris.
- **Do** håll dig till de fem textstorlekarna och vikterna 400/600.
- **Do** visa telefonnumret exakt som 031-20 70 95 och adressen som Wadmansgatan 4, 412 53 Göteborg.
- **Do** låt pizzafotot vara den stora bilden i toppen.

### Don't:
- **Don't** lägg till ett andra typsnitt eller vikt 500.
- **Don't** använd tomatrött som bakgrundsyta eller dekoration.
- **Don't** använd skuggor som syns tydligt, utom på mobilens ringknapp.
- **Don't** använd foton av okänt ursprung; det finns inga egna foton av mat eller lokal.
