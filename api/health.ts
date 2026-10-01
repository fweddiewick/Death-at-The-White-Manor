import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    service: 'Death at The White Manor API',
    platform: 'Vercel Serverless Functions',
    timestamp: new Date().toISOString()
  });
}
