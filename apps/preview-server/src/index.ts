import express from 'express';
import { WebSocketServer } from 'ws';
import * as chokidar from 'chokidar';
import * as path from 'path';
import * as fs from 'fs';
import cors from 'cors';
import compression from 'compression';
import serveIndex from 'serve-index';
import { createServer } from 'http';

const app = express();
const PORT = process.env.PORT || 3001;

// Directories
const OUTPUT_DIR = path.join(process.cwd(), 'output');
const GENERATED_SITES_DIR = path.join(process.cwd(), '..', 'poc-generator', 'generated-sites');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(compression());

// Hot reload script injection middleware
const injectHotReloadScript = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const originalSend = res.send;
  res.send = function(data: any) {
    if (res.get('Content-Type')?.includes('text/html') && typeof data === 'string') {
      const hotReloadScript = `
        <script>
          (function() {
            const ws = new WebSocket('ws://localhost:${PORT}');
            ws.onmessage = function(event) {
              if (event.data === 'reload') {
                console.log('Reloading page...');
                window.location.reload();
              }
            };
            ws.onclose = function() {
              console.log('Lost connection to dev server. Attempting to reconnect...');
              setTimeout(() => window.location.reload(), 2000);
            };
          })();
        </script>
      `;
      data = data.replace('</body>', `${hotReloadScript}</body>`);
    }
    return originalSend.call(this, data);
  };
  next();
};

// Apply hot reload injection to all HTML responses
app.use(injectHotReloadScript);

// Serve generated sites from output directory
app.use('/sites', express.static(OUTPUT_DIR), serveIndex(OUTPUT_DIR, { icons: true }));

// Also serve from poc-generator directory if it exists
if (fs.existsSync(GENERATED_SITES_DIR)) {
  app.use('/legacy-sites', express.static(GENERATED_SITES_DIR), serveIndex(GENERATED_SITES_DIR, { icons: true }));
}

// Root route - show available sites
app.get('/', async (req, res) => {
  try {
    const sites: Array<{ name: string; path: string; modified: Date; size: string }> = [];
    
    // Get sites from output directory
    if (fs.existsSync(OUTPUT_DIR)) {
      const outputSites = fs.readdirSync(OUTPUT_DIR)
        .filter(file => fs.statSync(path.join(OUTPUT_DIR, file)).isDirectory());
      
      for (const site of outputSites) {
        const sitePath = path.join(OUTPUT_DIR, site);
        const stats = fs.statSync(sitePath);
        const sizeInKB = Math.round(getDirSize(sitePath) / 1024);
        
        sites.push({
          name: site,
          path: `/sites/${site}`,
          modified: stats.mtime,
          size: `${sizeInKB} KB`
        });
      }
    }
    
    // Get sites from legacy directory
    if (fs.existsSync(GENERATED_SITES_DIR)) {
      const legacySites = fs.readdirSync(GENERATED_SITES_DIR)
        .filter(file => fs.statSync(path.join(GENERATED_SITES_DIR, file)).isDirectory());
      
      for (const site of legacySites) {
        const sitePath = path.join(GENERATED_SITES_DIR, site);
        const stats = fs.statSync(sitePath);
        const sizeInKB = Math.round(getDirSize(sitePath) / 1024);
        
        sites.push({
          name: `${site} (legacy)`,
          path: `/legacy-sites/${site}`,
          modified: stats.mtime,
          size: `${sizeInKB} KB`
        });
      }
    }
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AWEMA Preview Server</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.6;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 0;
            margin: -2rem -2rem 2rem -2rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          h1 { 
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
          }
          .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
          }
          .stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 2rem;
          }
          .stat {
            text-align: center;
          }
          .stat-value {
            font-size: 2rem;
            font-weight: bold;
          }
          .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
          }
          .sites-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }
          .site-card {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
            display: block;
            border: 2px solid transparent;
          }
          .site-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-color: #667eea;
          }
          .site-name {
            font-size: 1.25rem;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 0.5rem;
          }
          .site-meta {
            display: flex;
            justify-content: space-between;
            color: #666;
            font-size: 0.9rem;
          }
          .no-sites {
            text-align: center;
            padding: 4rem 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .no-sites h2 {
            color: #667eea;
            margin-bottom: 1rem;
          }
          .no-sites p {
            color: #666;
            margin-bottom: 1.5rem;
          }
          .command {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', monospace;
            color: #e83e8c;
            border: 1px solid #dee2e6;
          }
          .status {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #28a745;
            margin-right: 0.5rem;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AWEMA Preview Server</h1>
            <p class="subtitle">Live preview of generated sites with hot reload</p>
            <div class="stats">
              <div class="stat">
                <div class="stat-value">${sites.length}</div>
                <div class="stat-label">Generated Sites</div>
              </div>
              <div class="stat">
                <div class="stat-value"><span class="status"></span>Live</div>
                <div class="stat-label">Server Status</div>
              </div>
              <div class="stat">
                <div class="stat-value">${PORT}</div>
                <div class="stat-label">Port</div>
              </div>
            </div>
          </div>
          
          ${sites.length > 0 ? `
            <div class="sites-grid">
              ${sites.map(site => `
                <a href="${site.path}" class="site-card">
                  <div class="site-name">${site.name}</div>
                  <div class="site-meta">
                    <span>${new Date(site.modified).toLocaleDateString()}</span>
                    <span>${site.size}</span>
                  </div>
                </a>
              `).join('')}
            </div>
          ` : `
            <div class="no-sites">
              <h2>No Sites Generated Yet</h2>
              <p>Generate your first site using the CLI:</p>
              <div class="command">pnpm generate --trade electricien --variant ultra-pro</div>
            </div>
          `}
        </div>
      </body>
      </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Error reading sites:', error);
    res.status(500).json({ error: 'Failed to read sites' });
  }
});

// Create HTTP server
const server = createServer(app);

// WebSocket server for hot reload
const wss = new WebSocketServer({ server });

// Keep track of connected clients
const clients = new Set<any>();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected for hot reload');
  
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

// Watch for file changes
const watcher = chokidar.watch([OUTPUT_DIR, GENERATED_SITES_DIR], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

watcher.on('all', (event, path) => {
  console.log(`File ${event}: ${path}`);
  
  // Notify all connected clients to reload
  clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send('reload');
    }
  });
});

// Helper function to get directory size
function getDirSize(dirPath: string): number {
  let size = 0;
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        size += stats.size;
      }
    }
  } catch (error) {
    console.error(`Error calculating size for ${dirPath}:`, error);
  }
  
  return size;
}

// Start server
server.listen(PORT, () => {
  console.log(`
🚀 AWEMA Preview Server is running!
   
📡 Server URL: http://localhost:${PORT}
📁 Output directory: ${OUTPUT_DIR}
🔄 Hot reload enabled
🎯 WebSocket on ws://localhost:${PORT}

Press Ctrl+C to stop the server.
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down preview server...');
  watcher.close();
  server.close();
  process.exit(0);
});