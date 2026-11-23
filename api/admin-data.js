import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'captured_credentials.json');
  
  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]);
  }

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    return res.status(500).json({ error: "Failed to read data" });
  }
}
