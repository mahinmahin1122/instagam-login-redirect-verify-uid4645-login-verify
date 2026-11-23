export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // গ্লোবাল ভ্যারিয়েবল থেকে ডেটা রিটার্ন করবে
  const data = global.capturedData || [];
  return res.status(200).json(data);
}
