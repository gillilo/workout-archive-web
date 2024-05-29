FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
ENV REQUEST_URL localhost:8080
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

# docker build -t gillilo/workout-archive-web:latest .
# docker run -d --name workout-archive-web --network workout-archive -p 8808:80 -e REQUEST_URL=woa.rlaghlwns.com gillilo/workout-archive-web:latest