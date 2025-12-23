import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Imagem não enviada" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: image,
          mimeType: "image/jpeg",
        },
      },
      "Analise esta imagem de equipamento de academia e descreva o exercício correto.",
    ]);

    return res.status(200).json({
      success: true,
      result: result.response.text(),
    });
  } catch (err: any) {
    console.error("Erro Gemini:", err);
    return res.status(500).json({
      error: "Erro visão",
      message: err.message || "Falha interna",
    });
  }
}
