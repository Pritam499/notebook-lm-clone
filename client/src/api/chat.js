import api from './index'; 

export async function sendChat(documentId, prompt, pdfText) {
  try {
    const response = await api.post('/chat', {
      prompt,
      pdfText,
      documentId, // optional: only include if needed by backend
    });

    const data = response.data;

    if (!data.answer || typeof data.answer !== 'string') {
      console.warn('Invalid chat response:', data);
      throw new Error('Chat answer is empty or invalid');
    }

    return {
      answer: data.answer,
      citations: data.citations || [],
    };
  } catch (error) {
    console.error('❌ Failed to fetch from backend:', error);
    throw new Error('❌ Failed to fetch from backend');
  }
}
