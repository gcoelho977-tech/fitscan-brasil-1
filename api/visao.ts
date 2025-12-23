import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req, res) {
  try {
    const { imageBase64 } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Isso é um equipamento de academia? Responda apenas SIM ou NÃO." },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      resultado: response.choices[0].message.content,
    });
  } catch (error: any) {
  console.error("ERRO REAL VISÃO:", error);
  return res.status(500).json({
    error: "Erro visão",
    message: error?.message || String(error),
  });
}

