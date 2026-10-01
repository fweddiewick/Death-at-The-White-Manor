import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    teams: [
      { rank: 1, team: 'Red Syndicate', score: 940, lead: 'Inspector Drake' },
      { rank: 2, team: 'Blue Syndicate', score: 890, lead: 'Detective Sterling' },
      { rank: 3, team: 'Green Syndicate', score: 860, lead: 'Constable Thorne' },
      { rank: 4, team: 'Purple Syndicate', score: 820, lead: 'Agent Vance' },
      { rank: 5, team: 'Orange Syndicate', score: 790, lead: 'Investigator Hayes' },
      { rank: 6, team: 'Yellow Syndicate', score: 740, lead: 'Specialist Mercer' }
    ]
  });
}
