import axios from 'axios';

const COHERE_API_KEY = "BXwcyHn8jv7a1Rk1TxZmrIc7bTlmGKVHTsRgu53h";
const COHERE_STREAM_URL = 'https://api.cohere.ai/v1/chat-stream';

export const streamModelResponse = async (query, onTokenReceived) => {
  try {
    const response = await axios.post(
      COHERE_STREAM_URL,
      {
        model: 'command',
        message: query,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      }
    );

    response.data.on('data', (chunk) => {
      const lines = chunk
        .toString()
        .split('\n')
        .filter((line) => line.trim() !== '');
      lines.forEach((line) => {
        const json = JSON.parse(line.replace(/^data: /, ''));
        if (json.text) {
          onTokenReceived(json.text); // Call the callback with each token
        }
      });
    });

    response.data.on('end', () => {
      console.log('Stream ended');
    });

    response.data.on('error', (error) => {
      console.error('Stream error:', error);
    });
  } catch (error) {
    console.error('Error querying Cohere API:', error);
    throw error;
  }
};
