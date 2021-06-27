FROM nginx:1.15-alpine
COPY html /etc/nginx/storybook-static
COPY conf /etc/nginx/
WORKDIR /etc/nginx/storybook-static
