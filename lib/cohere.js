import axios from 'axios';
import getEnvVars from '../config.js';
const COHERE_API_KEY = getEnvVars().COHERE_API_KEY;
const COHERE_CHAT_URL = 'https://api.cohere.ai/v1/chat';

export const getModelResponse = async (query) => {
  try {
    const response = await axios.post(
      COHERE_CHAT_URL,
      {
        model: 'command',
        message: query,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.text) {
      return response.data.text;
    } else {
      throw new Error('No response text received');
    }
  } catch (error) {
    console.error('Error querying Cohere API:', error);
    throw error;
  }
};
