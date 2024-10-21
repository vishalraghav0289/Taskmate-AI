const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

// Set up OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint to interact with ChatGPT
app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Send request to OpenAI's API
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or another model, e.g., 'gpt-4'
      messages: [{ role: 'user', content: prompt }],
    });

    // Send the response back to the client
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});