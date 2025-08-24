export default async function handler(req, res) {
  const upstream = "https://user26614.requestly.tech/test/api/currency";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const r = await fetch(upstream, { cache: "no-store" });
    const text = await r.text();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    res.status(r.status).send(text);
  } catch (e) {
    res.status(502).json({ message: "Upstream fetch failed", error: String(e) });
  }
}
