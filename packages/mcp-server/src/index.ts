import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";

import { diceToolConfig } from "./dice";
import { weatherToolConfig } from "./weather";

const app = express();
app.use(express.json());

const mcpServer = new McpServer({
  name: "example-server",
  version: "1.0.0",
});

mcpServer.tool(
  diceToolConfig.name,
  diceToolConfig.description,
  diceToolConfig.inputSchema,
  diceToolConfig.handler
);

mcpServer.tool(
  weatherToolConfig.name,
  weatherToolConfig.description,
  weatherToolConfig.inputSchema,
  weatherToolConfig.handler
);

app.post("/mcp", async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on("close", () => {
      transport.close();
      mcpServer.close();
    });
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.get("/mcp", async (_req, res) => {
  console.log("Received GET MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

app.delete("/mcp", async (_req, res) => {
  console.log("Received DELETE MCP request");
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    })
  );
});

app.listen(8080);

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  process.exit(0);
});
