# MCP Server Sandbox

Model Context Protocol (MCP) サーバーのサンドボックス環境です。

## 機能

### 利用可能なツール

- **getDiceRoll**: 指定された面数のサイコロを振る
- **getWeather**: 指定された場所の現在の天気情報を取得

## 構成

```
packages/
├── mcp-server/           # MCPサーバー
│   └── src/
│       ├── index.ts      # MCPサーバーのメイン設定
│       ├── dice.ts       # サイコロ機能
│       └── weather.ts    # 天気情報機能
├── mcp-client/           # Next.jsベースのMCPクライアント
│   └── app/
│       ├── api/chat/     # チャットAPI
│       └── page.tsx      # メインページ
└── mcp-client-react/     # ViteベースのReact MCPクライアント
    └── src/
        ├── App.tsx       # メインアプリ
        └── Routes.tsx    # ルーティング
```

## セットアップ

依存関係をインストール:

```bash
npm install
```

## 実行

### MCPサーバー

開発サーバーを起動:

```bash
cd packages/mcp-server
npm run dev
```

サーバーは `http://localhost:8080` で起動します。

#### エンドポイント

- `GET /sse` - SSE接続の確立
- `POST /messages` - メッセージの送信

### MCPクライアント (Next.js)

```bash
cd packages/mcp-client
npm run dev
```

クライアントは `http://localhost:3000` で起動します。

### MCPクライアント (React + Vite)

```bash
cd packages/mcp-client-react
npm run dev
```

クライアントは `http://localhost:5173` で起動します。

## 使用技術

### サーバー
- TypeScript
- Express.js
- Model Context Protocol (MCP) SDK
- Open-Meteo API (天気情報)
- Zod (スキーマ検証)

### クライアント
- **Next.js版**: Next.js 15, React 19, AI SDK, Tailwind CSS
- **React版**: Vite, React 19, React Router, use-mcp

## API

### getDiceRoll

```typescript
{
  sides: number // サイコロの面数 (1以上)
}
```

### getWeather

```typescript
{
  location: string // 天気を取得する場所
}
```