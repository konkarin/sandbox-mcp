import { createAzure } from "@ai-sdk/azure";
import { experimental_createMCPClient, streamText } from "ai";

import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  const azure = createAzure({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    resourceName: "kon-test",
  });

  const url = new URL("http://localhost:8080/mcp");
  const mcpClient = await experimental_createMCPClient({
    transport: new StreamableHTTPClientTransport(url),
  });

  const tools = await mcpClient.tools();

  const result = streamText({
    model: azure("o3-mini"),
    messages,
    tools,
    onFinish: () => {
      mcpClient.close();
    },
  });

  return result.toDataStreamResponse();
});
