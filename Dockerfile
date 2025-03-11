# Use node image for building the frontend

FROM node:18-alpine AS builder
WORKDIR /app
# COPY . .
# RUN npm install && npm run build
# This leverages Docker's layer caching to avoid reinstalling dependencies if only application code changes
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
CMD curl -f http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]

