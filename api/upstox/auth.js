// Upstox OAuth Authentication Handler
// Vercel Serverless Function

const UPSTOX_API_KEY = process.env.UPSTOX_API_KEY || 'YOUR_API_KEY';
const REDIRECT_URI = process.env.REDIRECT_URI || 'https://surenholkar9-maker.github.io/soorya-trading/callback';
const UPSTOX_AUTH_URL = 'https://api.upstox.com/v2/login/authorization/dialog';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Generate OAuth authorization URL
    const state = 'soorya_' + Math.random().toString(36).substr(2, 9);
    const authUrl = `${UPSTOX_AUTH_URL}?client_id=${UPSTOX_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&state=${state}&scope=read%20write`;
    
    res.status(200).json({
      success: true,
      auth_url: authUrl,
      state: state,
      message: 'OAuth URL generated successfully'
    });
  } else if (req.method === 'POST') {
    // Exchange authorization code for access token
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }
    
    // TODO: Exchange code for token using Upstox API
    res.status(200).json({
      success: true,
      message: 'Token exchange initiated',
      code: code
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
