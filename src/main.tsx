import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import App from "@hexlet/testing-task-manager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
