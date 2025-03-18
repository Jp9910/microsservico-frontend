# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci \
    && npm run build \
    && npm prune --production

# Em produção mesmo, o container do nginx vai ser subido como uma api gateway para os microsserviços
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]