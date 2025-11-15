// app/api/chat/route.ts (or similar)

import { NextRequest, NextResponse } from "next/server";
import {
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";
import { ChatRequest, ChatResponse } from "@/types/chat";
import { books } from "./books";

export const runtime = "nodejs"; // ensure Node runtime, not edge

// Initialize Vertex AI client once (module-level)
let serviceAccountJson: any | undefined;
if (process.env.GS_CREDENTIALS_BASE_64) {
  const jsonStr = Buffer.from(
    process.env.GS_CREDENTIALS_BASE_64,
    "base64",
  ).toString("utf8");
  serviceAccountJson = JSON.parse(jsonStr);
}

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: process.env.GOOGLE_CLOUD_REGION || "us-central1",
  // Either use keyFilename or rely on ADC (GOOGLE_APPLICATION_CREDENTIALS)
  googleAuthOptions: serviceAccountJson
    ? { credentials: serviceAccountJson }
    : undefined,
});

// Use preview.* only if you're using a preview-only model.
// For gemini-1.5-flash this is not required.
const model = vertexAI.getGenerativeModel({
  model: process.env.VERTEX_AI_MODEL || "gemini-1.5-flash-001",
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.7,
    topP: 0.8,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  systemInstruction: {
    role: "system",
    parts: [
      { text: books[0] },
      { text: books[1] },
      {
        text: "Use the provided books strictly as context. Always respond in Arabic, ensuring clarity and accuracy. Avoid adding information not derived from the books.",
      },
    ],
  },
});

export async function POST(request: NextRequest) {
  try {
    const { messages = [], message }: ChatRequest = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // Format conversation history for Vertex AI
    const history = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Start chat session with history
    const chat = model.startChat({ history });

    // Send the current message
    const result = await chat.sendMessage(message);
    const response = result.response;

    // Safely extract the text
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const aiMessage =
      parts
        .map((p: any) => p.text)
        .filter(Boolean)
        .join("") || "Sorry, I could not generate a response.";

    const chatResponse: ChatResponse = {
      message: aiMessage,
    };

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error("Vertex AI API Error:", error);

    let errorMessage = "An error occurred while processing your request.";

    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("auth") || msg.includes("credential")) {
        errorMessage =
          "Authentication failed. Please check your service account credentials and GOOGLE_CLOUD_PROJECT_ID / region.";
      } else if (msg.includes("project")) {
        errorMessage =
          "Invalid project configuration. Please check your Google Cloud project ID.";
      } else if (msg.includes("quota") || msg.includes("limit")) {
        errorMessage = "API quota exceeded. Please try again later.";
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
