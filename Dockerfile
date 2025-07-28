# 最小動作Dockerfile
FROM node:18

WORKDIR /workspace

# 基本的なツールをインストール
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Firebase CLI をグローバルインストール
RUN npm install -g firebase-tools

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./

# 依存関係をインストール（ファイルが存在する場合のみ）
RUN if [ -f package.json ]; then \
      if [ -f package-lock.json ]; then \
        npm ci; \
      else \
        npm install; \
      fi; \
    fi

# ファイルをコピー
COPY . .

# ポートを公開
EXPOSE 5173 3000 4173

# ファイル権限を調整
RUN chown -R node:node /workspace

# nodeユーザーに切り替え
USER node

# 永続的に起動
CMD ["npm", "run", "dev"]