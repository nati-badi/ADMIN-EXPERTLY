import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default () => {
  return defineConfig({
    plugins: [react(), tailwindcss()],
  });
};
