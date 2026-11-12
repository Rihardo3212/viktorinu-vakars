# Viktorīnu vakars

Jeopardy tipa jautājumu un atbilžu spēles vietne pasākumiem.
Kursa darbs "Web sistēmu izstrādes projekts", LBTU, 2026./2027. m.g. Autors: R. S.

## Kā atvērt

1. Atver mapi `viktorinu-vakars`.
2. Atver `index.html` jebkurā mūsdienīgā pārlūkā (Chrome, Firefox, Edge).

Ieteicams Chrome vai Edge. Failiem, kas atvērti tieši no datora, localStorage darbība nav vienāda visos pārlūkos.
Ja citā pārlūkā rezultātu vēsture vai pašu veidotā spēle starp lapām nesaglabājas,
atver vietni ar VS Code paplašinājumu "Live Server" vai publicēto versiju.

Serveris nav vajadzīgs. Bootstrap un ikonas ir mapē `vendor`, tāpēc vietne strādā arī bez interneta.
Internets vajadzīgs tikai Google Fonts fontiem un kartei lapā "Kontakti".

## Kā mainīt dizainu (SCSS)

Stili tiek rakstīti mapē `scss` un kompilēti uz `css/style.css`.

**VS Code:** uzinstalē paplašinājumu "Live Sass Compiler", atver `scss/main.scss` un nospied "Watch Sass" apakšējā joslā.
Iestatījumos norādi, ka rezultāts jāsaglabā mapē `/css` ar nosaukumu `style.css`.

**Komandrinda** (vajag Node.js):

```
npx sass scss/main.scss css/style.css --no-source-map
```

## Failu struktūra

```
index.html              sākumlapa
spelet.html             spēles iestatīšana (forma)
spele.html              spēles laukums
rezultati.html          rezultātu vēsture
izveidot.html           savas spēles redaktors
noteikumi.html          noteikumi un BUJ
temas.html              tēmu krājumu katalogs
tema-latvija.html       krājums "Latvija"
tema-sports.html        krājums "Sports"
tema-kino-muzika.html   krājums "Kino un mūzika"
tema-pasaule.html       krājums "Pasaule"
tema-zinatne.html       krājums "Zinātne un tehnoloģijas"
tema-ediens.html        krājums "Ēdiens un dzērieni"
pasakumiem.html         padomi pasākuma sarīkošanai
pieteikums.html         forma "Piedāvā jautājumu"
galerija.html           attēlu galerija
par-mums.html           par projektu
kontakti.html           kontakti, karte, atsauksmju forma

scss/   _variables, _mixins, _base, _layout, _components, _game, main
css/    style.css (kompilēts no SCSS)
js/     main.js, game.js, editor.js, validation.js
data/   question-sets.js (6 krājumi, 150 jautājumi)
img/    SVG ilustrācijas
vendor/ Bootstrap 5.3.3 un Bootstrap Icons 1.11.3
```

## Kur glabājas dati

Spēles stāvoklis, rezultāti un pašu veidotā spēle glabājas pārlūka `localStorage`.
Formas (pieteikums, atsauksme) tiek tikai pārbaudītas, dati nekur netiek sūtīti.

## Krāsu kontrasts (WCAG)

| Teksts / fons | Kontrasts |
|---|---|
| Pamatteksts #1d2333 uz #f7f8fc | 14,8 : 1 |
| Pelēkais teksts #5a6275 uz #f7f8fc | 5,8 : 1 |
| Zelts #f5c518 uz #0b1f4d | 9,8 : 1 |
| Zelts #f5c518 uz rūtiņas #16337a | 7,2 : 1 |
| Balts uz rūtiņas #16337a | 11,7 : 1 |

Visi pāri atbilst WCAG AA prasībai (vismaz 4,5 : 1).
