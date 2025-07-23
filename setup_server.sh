#!/usr/bin/env bash
set -euo pipefail

# ─── CONFIG ──────────────────────────────────────────────────────────────────
DOMAIN="paumateu.com"
EMAIL="paumat17@gmail.com"

APP_DIR="/home/ubuntu/webpage"
PM2_APP_NAME="next-app"

WEBROOT="/var/www/letsencrypt"
ACME_PATH="${WEBROOT}/.well-known/acme-challenge"

NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"
# ─────────────────────────────────────────────────────────────────────────────

echo "▶ Stop any existing PM2 process"
pm2 delete "${PM2_APP_NAME}" 2>/dev/null || true

echo "▶ Build Next.js"
cd "${APP_DIR}"
npm install
npm run build

echo "▶ Start with PM2 bound to 0.0.0.0:3000"
pm2 start "HOST=0.0.0.0 npm start" --name "${PM2_APP_NAME}"
pm2 save

echo "▶ Prepare ACME webroot"
sudo mkdir -p "${ACME_PATH}"
sudo chown -R www-data:www-data "$(dirname "${WEBROOT}")"

echo "▶ Write Nginx HTTP vhost (for ACME & proxy)"
sudo tee "${NGINX_CONF}" >/dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        alias ${ACME_PATH}/;
        default_type text/plain;
        try_files \$uri =404;
    }

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf "${NGINX_CONF}" "${NGINX_ENABLED}"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "▶ Verify ACME path is served"
echo "ping" | sudo tee "${ACME_PATH}/probe" >/dev/null
curl -sf "http://localhost/.well-known/acme-challenge/probe" \
  || { echo "ACME path 404 – fix Nginx before continuing"; exit 1; }
sudo rm "${ACME_PATH}/probe"

echo "▶ Request/Renew Let’s Encrypt cert"
sudo certbot certonly --webroot -w "${WEBROOT}" \
     -d "${DOMAIN}" -d "www.${DOMAIN}" \
     --email "${EMAIL}" --agree-tos --non-interactive

echo "▶ Write Nginx HTTPS vhost"
sudo tee "${NGINX_CONF}" >/dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo nginx -t
sudo systemctl reload nginx

echo "✅ Deployed!  https://${DOMAIN} is live and proxied to your Next.js app on port 3000."
