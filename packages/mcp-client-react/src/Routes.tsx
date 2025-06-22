import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { OAuthCallback } from "./OAuthCallback";
export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}
