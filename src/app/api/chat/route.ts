import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const aiMessage = response.choices[0].message.content;
    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { message: "Error communicating with AI" },
      { status: 500 }
    );
  }
}
