import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface GameNews {
  id: string;
  title: string;
  summary: string;
  category: 'Esports' | 'Hardware' | 'Releases' | 'Updates';
  date: string;
  imageUrl: string;
}

export interface GameReview {
  id: string;
  gameTitle: string;
  score: number;
  verdict: string;
  pros: string[];
  cons: string[];
  imageUrl: string;
}

export async function getLatestNews(): Promise<GameNews[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 6 realistic gaming news items for a gaming website. Include title, a short summary, a category (Esports, Hardware, Releases, or Updates), and a date. Return as JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Esports', 'Hardware', 'Releases', 'Updates'] },
              date: { type: Type.STRING },
              imageUrl: { type: Type.STRING }
            },
            required: ['id', 'title', 'summary', 'category', 'date']
          }
        }
      }
    });

    const news = JSON.parse(response.text || '[]');
    return news.map((item: any, index: number) => ({
      ...item,
      imageUrl: `https://picsum.photos/seed/gaming-news-${index}/800/450`
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export interface LiveStream {
  id: string;
  platform: 'Twitch' | 'YouTube';
  username: string;
  title: string;
  game: string;
  viewers: number;
  thumbnailUrl: string;
  streamUrl: string;
}

export async function getLiveStreams(): Promise<LiveStream[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 4 realistic live stream items for a gaming website. Include platform (Twitch or YouTube), username, a catchy stream title, the game being played, and a realistic viewer count. Return as JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              platform: { type: Type.STRING, enum: ['Twitch', 'YouTube'] },
              username: { type: Type.STRING },
              title: { type: Type.STRING },
              game: { type: Type.STRING },
              viewers: { type: Type.NUMBER }
            },
            required: ['id', 'platform', 'username', 'title', 'game', 'viewers']
          }
        }
      }
    });

    const streams = JSON.parse(response.text || '[]');
    return streams.map((item: any, index: number) => ({
      ...item,
      thumbnailUrl: `https://picsum.photos/seed/stream-${index}/800/450`,
      streamUrl: item.platform === 'Twitch' 
        ? `https://player.twitch.tv/?channel=${item.username}&parent=${window.location.hostname}`
        : `https://www.youtube.com/embed/live_stream?channel=${item.id}` // Mocked ID for YouTube
    }));
  } catch (error) {
    console.error("Error fetching streams:", error);
    return [];
  }
}

export async function getFeaturedReviews(): Promise<GameReview[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 3 detailed game reviews. Include game title, a score out of 10, a short verdict, 3 pros, and 3 cons. Return as JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              gameTitle: { type: Type.STRING },
              score: { type: Type.NUMBER },
              verdict: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['id', 'gameTitle', 'score', 'verdict', 'pros', 'cons']
          }
        }
      }
    });

    const reviews = JSON.parse(response.text || '[]');
    return reviews.map((item: any, index: number) => ({
      ...item,
      imageUrl: `https://picsum.photos/seed/game-review-${index}/800/450`
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}
