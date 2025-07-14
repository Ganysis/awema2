/**
 * Générateur minimal de Netlify Functions - JS pur
 */

export class NetlifyFunctionsMinimal {
  generateNetlifyToml(): string {
    return `[build]
  publish = "."`;
  }

  generateHelloWorldFunction(): { path: string; content: string } {
    return {
      path: 'netlify/functions/hello-world.js',
      content: `export default async (req, context) => {
  return new Response("Hello World from Netlify Functions!");
};`
    };
  }

  generateHelloWorldHandlerFunction(): { path: string; content: string } {
    return {
      path: 'netlify/functions/hello-handler.js',
      content: `exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from handler format!" })
  };
};`
    };
  }
}