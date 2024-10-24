import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in the environment variables');
    }

    console.log('Sending request to OpenAI...');
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: req.body.messages,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Received response from OpenAI:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.type === 'insufficient_quota') {
      res.status(402).json({
        error: 'OpenAI API quota exceeded. Please check your plan and billing details.',
        details: error.response.data
      });
    } else {
      res.status(500).json({ 
        error: 'An error occurred while processing your request.',
        details: error.response ? error.response.data : error.message
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});