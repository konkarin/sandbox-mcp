import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { diceToolConfig } from "../mcp/dice";
import { weatherToolConfig } from "../mcp/weather";

export const mcpServer = new McpServer({
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
