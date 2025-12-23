import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key Gemini não configurada" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageBase64 = req.body?.image;
    if (!imageBase64) {
      return res.status(400).json({ error: "Imagem não enviada" });
    }

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      },
      "Analise esta imagem e descreva o equipamento e possíveis usos em treino físico.",
    ]);

    const text = result.response.text();

    return res.json({
      success: true,
      result: text,
    });
  } catch (error: any) {
    console.error("Erro Gemini:", error);
    return res.status(500).json({
      error: "Erro visão",
      message: error.message || "Erro desconhecido",
    });
  }
}
