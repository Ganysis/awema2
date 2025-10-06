import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { analyzeWebsite } from './tools/analyze-url.js';
import { analyzeDesignImage } from './tools/analyze-image.js';
import { generateV3Block } from './tools/generate-block.js';
import { previewBlock } from './tools/preview-block.js';
import { iterateDesign } from './tools/iterate-design.js';
import { PreviewServer } from './services/preview-server.js';

// Types for our tools
interface ToolHandlers {
  [key: string]: (params: any) => Promise<any>;
}

class AWEMAVisualDesignServer {
  private server: Server;
  private previewServer: PreviewServer;
  private toolHandlers: ToolHandlers;

  constructor() {
    this.server = new Server(
      {
        name: 'awema-visual-design',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.previewServer = new PreviewServer();
    
    // Initialize tool handlers
    this.toolHandlers = {
      analyze_website: analyzeWebsite,
      analyze_design_image: analyzeDesignImage,
      generate_v3_block: generateV3Block,
      preview_block: (params) => previewBlock(params, this.previewServer),
      iterate_design: iterateDesign,
    };

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: 'analyze_website',
          description: 'Analyze a website and extract design elements for V3 blocks',
          inputSchema: {
            type: 'object',
            properties: {
              url: { type: 'string', description: 'URL of the website to analyze' },
              elements: {
                type: 'array',
                items: { type: 'string' },
                description: 'Specific elements to analyze',
              },
              extractColors: { type: 'boolean', default: true },
              extractFonts: { type: 'boolean', default: true },
              extractLayouts: { type: 'boolean', default: true },
            },
            required: ['url'],
          },
        },
        {
          name: 'analyze_design_image',
          description: 'Analyze a design image and extract visual patterns',
          inputSchema: {
            type: 'object',
            properties: {
              imagePath: { type: 'string', description: 'Path to the design image' },
              blockType: { type: 'string', description: 'Type of block to generate' },
              style: { type: 'string', default: 'corporate' },
            },
            required: ['imagePath'],
          },
        },
        {
          name: 'generate_v3_block',
          description: 'Generate a V3 block based on visual reference',
          inputSchema: {
            type: 'object',
            properties: {
              reference: { type: 'object', description: 'Analysis result or reference data' },
              blockType: { type: 'string' },
              variant: { type: 'string' },
              customizations: { type: 'object' },
            },
            required: ['blockType', 'variant'],
          },
        },
        {
          name: 'preview_block',
          description: 'Preview a generated block with live data',
          inputSchema: {
            type: 'object',
            properties: {
              blockCode: { type: 'string' },
              data: { type: 'object' },
              format: { type: 'string', enum: ['html', 'screenshot', 'url'], default: 'url' },
            },
            required: ['blockCode'],
          },
        },
        {
          name: 'iterate_design',
          description: 'Iterate on existing design based on natural language feedback',
          inputSchema: {
            type: 'object',
            properties: {
              currentBlock: { type: 'string' },
              feedback: { type: 'string' },
              aspects: { type: 'array', items: { type: 'string' } },
            },
            required: ['currentBlock', 'feedback'],
          },
        },
      ];

      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (!this.toolHandlers[name]) {
        throw new Error(`Unknown tool: ${name}`);
      }

      try {
        const result = await this.toolHandlers[name](args);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool ${name}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async start() {
    // Start preview server
    await this.previewServer.start();
    
    // Start MCP server
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('AWEMA Visual Design MCP Server started');
    console.error(`Preview server running on http://localhost:${this.previewServer.port}`);
  }
}

// Start the server
const server = new AWEMAVisualDesignServer();
server.start().catch(console.error);