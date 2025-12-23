import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { idade, peso, altura, objetivo } = req.body;

    const prompt = `
Crie um treino de academia personalizado para uma pessoa com:
- Idade: ${idade}
- Peso: ${peso} kg
- Altura: ${altura} cm
- Objetivo: ${objetivo}

Monte um treino claro, organizado, com séries e repetições.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({
      treino: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar treino" });
  }
}
