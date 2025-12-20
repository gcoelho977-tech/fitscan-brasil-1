import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { imageBase64 } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Isso é um equipamento de academia? Responda SIM ou NÃO e diga qual é." },
            {
              type: "image_url",
              image_url: { url: imageBase64 },
            },
          ],
        },
      ],
    });

    const texto = response.choices[0].message.content;

    res.status(200).json({ resultado: texto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao analisar imagem" });
  }
}
