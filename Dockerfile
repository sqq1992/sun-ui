FROM nginx:1.15-alpine
COPY storybook-static /etc/nginx/html
COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
