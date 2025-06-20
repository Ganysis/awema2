# AWEMA Preview Server

A live preview server for AWEMA-generated sites with hot reload support.

## Features

- 🚀 **Live Preview**: Instantly preview generated sites
- 🔄 **Hot Reload**: Automatic page refresh when files change
- 📊 **Dashboard**: Beautiful overview of all generated sites
- 🌐 **WebSocket Support**: Real-time updates without manual refresh
- 📁 **Directory Listing**: Browse site structure easily
- 🗜️ **Compression**: Gzip/Brotli compression for better performance

## Quick Start

```bash
# Start the preview server
pnpm preview

# The server will start on http://localhost:3001
```

## Usage

### Generating Sites

Use the AWEMA CLI to generate sites:

```bash
# Generate a single site
pnpm generate -- --trade electricien --variant ultra-pro --name "Mon Entreprise"

# List available trades
pnpm generate -- list-trades

# List available variants
pnpm generate -- list-variants
```

### Available Trades

- `electricien` - Électricien
- `plombier` - Plombier
- `menuisier` - Menuisier
- `peintre` - Peintre en bâtiment
- `carreleur` - Carreleur

### Available Variants

- `ultra-pro` - Modern, vibrant design with gradients
- `premium` - Elegant, professional design
- `minimal` - Clean, minimalist design

### Demo Sites

Generate multiple demo sites at once:

```bash
# Generate demo sites sequentially
pnpm demo

# Generate demo sites in parallel (faster)
pnpm demo -- --parallel
```

## Directory Structure

```
preview-server/
├── output/          # Generated sites are stored here
│   ├── electricien-ultra-pro-123456/
│   ├── plombier-premium-123457/
│   └── ...
├── src/
│   └── index.ts     # Server implementation
└── package.json
```

## How It Works

1. **Site Generation**: The CLI generates static sites in the `output/` directory
2. **File Serving**: Express serves these files with proper MIME types
3. **Hot Reload**: Chokidar watches for file changes
4. **WebSocket**: When changes are detected, all connected clients are notified
5. **Auto Refresh**: Client-side JavaScript reloads the page automatically

## Development

```bash
# Run in development mode with auto-restart
cd apps/preview-server
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```

## Environment Variables

- `PORT` - Server port (default: 3001)

## Tips

- The server automatically creates the `output/` directory if it doesn't exist
- Legacy sites from `poc-generator/generated-sites/` are also served
- Each generated site includes its own hot reload script
- The dashboard shows site size and last modified date
- Sites are accessible at `/sites/{site-name}/`

## Troubleshooting

### Port Already in Use

If port 3001 is already in use:

```bash
PORT=3002 pnpm preview
```

### Sites Not Appearing

1. Check that sites are generated in the correct directory
2. Refresh the dashboard page
3. Check the console for any errors

### Hot Reload Not Working

1. Ensure WebSocket connection is established (check browser console)
2. Check that file watching is working (see server logs)
3. Try refreshing the page manually once