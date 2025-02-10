export const renderPage = (title: string, content: string) => `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { color: #333; }
      ul { list-style-type: none; padding: 0; }
      li { margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
      img { width: 100px; margin-right: 10px; }
      nav { background: #333; padding: 10px; margin-bottom: 20px; }
      nav a { color: white; text-decoration: none; margin: 0 10px; }
    </style>
  </head>
  <body>
    ${content}
  </body>
  </html>
`;
