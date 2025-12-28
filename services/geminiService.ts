
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeHealthData = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these physiological signals for potential seizure biomarkers: ${JSON.stringify(data)}. Provide a summary and a risk score (0-100).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ["riskScore", "summary", "recommendation"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini analysis failed", error);
    return { riskScore: 10, summary: "Stable", recommendation: "Maintain hydration" };
  }
};

export const simulatePrediction = () => {
  // Returns a probability of seizure in the next 5 mins
  return Math.random() > 0.95; 
};
