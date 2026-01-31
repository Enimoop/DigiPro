# ---------- build ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else npm i; fi

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine

# Supprime la conf par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie le build Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Conf nginx SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
