FROM node:18-alpine

# セキュリティ向上: 非rootユーザー作成
RUN addgroup --gid 1001 --system nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# 必要最小限のパッケージ
RUN apk add --no-cache openssl libc6-compat

# package files
COPY package*.json ./

# Dependencies install
RUN npm install

# Copy source
COPY . .

# ファイル所有者を変更
RUN chown -R nextjs:nodejs /app

# 非rootユーザーに変更
USER nextjs

# Prisma generate
RUN npx prisma generate

# Environment
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

EXPOSE 3000

# Start command
CMD ["npx", "next", "dev"]
