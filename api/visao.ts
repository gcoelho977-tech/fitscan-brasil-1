import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Imagem não enviada' });
    }

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_text', text: 'Analise a imagem enviada e descreva corretamente.' },
            {
              type: 'input_image',
              image_base64: image,
            },
          ],
        },
      ],
    });

    return res.json({
      success: true,
      result: response.output_text ?? 'Sem resposta',
    });
  } catch (err: any) {
    console.error('Erro OpenAI Vision:', err);
    return res.status(500).json({
      error: 'Erro visão',
      message: err.message,
    });
  }
}
