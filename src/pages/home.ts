import { Hono } from "hono";

const home = new Hono();

home.get("/", (c) => {
  return c.html(`
    <h1>Welcome to Splatoon 3 API Viewer</h1>
    <h2>Splatoon 3 API を使ってHonoのフレームワークを学ぶ</h1>
    <ul>
      <li><a href="/regular">レビュラースケジュール</a></li>
      <li><a href="/challenge">バンカラチャレンジスケジュール</a></li>
      <li><a href="/festivals">フェス情報</a></li>
    </ul>
  `);
});

export default home;
