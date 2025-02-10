import fs from "fs";
import { Hono } from "hono";
import path from "path";
import { fileURLToPath } from "url";

const app = new Hono();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerRoutes = async () => {
  const pagesDir = path.join(__dirname, "pages");
  const files = fs.readdirSync(pagesDir);

  await Promise.all(
    files.map(async (file) => {
      if (file.endsWith(".ts")) {
        const routeName =
          file.replace(".ts", "") === "home"
            ? "/"
            : `/${file.replace(".ts", "")}`;

        // 🔥 すべてのページを自動登録！（特別扱いなし）
        const module = await import(`./pages/${file}`);
        if (module.default) {
          app.route(routeName, module.default);
          console.log(`✅ Route registered: ${routeName}`);
        }
      }
    })
  );
};

await registerRoutes();

// 🔥 ルートを手動で出力（デバッグ用）
console.log("📌 Registered Routes:");
app.routes.forEach((route) => {
  console.log(`✅ ${route.method} ${route.path}`);
});

export default app;
