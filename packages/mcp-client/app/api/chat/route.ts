import { createAzure } from "@ai-sdk/azure";
import { experimental_createMCPClient, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const azure = createAzure({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    resourceName: "kon-test",
    apiVersion: "2025-01-01-preview",
  });

  const mcpClient = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "http://localhost:8080/sse",
    },
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
}
