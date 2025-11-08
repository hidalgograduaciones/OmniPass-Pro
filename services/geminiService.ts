import { GoogleGenAI } from "@google/genai";
import { GuestRole } from "../types";

// This is a mock implementation. In a real application, you would use a secure way to handle API keys.
// The API_KEY is expected to be set in the environment variables.
const API_KEY = process.env.API_KEY;

// A simple check for the API key. In a real app, you would have more robust error handling.
if (!API_KEY) {
  console.warn("Gemini API key not found. Mock service will use placeholder data.");
}

// We initialize the client, but since we are mocking, we won't actually make a call if the key is missing.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

/**
 * Generates a creative event description using a mock Gemini API call.
 * @param eventName The name of the event to generate a description for.
 * @returns A promise that resolves to a string containing the event description.
 */
export const generateEventDescription = async (eventName: string, t: (key: string) => string): Promise<string> => {
  const prompt = `Create a short, exciting, and professional event description for an event called "${eventName}". Keep it under 50 words.`;

  if (!ai) {
    console.log("Using mock Gemini response for event description.");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`Join us for "${eventName}", an exclusive gathering of industry leaders and innovators. Experience networking, insightful talks, and a glimpse into the future. Don't miss out on this landmark event!`);
      }, 1000);
    });
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for event description:", error);
    return `An exclusive event: "${eventName}". More details to follow.`;
  }
};

/**
 * Generates a personalized welcome message for a guest at an event.
 * @param guestName The name of the guest.
 * @param eventName The name of the event.
 * @param role The role of the guest (e.g., VIP, Speaker).
 * @returns A promise that resolves to a personalized welcome message.
 */
export const generateWelcomeMessage = async (guestName: string, eventName: string, role: GuestRole): Promise<string> => {
    const prompt = `Generate a very short, elegant, and personalized welcome message for a guest named "${guestName}" who is attending "${eventName}" with the role of "${role}". The tone should be premium and welcoming. Max 2 sentences.`;

    if (!ai) {
        console.log("Using mock Gemini response for welcome message.");
        return new Promise(resolve => {
            setTimeout(() => {
                let message = `Welcome, ${guestName}. We are honored to have you at ${eventName}.`;
                if (role === 'VIP') message += " Please enjoy the exclusive amenities.";
                if (role === 'Speaker') message += " We eagerly await your presentation.";
                resolve(message);
            }, 1000);
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for welcome message:", error);
        return `Welcome, ${guestName}. We're delighted to have you at ${eventName}. Enjoy the event!`;
    }
};
