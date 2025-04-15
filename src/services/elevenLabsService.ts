
import { AudioSettings, ElevenLabsVoice } from '../types/video';

// Default voices to select from
export const DEFAULT_VOICES: ElevenLabsVoice[] = [
  { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria" },
  { voice_id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { voice_id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
  { voice_id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
  { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
  { voice_id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
  { voice_id: "SAz9YHcvj6GT2YYXdXww", name: "River" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
];

// Default models
export const MODELS = [
  { id: "eleven_multilingual_v2", name: "Multilingual v2 (High Quality)" },
  { id: "eleven_turbo_v2", name: "Turbo v2 (Fast)" }
];

// Service class
export class ElevenLabsService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async getVoices(): Promise<ElevenLabsVoice[]> {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': this.apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`);
      }
      
      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error("Error fetching voices:", error);
      return DEFAULT_VOICES; // Fallback to default voices if API fails
    }
  }
  
  async textToSpeech(
    text: string, 
    settings: AudioSettings
  ): Promise<ArrayBuffer> {
    try {
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${settings.voice}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: settings.model,
          voice_settings: {
            stability: settings.stability,
            similarity_boost: settings.clarity,
            style: 0.0,
            use_speaker_boost: true,
            speaking_rate: settings.speed
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`ElevenLabs API error: ${errorData.detail?.message || response.statusText}`);
      }
      
      return await response.arrayBuffer();
    } catch (error) {
      console.error("Text to speech error:", error);
      throw new Error(`Text to speech failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
