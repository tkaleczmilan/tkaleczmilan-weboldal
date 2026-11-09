# Tkálecz Milán – saját bemutatkozó weboldal

## Kinek és mire
Tkálecz Milán egyéni vállalkozó (Komló, Pécs és környéke) saját oldala. Ezzel az oldallal keres meg helyi vállalkozásokat, akiknek elavult a weboldaluk, ezért az oldal maga a legfontosabb referenciája: legyen gyors, mobilon hibátlan és igényes.

Szolgáltatások, ebben a sorrendben:
1. **Weboldalak** – készítés és karbantartás (fő bevételi irány)
2. **Számítógépek** – építés, javítás, tisztítás, alkatrész-beszerzés, szoftveresen szinte minden rendszergazdai feladat
3. **Fotózás** – a RabidFox fotós-videós csapat tagjaként (rabidfox.hu, Instagram: @rabidfox.jpeg). Milán főleg portrét és autót fotóz.
4. **Egyéb IT** – szerverek, adatmentés, hálózat, karbantartás

## Jelenlegi állapot
- Több oldal, build-lépés nélkül (Vercel `cleanUrls`):
  - `index.html` – főoldal: hős rész, „Miben segíthetek?” áttekintő kártyák (→ aloldalak), Fotózás (RabidFox, képek), Rólam, Kapcsolat
  - `weboldalak.html` – referenciák, (rejtett) előtte–utána csúszka, árazás és munkamenet
  - `szamitogepek.html` – hardver/szoftver, terminál-animáció, Felni PC galéria, gépfotók
  - `digitalizalas.html` – VHS-digitalizálás, TV-animáció
  - `it.html` – szerverek, hálózat, „Mit tud egy otthoni szerver?” kártyák
  - `adatkezeles.html` – adatkezelési tájékoztató
- Közös: `assets/style.css` (minden stílus), `assets/main.js` (minden szkript, elemenként null-biztos). A nav, a kapcsolat-szakasz és a lábléc minden oldalon szerepel (másolat): ha változik, MINDEN oldalon át kell írni.
- Az aloldalak `<body data-page-tema="…">` attribútuma előre kiválasztja az űrlap témáját.
- Mobilon hamburger-menü (`#menuBtn`).
- `img/`: webre optimalizált képek. `api/contact.js`: űrlap-küldés.
- Az „Előtte és utána” csúszka kész, de `hidden`, mert még nincs valódi régi–új pár. Ne töröld.
- Világos és sötét téma is van (CSS változók a `:root`-ban).

## Rögzített döntések (ne változtasd meg kérdés nélkül)
- **Nincs konkrét ár.** Az ár „megbeszélés alapján”.
- **Hangnem:** közvetlen, de profi. Rövid, egyszerű mondatok. Nincs marketinges vagy „AI-s” töltelékszöveg, nincs túlzás.
- Név mindenhol: **Tkálecz Milán** (hosszú á).
- Email: tkaleczmilan@gmail.com · Telefon: +36 30 243 6073
- „Számlaképes vállalkozás” szerepel a fejlécben és a kapcsolatnál.
- A portré szándékosan fej- és vállkép.

## Teendők
1. **Referencia-képernyőképek: kész** (`img/ref-*.jpg`, object-position görgetés hoverre, telefonon automatikusan). A DartsLiga képen a nevek, a szobakód és a QR-kód szándékosan ki van takarva, ezt új kép esetén is meg kell csinálni.
2. **Kapcsolati űrlap: működik.** `api/contact.js` Vercel-függvény, Resend REST API. Vercel env: `RESEND_API_KEY` (sensitive), `CONTACT_FROM` = „Tkálecz Milán weboldal <onboarding@resend.dev>” (Resend tesztfeladó, csak a Resend-fiók saját címére küld: tkaleczmilan@gmail.com). A rabidfox.hu ebben a Resend-fiókban NINCS ellenőrizve. Ha a tkaleczmilan.hu él, vedd fel a Resendben (Domains), a DNS-rekordokat a Rackhoston, majd `CONTACT_FROM` → hello@tkaleczmilan.hu. Honeypot és GDPR-jelölőnégyzet szerveroldalon is ellenőrizve.
3. **Impresszum: kész.** Székhely 7304 Mánfa, Árpád út 8., adószám 92309270-1-22, nyilvántartási szám 62716776. A székhely csak az impresszumban és az adatkezelési tájékoztatóban szerepel, máshol „Komló, Pécs és környéke”. Az adóazonosító jelet SOHA ne tedd ki az oldalra.
4. **Adatkezelési tájékoztató: kész** (`adatkezeles.html`).
5. **SEO és megosztás: kész.** Cím, leírás, Open Graph, favicon, `ProfessionalService` JSON-LD, sitemap.xml, robots.txt. Domain: tkaleczmilan.hu (beírva).
6. **Teljesítmény:** képek WebP/AVIF változattal és `srcset`-tel, Lighthouse mobil pontszám 90 fölött.
7. **Élesítés:** GitHub + Vercel kész (tkaleczmilan-weboldal.vercel.app, rabid-fox csapat). Rackhost DNS beállítva (A 216.198.79.1, www CNAME cname.vercel-dns.com), a .hu regisztráció a Rackhostnál adathiba miatt függőben.

## Ellenőrzés
Minden változtatás után nézd meg az oldalt 390 px (telefon) és 1280 px széles nézetben, világos és sötét módban is. Ne legyen vízszintes görgetés.
