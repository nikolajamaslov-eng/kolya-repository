// Kolya AI Server for Roblox
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 PUT YOUR TOKEN HERE (replace with real token)
const HF_TOKEN = 'hf_your_new_token_here';
const MODEL = 'microsoft/DialoGPT-medium';

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.json({ response: "🤖 Please send a message!" });
    }
    
    // Call Hugging Face
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: message,
        parameters: { max_length: 100 }
      },
      {
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    let aiText = response.data?.[0]?.generated_text || "Hello! I'm KolyaM2021Roblox!";
    
    // Clean up response
    if (aiText.includes(message)) {
      aiText = aiText.replace(message, '').trim();
    }
    
    if (!aiText) aiText = "Interesting! Tell me more!";
    
    res.json({ response: `🤖 ${aiText}` });
    
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ response: "🤖 Kolya is thinking... try again in a moment!" });
  }
});

app.get('/', (req, res) => {
  res.send('🎮 KolyaM2021Roblox AI Server - Ready for Roblox!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
