import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    caseId: '17092026',
    title: 'Death at The White Manor',
    venue: 'Civil Service Club @ Changi (Fairy Point 3)',
    date: '17 September 2026',
    status: 'SOLVED & ARCHIVED',
    victim: 'Sir Reginald White',
    suspectsCount: 5,
    teamsCount: 6,
    champions: 'Team Red (1st Place)'
  });
}
