# MCP Client (Nuxt)

Model Context Protocol (MCP) を使用した Nuxt.js ベースのチャットアプリケーションです。Azure OpenAI と MCP サーバーを統合し、リアルタイムでツールを実行できるチャットインターフェースを提供します。

## 特徴

- **リアルタイムチャット**: Azure OpenAI (o3-mini) を使用したストリーミングチャット
- **MCP 統合**: Server-Sent Events (SSE) を通じて MCP サーバーと通信
- **ツール実行**: チャット内でリアルタイムツール実行の可視化
- **レスポンシブデザイン**: Tailwind CSS を使用したモダンな UI
- **TypeScript**: 完全な型安全性

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

**注意**: MCP サーバーが `http://localhost:8080/sse` で実行されている必要があります。

### MCP サーバーの起動

MCP サーバーを起動するには、別のターミナルで以下を実行:

```bash
cd packages/mcp-server
npm run dev
```

## 本番環境

本番用にビルド:

```bash
npm run build
```

本番ビルドをローカルでプレビュー:

```bash
npm run preview
```

## 技術スタック

- **フレームワーク**: Nuxt.js 3
- **UI**: Vue 3 + Tailwind CSS
- **AI**: Azure OpenAI + Vercel AI SDK
- **プロトコル**: Model Context Protocol (MCP)
- **通信**: Server-Sent Events (SSE)

## プロジェクト構造

```
mcp-client-nuxt/
├── app.vue              # メインアプリケーション
├── components/
│   └── Chat.vue         # チャットコンポーネント
├── server/
│   └── api/
│       └── chat.post.ts # チャット API エンドポイント
├── assets/
│   └── css/
│       └── main.css     # グローバルスタイル
└── nuxt.config.ts       # Nuxt 設定
```

## 使用方法

1. **MCP サーバーを起動**:
   ```bash
   cd packages/mcp-server
   npm run dev
   ```

2. **環境変数を設定** (`.env` ファイルを作成):
   ```bash
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key
   ```

3. **開発サーバーを起動**:
   ```bash
   npm run dev
   ```

4. ブラウザで `http://localhost:3000` にアクセス
5. メッセージを送信してツール実行を確認
