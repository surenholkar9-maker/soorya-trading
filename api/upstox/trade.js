// Upstox Trade Execution Handler
// Vercel Serverless Function - Executes buy/sell orders

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
  
  if (req.method === 'POST') {
    const { token, symbol, quantity, price, order_type, side } = req.body;
    
    // Validate required fields
    if (!token || !symbol || !quantity || !price || !order_type || !side) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: token, symbol, quantity, price, order_type, side'
      });
    }
    
    // Validate side (BUY or SELL)
    if (!['BUY', 'SELL'].includes(side.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid side. Must be BUY or SELL'
      });
    }
    
    // Return demo order response
    // In production, this would execute trade via Upstox API
    const orderId = 'ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const tradeResponse = {
      success: true,
      data: {
        order_id: orderId,
        symbol: symbol.toUpperCase(),
        quantity: parseInt(quantity),
        price: parseFloat(price),
        side: side.toUpperCase(),
        order_type: order_type.toUpperCase(),
        status: 'PENDING',
        created_at: new Date().toISOString(),
        total_value: parseInt(quantity) * parseFloat(price)
      },
      message: `Order ${side.toUpperCase()} placed for ${quantity} shares of ${symbol.toUpperCase()} at ₹${price}`
    };
    
    res.status(200).json(tradeResponse);
  } else if (req.method === 'GET') {
    // Get order status
    const { order_id, token } = req.query;
    
    if (!order_id || !token) {
      return res.status(400).json({
        success: false,
        message: 'order_id and token are required'
      });
    }
    
    // Return demo order status
    res.status(200).json({
      success: true,
      data: {
        order_id: order_id,
        status: 'EXECUTED',
        filled_quantity: 10,
        average_price: 2850,
        executed_at: new Date().toISOString()
      },
      message: 'Order status fetched successfully'
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
