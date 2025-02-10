 ### npm create hono@latest でフレームワーク作成して環境構築

```
npm install
npm run dev
```

```
open http://localhost:3000
```


### 環境構築中躓いたところメモ
```
Hono の app.route() の挙動

app.route("/schedules", schedules) を使うと 相対パスになる ので、ページ内のルートは get("/") で統一する！
/schedules/ のリダイレクト

/schedules/ にアクセスしたときに /schedules に 301 Moved Permanently でリダイレクトさせる。
```

### 作成ページ

![FireShot Capture 004 - レビュラー スケジュール スケジュール -  localhost](https://github.com/user-attachments/assets/c50eb10d-004b-4e11-b212-db5e0710f38d)
