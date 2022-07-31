# threejs-vite-react

[Three.js](https://threejs.org/)を vite + React + TypeScript で開発するサンプル

# 動作環境

| 名称    | バージョン |
| ------- | ---------- |
| Node.js | v16.14.0   |
| Yarn    | v1.22.10   |

# クイックスタート

## 環境構築(依存関係の解決)

```bash
yarn install
```

## ローカルで実行

```bash
yarn start
```

http://localhost:3000 で確認可能

## ローカルでホスト

```bash
yarn serve
```

http://localhost:3000 で確認可能

# 初期プロジェクトの構築

1. プロジェクトの init

```bash
yarn create vite {YOUR_PROJECT_NAME} --template react-ts

cd {YOUR_PROJECT_NAME}

yarn add three
yarn add --dev @types/three
```

2. エディタ等の設定ファイルを作成

- [.vscode/settings.json](./.vscode/settings.json)
- [.vscode/extensions.json](./.vscode/extensions.json)
- [.editorconfig](./.editorconfig)
- [.gitignore](./.gitignore)

\* **特に、生成初期の`.gitignore`は`.vscode/settings.json`を無視する内容なので注意**

3. [package.json](./package.json)のスクリプトコマンドを書き換える(任意)

個人的には以下の`scripts`に落ち着いた。

```json
"scripts": {
    "start": "vite --port 3000 --open http://localhost:3000",
    "build": "tsc && vite build",
    "serve": "vite preview --port 3000 --open http://localhost:3000"
  },
```
