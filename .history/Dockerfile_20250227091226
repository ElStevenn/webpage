# Use official Nginx base image
FROM nginx:latest

WORKDIR /

# Remove default Nginx configuration and replace with our own
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/nginx.conf

# Copy HTML files from "src" instead of "html"
COPY src /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
