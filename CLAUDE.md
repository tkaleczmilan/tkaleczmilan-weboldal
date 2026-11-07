# Tkálecz Milán – saját bemutatkozó weboldal

## Kinek és mire
Tkálecz Milán egyéni vállalkozó (Komló, Pécs és környéke) saját oldala. Ezzel az oldallal keres meg helyi vállalkozásokat, akiknek elavult a weboldaluk, ezért az oldal maga a legfontosabb referenciája: legyen gyors, mobilon hibátlan és igényes.

Szolgáltatások, ebben a sorrendben:
1. **Weboldalak** – készítés és karbantartás (fő bevételi irány)
2. **Számítógépek** – építés, javítás, tisztítás, alkatrész-beszerzés, szoftveresen szinte minden rendszergazdai feladat
3. **Fotózás** – a RabidFox fotós-videós csapat tagjaként (rabidfox.hu, Instagram: @rabidfox.jpeg). Milán főleg portrét és autót fotóz.
4. **Egyéb IT** – szerverek, adatmentés, hálózat, karbantartás

## Jelenlegi állapot
- `index.html`: egyetlen fájl, minden CSS és JS benne. Nincs build-lépés.
- `img/`: webre optimalizált képek (max. 1600 px).
- Animációk: főcím szavanként beúszik, görgetésre beúszó részek (CSS scroll-driven), olvasási csík, referenciakártyák hoverre legörgetnek, terminál-animáció, lapozható galéria a felnis gépről, lightbox.
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
2. **Kapcsolati űrlap: kész.** FormSubmit AJAX (formsubmit.co/ajax/tkaleczmilan@gmail.com), honeypot, GDPR-jelölőnégyzet. Az első beküldés után a FormSubmit aktiváló emailt küld, azt Milánnak jóvá kell hagynia.
3. **Impresszum kitöltése.** A láblécben helyőrzők vannak: székhely, adószám, nyilvántartási szám. Ezeket Milán adja meg.
4. **Adatkezelési tájékoztató: kész** (`adatkezeles.html`), az impresszum-helyőrzőket itt is ki kell tölteni.
5. **SEO és megosztás: kész.** Cím, leírás, Open Graph, favicon, `ProfessionalService` JSON-LD, sitemap.xml, robots.txt. Domain: tkaleczmilan.hu (beírva).
6. **Teljesítmény:** képek WebP/AVIF változattal és `srcset`-tel, Lighthouse mobil pontszám 90 fölött.
7. **Élesítés:** GitHub + Vercel kész (tkaleczmilan-weboldal.vercel.app, rabid-fox csapat). Rackhost DNS beállítva (A 216.198.79.1, www CNAME cname.vercel-dns.com), a .hu regisztráció a Rackhostnál adathiba miatt függőben.

## Ellenőrzés
Minden változtatás után nézd meg az oldalt 390 px (telefon) és 1280 px széles nézetben, világos és sötét módban is. Ne legyen vízszintes görgetés.
