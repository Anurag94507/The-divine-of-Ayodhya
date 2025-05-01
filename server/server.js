// server.js - MOCK BACKEND
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
const FRONTEND_URL = 'https://3000-idx-ayodhya-blossom-experiencegit-1745048503773.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev';

// Middleware
const corsOptions = {
  origin: FRONTEND_URL, // Replace with your actual frontend URL for production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to send cookies (not needed here)
};

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON request bodies

// --- MOCK /api/send-message Endpoint ---
app.post('/api/send-message', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL); // Explicitly set header
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const { name, email, phone, subject, message } = req.body;
  console.log('[MOCK] Received contact form submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Subject:', subject);
  console.log('Message:', message);

  // In a real backend, you would:
  // 1. Validate the data.
  // 2. Sanitize the data to prevent injection attacks.
  // 3. Store the message in a database.
  // 4. Send an email notification.

  // For mock purposes, we just send a success response.
  res.json({ success: true, message: 'Message received successfully (mock)!' });
});

app.listen(port, () => {
  console.log(`Mock backend server listening at http://localhost:${port}`);
});
