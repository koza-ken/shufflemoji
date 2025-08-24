FROM node:18-alpine

WORKDIR /app

# 必要最小限のパッケージ
RUN apk add --no-cache openssl libc6-compat

# package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Dependencies install (postinstallでprisma generateが実行される)
RUN npm install

# Copy source
COPY . .

# Environment
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

EXPOSE 3000

# Start command
CMD ["npx", "next", "dev"]
