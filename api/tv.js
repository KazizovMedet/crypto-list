export default async function handler(req, res) {
  try {
    const r = await fetch('https://s3.tradingview.com/tv.js', {
      headers: { 'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0' },
      cache: 'no-store',
    });
    if (!r.ok) {
      res.status(r.status).send(`Upstream error: ${r.statusText}`);
      return;
    }
    const js = await r.text();
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.status(200).send(js);
  } catch (e) {
    res.status(502).send('Proxy fetch failed: ' + (e?.message || e));
  }
}
