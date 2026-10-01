import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoints (Parity with Vercel serverless /api routes)
  app.get('/api', (_req, res) => {
    res.json({
      message: 'Death at The White Manor API is active',
      platform: isProduction ? 'production-server' : 'ai-studio-preview',
      endpoints: ['/api/health', '/api/case', '/api/teams'],
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Death at The White Manor API',
      platform: 'Express / Node.js',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  app.get('/api/case', (_req, res) => {
    res.json({
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
  });

  app.get('/api/teams', (_req, res) => {
    res.json({
      teams: [
        { rank: 1, team: 'Red Syndicate', score: 940, lead: 'Inspector Drake' },
        { rank: 2, team: 'Blue Syndicate', score: 890, lead: 'Detective Sterling' },
        { rank: 3, team: 'Green Syndicate', score: 860, lead: 'Constable Thorne' },
        { rank: 4, team: 'Purple Syndicate', score: 820, lead: 'Agent Vance' },
        { rank: 5, team: 'Orange Syndicate', score: 790, lead: 'Investigator Hayes' },
        { rank: 6, team: 'Yellow Syndicate', score: 740, lead: 'Specialist Mercer' }
      ]
    });
  });

  if (!isProduction) {
    // Development mode: Vite middleware integration
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static bundle from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Express] Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Express] Server failed to start:', err);
  process.exit(1);
});
