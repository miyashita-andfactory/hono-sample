import { Hono } from "hono";

const home = new Hono();

home.get("/", (c) => {
  return c.html(`
    <h1>Welcome to Splatoon 3 API Viewer</h1>
    <ul>
      <li><a href="/schedules">スケジュール</a></li>
      <li><a href="/festivals">フェス情報</a></li>
      <li><a href="/coop">サーモンラン</a></li>
    </ul>
  `);
});

export default home;
