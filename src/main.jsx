import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Function to load Markdown content
async function loadMarkdownContent(path) {
  const response = await fetch(path);
  const text = await response.text();
  return { default: text };
}

// Override import.meta.glob for Markdown files
const originalGlob = import.meta.glob;
import.meta.glob = (pattern, options) => {
  if (pattern.endsWith('.md')) {
    return Object.fromEntries(
      Object.entries(originalGlob(pattern, { as: 'url', ...options }))
        .map(([key, value]) => [key, () => loadMarkdownContent(value)])
    );
  }
  return originalGlob(pattern, options);
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
