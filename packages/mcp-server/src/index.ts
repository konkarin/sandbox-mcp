import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import express from "express";
import { weatherToolConfig } from "./weather.js";
import { diceToolConfig } from "./dice.js";

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

let transport: SSEServerTransport;

const app = express();

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await mcpServer.connect(transport);
});

app.post("/messages", async (req, res) => {
  await transport.handlePostMessage(req, res);
});

app.listen(8080, () => {
  console.log(`Example SSE MCP server listening on port ${8080}`);
});
