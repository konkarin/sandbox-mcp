import { useEffect } from "react";
import { onMcpAuthorization } from "use-mcp";

export function OAuthCallback() {
  useEffect(() => {
    onMcpAuthorization();
  }, []);

  return (
    <div>
      <h1>Authenticating...</h1>
      <p>This window should close automatically.</p>
    </div>
  );
}
