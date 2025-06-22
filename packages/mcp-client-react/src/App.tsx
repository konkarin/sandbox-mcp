import { useState } from "react";
import { useMcp, type Tool } from "use-mcp/react";

function App() {
  const [toolCallResult, setToolCallResult] = useState(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { state, tools, callTool, error } = useMcp({
    url: "https://mcp.atlassian.com/v1/sse",
    clientName: "atlassian",
  });

  if (state === "loading") {
    return <div>Loading...</div>;
  }
  if (state === "failed") {
    return <div>Error loading MCP: {error}</div>;
  }

  function onClickTool(tool: Tool) {
    setSelectedTool(tool);
    setFormData({});
    setToolCallResult(null);
  }

  function renderInputField(name: string, schema: any) {
    const value = formData[name] || "";

    const handleChange = (newValue: any) => {
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    if (schema.type === "string") {
      if (schema.enum) {
        return (
          <select value={value} onChange={(e) => handleChange(e.target.value)}>
            <option value="">Select...</option>
            {schema.enum.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={schema.description}
        />
      );
    }

    if (schema.type === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          placeholder={schema.description}
        />
      );
    }

    // boolean, array など他の型は省略
  }

  async function handleSubmit() {
    if (!selectedTool) return;

    try {
      const result = await callTool(selectedTool.name, formData);
      setToolCallResult(result);
    } catch (error) {
      setToolCallResult({ error: error.message });
    }
  }

  return (
    <div>
      <h1>Atlassian MCP Server</h1>

      {!selectedTool ? (
        <ul>
          {tools.map((tool) => (
            <li key={tool.name}>
              <button onClick={() => onClickTool(tool)}>{tool.name}</button>
              <p>{tool.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2>{selectedTool.name}</h2>
          <p>{selectedTool.description}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {selectedTool.inputSchema?.properties &&
              Object.entries(selectedTool.inputSchema.properties).map(
                ([name, schema]: [string, any]) => (
                  <div key={name} style={{ marginBottom: "10px" }}>
                    <label>
                      {name}
                      {selectedTool.inputSchema.required?.includes(name) &&
                        " *"}
                      :
                    </label>
                    <div>{renderInputField(name, schema)}</div>
                    {schema.description && (
                      <small style={{ color: "#666" }}>
                        {schema.description}
                      </small>
                    )}
                  </div>
                )
              )}

            <button type="submit">Execute Tool</button>
            <button type="button" onClick={() => setSelectedTool(null)}>
              Back
            </button>
          </form>
        </div>
      )}

      {toolCallResult && (
        <div>
          <h2>Tool Call Result</h2>
          <pre>{JSON.stringify(toolCallResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
