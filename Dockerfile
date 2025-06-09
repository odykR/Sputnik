# Этап 1: Сборка React-приложения
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build # Убедитесь, что эта команда создает собранные файлы в папке `build`

# Этап 2: Запуск собранного приложения через Nginx
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/your_app.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]