// Kapcsolati űrlap → email a Resenden keresztül (ugyanúgy, mint a rabidfox.hu-n).
// Szükséges környezeti változó a Vercelen: RESEND_API_KEY
// Opcionális: CONTACT_TO (alapból tkaleczmilan@gmail.com), CONTACT_FROM (feladó, ellenőrzött domainről)

const TO = process.env.CONTACT_TO || "tkaleczmilan@gmail.com";
const FROM = process.env.CONTACT_FROM || "Tkálecz Milán weboldal <weboldal@rabidfox.hu>";
const TOPICS = ["Weboldal", "Számítógép", "Fotózás", "Egyéb IT", "VHS digitalizálás"];

const esc = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Csak POST kérés engedélyezett." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== "object") return res.status(400).json({ error: "Hibás kérés." });

  // Spamvédelem: a rejtett mezőt csak robotok töltik ki. Nekik sikert mondunk, de nem küldünk semmit.
  if (body._honey) return res.status(200).json({ success: true });

  const name = String(body.nev || "").trim().slice(0, 120);
  const contact = String(body.elerh || "").trim().slice(0, 160);
  const topic = TOPICS.includes(body.tema) ? body.tema : "Egyéb";
  const message = String(body.uzenet || "").trim().slice(0, 5000);
  const consent = body.adatkezeles === "elfogadva";

  if (!name || !contact || !message) return res.status(400).json({ error: "Kérlek, tölts ki minden mezőt." });
  if (!consent) return res.status(400).json({ error: "Az adatkezelési tájékoztató elfogadása kötelező." });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("api/contact: RESEND_API_KEY nincs beállítva");
    return res.status(500).json({ error: "Az üzenetküldés jelenleg nem elérhető." });
  }

  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const html = `
    <div style="font-family:sans-serif;line-height:1.6;color:#1a1a1a">
      <h2 style="margin:0 0 16px">Új üzenet a weboldalról</h2>
      <p><strong>Név:</strong> ${esc(name)}</p>
      <p><strong>Elérhetőség:</strong> ${esc(contact)}</p>
      <p><strong>Téma:</strong> ${esc(topic)}</p>
      <p><strong>Üzenet:</strong></p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
      <p style="color:#888;font-size:12px">Az adatkezelési tájékoztatót elfogadta.</p>
    </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        ...(emailLike ? { reply_to: contact } : {}),
        subject: `Új üzenet a weboldalról: ${topic} – ${name}`,
        html,
      }),
    });
    if (!r.ok) {
      console.error("api/contact: Resend hiba", r.status, await r.text());
      return res.status(502).json({ error: "Nem sikerült elküldeni az üzenetet." });
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error("api/contact", e);
    return res.status(500).json({ error: "Nem sikerült elküldeni az üzenetet." });
  }
};
