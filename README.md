# シャッフルもじ

バラバラになった文字を並び替えて正しい単語を作る学習ゲームです。プログラミング学習に特化した3つのモードでお楽しみください。

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.14.0-green)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com/)

## 🎮 ゲーム概要

### 3つのゲームモード

#### 📘 HTML/CSS モード
- HTML要素とCSSプロパティの学習
- 例: `vdi` → `div`, `loroc` → `color`
- フロントエンド開発の基礎知識を楽しく習得

#### 💎 Ruby モード
- Ruby言語のメソッド名学習
- 例: `pma` → `map`, `hcae` → `each`
- Ruby開発で使うメソッドを網羅

#### 🎯 基本情報技術者試験 モード
- 基本情報技術者試験の略語学習
- 例: `LRU` → `URL`, `TTPH` → `HTTP`
- 情報処理技術者試験対策に最適

### ゲームの特徴

- **連続チャレンジ**: 1回間違えるまで続けられるスリリングな形式
- **制限時間**: 各問題15秒以内に回答（2巡目以降、制限時間を少しずつ短縮）
- **インタラクティブ操作**: クリック選択とドラッグ&ドロップ対応
- **学習効果**: 各単語にヒント付き、ログインすると履歴ページで過去の間違えた問題を確認できる
- **ランキング機能**: Googleログインまたはゲスト名でスコア登録（ログインなしでも遊べる）

## 🚀 技術スタック

### Frontend
- **Next.js 15.4.6**: App Router使用
- **React 19.1.0**: 最新の並行機能対応
- **TypeScript 5.0**: 型安全な開発
- **Tailwind CSS v4**: ユーティリティファーストCSS

### Backend & Database
- **Prisma 6.14.0**: データベースORM
- **PostgreSQL**: 本番データベース
- **NextAuth.js 4.24.11**: Google OAuth認証
- **API Routes**: サーバーサイドAPI

### Development & Deployment
- **Vercel**: ホスティングプラットフォーム
- **GitHub Actions**: CI/CDパイプライン
- **ESLint + Prettier**: コード品質管理

## 🎯 主要機能

### ゲーム機能
- [x] 3モード対応（HTML/CSS、Ruby、基本情報技術者試験）
- [x] 文字選択とドラッグ&ドロップ操作
- [x] タイマー
- [x] スコア管理とゲーム終了処理
- [x] TOP画面にゲーム説明モーダル

### ユーザー機能
- [x] Google OAuth認証
- [x] ゲスト名でのプレイ・ランキング登録
- [x] ユーザープロフィール管理
- [x] プレイ履歴表示

### UI/UX機能
- [x] レスポンシブデザイン
- [x] ダークモード対応
- [x] しゃもじアイコンのローディングアニメーション
- [x] ページ遷移時の即座ローディング表示
- [x] X(Twitter)投稿機能

### データ管理
- [x] ランキングシステム（モード別TOP10）
- [x] プレイ履歴の保存・表示
- [x] ゲーム統計情報の管理

## 📊 データベース構成

### 主要テーブル
- **User**: ユーザー情報（Google OAuth）
- **GameRecord**: ゲーム結果とスコア
- **CorrectAnswer**: 正解した問題の詳細
- **IncorrectAnswer**: 間違えた問題の詳細

## 🎨 デザインシステム

### カラーパレット
- **HTML/CSS**: `blue-400` (優しいブルー)
- **Ruby**: `rose-400` (温かみのあるローズ)
- **FE**: `emerald-400` (落ち着いたエメラルド)
- **アクセント**: `amber-400` (ランキングボタン)

### レスポンシブブレークポイント
- **スマートフォン**: `< 640px`
- **タブレット**: `640px - 1024px`
- **デスクトップ**: `> 1024px`

## 🔧 開発環境セットアップ

### 必要な環境
- Node.js 18以上
- PostgreSQL（本番環境）
- Google Cloud Console（OAuth設定）


## 🏆 ランキングシステム

### 機能
- モード別TOP10表示
- ログインユーザーとゲストユーザー混合
- 同スコア時は達成日時順でソート

### プライバシー
- ゲストユーザーは任意の名前で参加可能
- 個人情報の最小限収集（Googleアカウント情報のみ）

## 📱 モバイル対応

### レスポンシブ最適化
- **文字カード**: スマホで小さく、PCで大きく表示
- **回答欄**: 8文字の長い単語もスマホ画面に収納
- **ランキングタブ**: 均等幅で見やすく配置


## 📄 ライセンス

本プロジェクトは MIT License の下で公開されています。
詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

### 使用している主要ライブラリ
- Next.js: MIT License
- React: MIT License
- Tailwind CSS: MIT License
- Prisma: Apache 2.0 License
- NextAuth.js: ISC License
