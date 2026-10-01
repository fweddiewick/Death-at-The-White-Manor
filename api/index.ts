import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    message: 'Death at The White Manor API is active',
    platform: 'Vercel Serverless Functions',
    endpoints: [
      '/api/health',
      '/api/case',
      '/api/teams'
    ],
    timestamp: new Date().toISOString()
  });
}
