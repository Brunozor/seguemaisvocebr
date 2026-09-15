import { createRoot } from "react-dom/client";
import Index from "./pages/Index";
import "./index.css";

// A pagina de redirecionamento nao usa router, react-query, toaster nem
// tooltip. Montar o Index direto, sem os providers do App.tsx, corta o bundle
// de 102 KB para 50 KB gzipado (1686 -> 52 modulos).
createRoot(document.getElementById("root")!).render(<Index />);
