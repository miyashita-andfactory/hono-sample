import { Hono } from "hono";

const schedules = new Hono();

let cachedData: any = null; // ✅ キャッシュ用の変数
let lastFetchTime = 0; // ✅ 最後にAPIを取得した時間
const CACHE_DURATION = 2 * 60 * 60 * 1000; // ✅ (2時間) キャッシュ

schedules.get("/", async (c) => {
  console.log("🔥 /schedules にリクエストが届いた！");

  try {
    // ✅ キャッシュがある & 2時間以内ならAPIアクセスをスキップ
    const now = Date.now();

    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      console.log("⚡ キャッシュからデータを取得！");
      return c.html(renderSchedulePage(cachedData));
    }

    // ✅ APIからデータを取得
    console.log("🌐 APIからデータ取得中...");
    const response = await fetch("https://spla3.yuu26.com/api/schedule");
    if (!response.ok) throw new Error(`APIエラー: ${response.status}`);
    const data = await response.json();

    if (!data.result || !data.result.regular) {
      throw new Error("APIデータの形式が異なります。");
    }

    // TODO: ログ
    console.log("✅ APIレスポンス（キー情報）:", Object.keys(data));
    console.log("✅ `data.result` のキー:", Object.keys(data.result));
    console.log("✅ `data.regularの1つ目` のキー:", data.result.regular[0]);
    console.log(
      "✅ `data.regularの1つ目のステージ` のキー:",
      data.result.regular[0].stages
    );

    // ✅ データをキャッシュ
    cachedData = data.result;
    lastFetchTime = now;
    console.log("✅ APIデータをキャッシュしました！");

    return c.html(renderSchedulePage(cachedData));
  } catch (error) {
    console.error("❌ API Fetch Error:", error);
    return c.html(`<h1>エラー</h1><p>APIデータ取得に失敗しました。</p>`, 500);
  }
});

// ✅ HTML をレンダリングする関数（キャッシュからでも API からでも共通）
const renderSchedulePage = (data: any) => `
  <html>
  <head>
    <title>Splatoon 3 スケジュール</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { color: #333; }
      ul { list-style-type: none; padding: 0; }
      li { margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
      img { width: 100px; margin-right: 10px; }
    </style>
  </head>
  <body>
    <h1>Splatoon 3 スケジュール</h1>
    <ul>
      ${data.regular
        .map(
          (match: any) => `
        <li>
          <strong>${match.start_time} - ${match.end_time}</strong><br>
          ルール: ${match.rule.name}<br>
          ステージ: ${match.stages[0].name} / ${match.stages[1].name}<br>
          <img src="${match.stages[0].image}" alt="ステージ1">
          <img src="${match.stages[1].image}" alt="ステージ2">
        </li>
      `
        )
        .join("")}
    </ul>
  </body>
  </html>
`;

export default schedules;
