import { Hono } from "hono";

const schedules = new Hono();

// ✅ `/schedules/` にアクセスしたら `/schedules` にリダイレクト（この処理を先に登録）
schedules.get("/", async (c) => {
  console.log("🔥 /schedules にリクエストが届いた！");
  return c.html(`<h1>スケジュール</h1>`);
});

// ✅ `/schedules/` のリクエストを `/schedules` にリダイレクト
schedules.get("/*", (c) => {
  console.log("🔄 /schedules/ から /schedules にリダイレクト");
  return c.redirect("/schedules", 301);
});

export default schedules;
