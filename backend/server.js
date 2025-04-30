// server.js - MOCK BACKEND
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL 
}));
app.use(express.json());

// --- MOCK /api/create-order Endpoint ---
app.post('/api/create-order', (req, res) => {
  const { amount } = req.body; 
  console.log('[MOCK] Received request to create order for amount:', amount);

  if (!amount || isNaN(amount) || amount <= 0) {
    console.error('[MOCK] Invalid amount:', amount);
    return res.status(400).json({ error: 'Invalid amount specified.' });
  }

  // Generate a fake order ID (doesn't interact with Razorpay)
  const mockOrderId = `mock_order_${Date.now()}`;
  console.log('[MOCK] Sending mock order details:', { order_id: mockOrderId, amount: amount, currency: 'INR' });

  // Send back MOCK details
  res.json({
    order_id: mockOrderId,
    amount: amount, 
    currency: 'INR' 
  });
});

// --- MOCK /api/verify-payment Endpoint ---
app.post('/api/verify-payment', (req, res) => {
   console.log("[MOCK] Received verification request:", req.body);
   // In a real backend, you would verify the signature here.
   // For mock purposes, we assume it's always successful.
   console.log("[MOCK] Sending mock success verification.");
   res.json({ status: 'success', message: 'Mock verification successful!' });
});


app.listen(port, () => {
  console.log(`Mock backend server listening at http://localhost:${port}`);
  console.log('!!! THIS IS A MOCK SERVER - IT DOES NOT PROCESS REAL PAYMENTS !!!');
});
