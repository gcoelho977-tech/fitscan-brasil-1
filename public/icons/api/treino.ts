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
    const { objetivo, nivel, equipamento } = req.body;

    const prompt = `
Você é um personal trainer profissional.
Crie um treino baseado nesses dados:

Objetivo: ${objetivo}
Nível: ${nivel}
Equipamentos disponíveis: ${equipamento}

Se o equipamento não for de academia, diga claramente que não é possível gerar treino.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({
      treino: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar treino" });
  }
}
