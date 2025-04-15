
import OpenAI from 'openai';
import { Script } from '@/types/video';

let openai: OpenAI | null = null;

export const initializeScriptCritic = (apiKey: string) => {
  if (!openai) {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
};

export interface ScriptFeedback {
  hasSuggestions: boolean;
  suggestions: string[];
  improvedScript?: Script;
}

export const analyzeScript = async (script: Script, topic: string): Promise<ScriptFeedback> => {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please provide an API key first.');
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert script critic and editor for educational videos. 
          Analyze the provided script about "${topic}" and identify any issues with:
          1. Clarity and coherence
          2. Factual accuracy (if there are apparent errors)
          3. Engagement and pacing
          4. Structure and flow
          5. Language and tone
          
          If you find issues, provide specific suggestions for improvement. If the script is already very good, acknowledge this and only provide minor improvements if necessary.
          
          Format your response as JSON with the following structure:
          {
            "hasSuggestions": true/false,
            "suggestions": ["suggestion 1", "suggestion 2", ...],
            "improvedScript": {
              "title": "Improved title",
              "introduction": "Improved introduction",
              "body": "Improved body text",
              "conclusion": "Improved conclusion"
            }
          }
          
          Only include improvedScript if you have substantial improvements to make. If hasSuggestions is false, the suggestions array should be empty.`
        },
        {
          role: "user",
          content: `
          Title: ${script.title}
          
          Introduction:
          ${script.introduction}
          
          Body:
          ${script.body}
          
          Conclusion:
          ${script.conclusion}
          `
        }
      ],
      response_format: { type: "json_object" }
    });
    
    const result = JSON.parse(response.choices[0].message.content || '{}') as ScriptFeedback;
    
    // If an improved script was provided, generate the fullText field
    if (result.improvedScript) {
      result.improvedScript.fullText = `${result.improvedScript.title}\n\n${result.improvedScript.introduction}\n\n${result.improvedScript.body}\n\n${result.improvedScript.conclusion}`;
    }
    
    return result;
  } catch (error) {
    console.error("Error analyzing script:", error);
    throw new Error(`Failed to analyze script: ${error instanceof Error ? error.message : String(error)}`);
  }
};
