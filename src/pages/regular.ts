import { Hono } from "hono";
import { renderPage } from "../components/layout.js";
import { formatScheduleTime } from "../utils/format-date.js";

const regular = new Hono();

let cachedData: any = null; // ✅ キャッシュ用の変数
let lastFetchTime = 0; // ✅ 最後にAPIを取得した時間
const CACHE_DURATION = 2 * 60 * 60 * 1000; // ✅ (2時間) キャッシュ

regular.get("/", async (c) => {
  console.log("🔥 /regular にリクエストが届いた！");

  try {
    // ✅ キャッシュがある & 2時間以内ならAPIアクセスをスキップ
    const now = Date.now();

    if (cachedData && now - lastFetchTime < CACHE_DURATION) {
      console.log("⚡ キャッシュからデータを取得！");
      return c.html(
        renderPage("レビュラー スケジュール スケジュール", content(cachedData))
      );
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
    return c.html(renderPage("レビュラー スケジュール", content(cachedData)));
  } catch (error) {
    console.error("❌ API Fetch Error:", error);
    let errorMessage = "APIエラーが発生しました";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return c.html(
      renderPage(
        "エラー",
        `<h1>エラーが発生しました</h1><p>${errorMessage}</p>`
      ),
      500
    );
  }
});

// ✅ HTML をレンダリングする関数（キャッシュからでも API からでも共通）
const content = (data: any) => `
  <section class="regular">
    <div class="regular-container">
      <h1>レギュラー スケジュール</h1>
      <ul class="list">
        ${data.regular
          .map(
            (match: any) => `
          <li class="item">
            <p class="sub-title">ルール: ${match.rule.name}</p>
            <p class="stages-title">ステージ</p>
            <div class="stages-area">
              <div class="stages-item">
                <p>${match.stages[0].name}</p>
                <img src="${match.stages[0].image}" alt="ステージ1">
              </div>
              <div class="stages-item">
                <p>${match.stages[1].name}</p>
                <img src="${match.stages[1].image}" alt="ステージ2">
              </div>
            </div>
            <span class="date">${formatScheduleTime(
              match.start_time
            )} ~ ${formatScheduleTime(match.end_time)}</span>
          </li>
          `
          )
          .join("")}
        </ul>
      </div>
    </section>
`;

export default regular;
