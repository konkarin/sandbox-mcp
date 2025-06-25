# MCP Client (Nuxt)

Model Context Protocol (MCP) を使用した Nuxt.js ベースのチャットアプリケーションです。Azure OpenAI と MCP サーバーを統合し、リアルタイムでツールを実行できるチャットインターフェースを提供します。

## 必要な環境変数

```bash
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
```

## セットアップ

依存関係をインストール:

```bash
npm install
```

## 開発サーバー

開発サーバーを `http://localhost:3000` で起動:

```bash
npm run dev
```

## 技術スタック

- **フレームワーク**: Nuxt.js 3
- **UI**: Vue 3 + Tailwind CSS
- **AI**: Azure OpenAI + Vercel AI SDK
- **プロトコル**: Model Context Protocol (MCP)
- **通信**: Streamable HTTP

## プロジェクト構造

```
mcp-client-nuxt/
├── app.vue              # メインアプリケーション
├── components/
│   └── Chat.vue         # チャットコンポーネント
├── server/
│   ├── api/
│   │   └── chat.post.ts # チャット API エンドポイント
│   ├── mcp/             # MCP サーバー実装
│   │   ├── index.ts     # MCP サーバー設定
│   │   ├── dice.ts      # サイコロツール
│   │   └── weather.ts   # 天気ツール
│   └── routes/
│       └── mcp.post.ts  # MCP サーバー エンドポイント
├── assets/
│   └── css/
│       └── main.css     # グローバルスタイル
└── nuxt.config.ts       # Nuxt 設定
```

## 使用方法

1. **環境変数を設定** (`.env` ファイルを作成):

   ```bash
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key
   ```

2. **開発サーバーを起動**:

   ```bash
   npm run dev
   ```

3. ブラウザで `http://localhost:3000` にアクセス
4. メッセージを送信してツール実行を確認
