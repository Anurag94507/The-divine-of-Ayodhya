// server.js
require('dotenv').config(); // Load environment variables first
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL // Allow requests only from your frontend URL
}));
app.use(express.json()); // To parse JSON request bodies

// --- /api/create-order Endpoint ---
app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body; // Amount should be in the smallest currency unit (e.g., paise)

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount specified.' });
  }

  const options = {
    amount: amount, // Amount in paise/cents
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`, // Create a unique receipt ID
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log('Razorpay Order Created:', order);
    // Send back only necessary details to the frontend
    res.json({
      order_id: order.id,
      amount: order.amount, // Pass the amount back
      currency: order.currency // Pass the currency back
      // DO NOT send the whole order object or your secret key!
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Could not create order.' });
  }
});

// --- Placeholder for /api/verify-payment ---
// You will need to implement this endpoint similarly,
// using crypto for signature verification as per Razorpay docs.
app.post('/api/verify-payment', (req, res) => {
   console.log("Received verification request:", req.body);
   // TODO: Implement signature verification using crypto and razorpay_signature
   // See Razorpay documentation for verifying payment signatures
   // If signature is valid:
   //    res.json({ status: 'success' });
   // Else:
   //    res.status(400).json({ status: 'failure', message: 'Invalid signature' });

   // For now, sending a placeholder success - THIS IS NOT SECURE
   res.json({ status: 'success', message: 'Verification placeholder - IMPLEMENT PROPERLY!' });
});


app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
