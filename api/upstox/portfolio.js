// Upstox Portfolio Fetch Handler
// Vercel Serverless Function - Returns portfolio data and holdings

const UPSTOX_API_BASE = 'https://api.upstox.com/v2';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Authorization token is required'
      });
    }
    
    // Return demo portfolio data
    // In production, this would fetch from Upstox API
    const portfolioData = {
      success: true,
      data: {
        total_value: 500000,
        current_value: 511750,
        day_change: 11750,
        day_change_percent: 2.35,
        invested_amount: 485000,
        realized_profit: 15000,
        unrealized_profit: 11750,
        holdings: [
          {
            symbol: 'RELIANCE',
            quantity: 10,
            buy_price: 2850,
            current_price: 2925,
            value: 29250,
            profit_loss: 750,
            profit_loss_percent: 2.63
          },
          {
            symbol: 'TCS',
            quantity: 5,
            buy_price: 3650,
            current_price: 3750,
            value: 18750,
            profit_loss: 500,
            profit_loss_percent: 2.74
          },
          {
            symbol: 'INFY',
            quantity: 15,
            buy_price: 1800,
            current_price: 1880,
            value: 28200,
            profit_loss: 1200,
            profit_loss_percent: 4.44
          }
        ]
      },
      message: 'Portfolio data fetched successfully'
    };
    
    res.status(200).json(portfolioData);
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
