
import OpenAI from 'openai';
import { Script } from '../types/video';

// Initialize OpenAI client
// Note: User will need to provide their own API key through the UI
let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
  return openai;
};

export const generateScript = async (
  topic: string,
  lengthPreference: 'short' | 'medium' | 'long' = 'medium',
  tone: 'casual' | 'professional' | 'enthusiastic' = 'professional'
): Promise<Script> => {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please provide an API key first.');
  }
  
  const lengthInWords = {
    short: 300,
    medium: 600,
    long: 1200
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional scriptwriter creating engaging, informative content for educational videos.
          Write in a ${tone} tone. Create a video script with the following parts:
          1. An engaging introduction that hooks the viewer
          2. A well-structured body that explains key concepts and provides examples
          3. A conclusion that summarizes main points and provides closing thoughts
          
          Target script length: approximately ${lengthInWords[lengthPreference]} words total.
          Format the response as JSON with the following structure:
          {
            "title": "Catchy Title",
            "introduction": "Introduction text...",
            "body": "Main content...",
            "conclusion": "Conclusion text..."
          }`
        },
        {
          role: "user",
          content: `Create a video script about "${topic}"`
        }
      ],
      response_format: { type: "json_object" }
    });
    
    const scriptData = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      ...scriptData,
      fullText: `${scriptData.title}\n\n${scriptData.introduction}\n\n${scriptData.body}\n\n${scriptData.conclusion}`
    };
  } catch (error) {
    console.error("Error generating script:", error);
    throw new Error(`Failed to generate script: ${error instanceof Error ? error.message : String(error)}`);
  }
};
