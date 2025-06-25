import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { mcpServer } from "../mcp";

export default defineEventHandler(async (event) => {
  const { res, req } = event.node;
  const body = await readBody(event);

  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, body);
    res.on("close", () => {
      transport.close();
      mcpServer.close();
    });
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.statusCode = 500;
      return {
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      };
    }
  }
});
