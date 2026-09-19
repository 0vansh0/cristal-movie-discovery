import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";


import App from "./App.jsx";


// Context Providers

import {
  ThemeProvider
} from "./context/ThemeContext.jsx";


import {
  AuthProvider
} from "./context/AuthContext.jsx";


import {
  FavoritesProvider
} from "./context/FavoritesContext.jsx";


import {
  SearchProvider
} from "./context/SearchContext.jsx";



// Global CSS

import "./index.css";





try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (err) {
  console.error("Render error:", err);
  try {
    document.body.innerHTML = `\n      <div style="padding:24px;font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;color:#111;background:#fff;">\n        <h2 style="color:#c00">App render error</h2>\n        <pre style="white-space:pre-wrap;color:#333">${(err && err.stack) || err}</pre>\n      </div>`;
  } catch (e) {
    // swallow
  }
}