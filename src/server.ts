import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

// ✅ 静的ファイルを `public/` から配信
app.use("/*", serveStatic({ root: "./public" }));

serve(app, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
