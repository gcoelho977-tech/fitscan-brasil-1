import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk;
    }

    const { objetivo, nivel, equipamento } = JSON.parse(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um personal trainer profissional.",
        },
        {
          role: "user",
          content: `
Crie um treino de academia.
Objetivo: ${objetivo}
Nível: ${nivel}
Equipamento disponível: ${equipamento}
`,
        },
      ],
    });

    res.status(200).json({
      treino: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar treino" });
  }
}
