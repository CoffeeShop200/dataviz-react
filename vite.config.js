import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" : le site fonctionne à la racine d'un domaine comme dans un sous-dossier
export default defineConfig({
  plugins: [react()],
  base: "./",
});
