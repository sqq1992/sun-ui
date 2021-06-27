M nginx:1.15-alpine
COPY html /etc/nginx/
COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
