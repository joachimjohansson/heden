# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hungry local guests in Göteborg, mostly on their phone, deciding what to eat right now. They want to see the menu and prices, check whether Hedens Pizzeria is open, and call to order or find their way there, with as little scrolling and reading as possible.

Secondary: the pizzeria's owner, who must recognise their own restaurant in the site and sign off on menu, prices and opening hours. When the two pull in different directions, the guest's needs win.

## Product Purpose

The website for Hedens Pizzeria, Wadmansgatan 4, 412 53 Göteborg. It exists to turn someone who is hungry into a phone call (031-20 70 95) or a visit. Success means a guest can find a dish, its price and today's opening hours, and start a call, within seconds on a phone. It also means the information shown is always correct.

It replaces the restaurant's older Hemsida24/BaseKit site at pizzeriaheden.se.

## Positioning

A neighbourhood pizzeria on Heden in central Göteborg. It has a long, numbered menu: 62 pizzas, from classics to "Köket rekommenderar" and house names like Hedens pizza, IFK Göteborg and Frölunda special. It also serves kebab, falafel and salads, and offers a gluten-free pizza base (not for calzones or family pizzas).

## Operating Context

- **Ordering:** by phone only, then pick-up or eating there. This is a deliberate decision. There is no web shop, online payment or delivery-app integration, now or planned.
- **Opening hours:**
  - Monday–Thursday 11.00–21.30
  - Friday–Saturday 11.00–22.00
  - Sunday 12.00–21.00

  The site shows "open now" from these hours in Swedish time, and supports one-off closed dates.
- **Language:** all content is in Swedish.

## Capabilities and Constraints

- **Hosting:** a static site (plain HTML, CSS and a little JavaScript, no build step) in the GitHub repo `joachimjohansson/heden`, published with GitHub Pages at https://joachimjohansson.github.io/heden/.
- **Domain:** moving pizzeriaheden.se to this site is planned but not done.
- **Pages:**
  - Start page: hero, quick info, menu cards and hours.
  - Menu page (`menu.html`): the full menu in static HTML, with sticky category tabs and per-category sub-tabs for the pizza groups.
- **Calling:** tap-to-call is everywhere, including a fixed call button on mobile.
- **Google and sharing:**
  - schema.org `Restaurant` data
  - Open Graph tags
  - share image (`assets/dela.png`)
  - favicon
- **Changing hours:** hours appear in two places in `index.html`, the visible hours card and the JSON-LD. Both must be updated together.
- **Grundsajt:** this site is also the first customer of the "grundsajt" template (`../grundsajt`), which builds sites like this one from a config file. This PRODUCT.md covers only Hedens; the template is a separate product.
- **Open with the owner:**
  - Dishes 14 and 44 are both "Mozzarella" with identical ingredients, and 41 "Inbakad Calzone" matches them.
  - Kycklingtallrik is 120 kr while the comparable kebab plate is 129 kr.
  - Family pizzas are mentioned but have no prices.
  - Drinks, sides and extra toppings are not on the menu.
  - Whether the owner has formally approved the new site is unconfirmed.

## Brand Commitments

- **Name:** "Hedens Pizzeria". The start page headline is "Pizzeria Heden", chosen by the site's author.
- **Contact details:** phone 031-20 70 95 and address Wadmansgatan 4, 412 53 Göteborg must stay exactly as given.
- **Menu:** dish numbers and names as transcribed from the restaurant's own menu (with spelling corrected, e.g. Margherita, Quattro Stagioni, Sorrento).

## Evidence on Hand

- **Menu:** the full menu with prices, transcribed from the old site in October 2026. It is in `menu.html` and in the saved pages `../Pizzor.htm` and `../Kebab & Falafel.htm`.
- **Illustrations:** the author's own drawings (pizza, pizza2, kebabtallrik, sallad) in `assets/`, and source PNGs in `../files/`.
- **Photos:**
  - Downloaded photos in the parent folder are of unknown origin and must not be used without confirming the rights.
  - There are no photos of Hedens' actual food or premises.
- **Not available, must not be invented:**
  - reviews, testimonials or ratings
  - founding year or history
  - awards
  - delivery area
  - drinks menu
  - family-pizza prices

## Product Principles

- **Phone first.** Every surface should make calling the easiest next step. The site's job ends when the guest calls or walks in.
- **Correct beats clever.** Menu, prices and hours are the product. Wrong information costs more than plain design, so facts come from the restaurant and are never padded or guessed.
- **Built for a hungry thumb.** Design for a phone, in a hurry, often with one hand. Scanning the menu and finding a price must be faster than on paper.
- **A real local place.** It should feel like this specific pizzeria on Heden, not a chain or a template. That comes through in its own dish names, its address and its hours, never through invented claims.
- **The owner can keep it right.** Changing a price, a dish or the hours must stay simple and live in one obvious place.

## Accessibility & Inclusion

- **Standard:** WCAG 2.1 AA is the working target, with text contrast of at least 4.5:1, including prices and button text.
- **Allergies:** guests with allergies are directed to call, and gluten-free availability must stay clearly stated.
- **Without JavaScript:** content must work without JavaScript. The menu is static HTML for that reason.
