import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { Hono } from "hono";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app_ = new Hono();

serve(app, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
