export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ pincodes: [640303, 720012, 630231, 532923] });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
