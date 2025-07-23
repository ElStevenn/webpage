#!/usr/bin/env bash
set -euo pipefail

# ─── CONFIG ──────────────────────────────────────────────────────────────────
DOMAIN="paumateu.com"
EMAIL="paumat17@gmail.com"

APP_DIR="/home/ubuntu/webpage"
PM2_APP="next-app"
PM2_START_CMD="HOST=0.0.0.0 npm start"

# Paths for Certbot webroot fallback if plugin fails
WEBROOT="/var/www/letsencrypt"
ACME_PATH="${WEBROOT}/.well-known"

# Nginx site config names
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"
# ─────────────────────────────────────────────────────────────────────────────

echo "▶ 0. Install prerequisites"
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx

echo "▶ 1. Stop & remove old PM2 process"
pm2 delete "${PM2_APP}" 2>/dev/null || true

echo "▶ 2. Build your Next.js app"
cd "${APP_DIR}"
npm ci
npm run build

echo "▶ 3. Start under PM2"
pm2 start ${PM2_START_CMD} --name "${PM2_APP}"
pm2 save

echo "▶ 4. Prepare fallback webroot (in case plugin needs it)"
mkdir -p "${ACME_PATH}"
chown -R www-data:www-data "${WEBROOT}"

echo "▶ 5. Write Nginx proxy config (HTTP only)"
cat > "${NGINX_SITE}" <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Proxy all non-ACME traffic to Next.js
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

# Enable and test
ln -sf "${NGINX_SITE}" "${NGINX_ENABLED}"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "▶ 6. Obtain & install SSL via Certbot Nginx plugin"
certbot --nginx \
  --non-interactive --agree-tos \
  --redirect \
  --email "${EMAIL}" \
  -d "${DOMAIN}" -d "www.${DOMAIN}"

echo "▶ 7. Final Nginx test & reload"
nginx -t
systemctl reload nginx

echo "✅ Deployment complete!"
echo "   • Your site should now be live at https://${DOMAIN}"
echo "   • PM2 name: ${PM2_APP}  (port 3000 → proxied by Nginx)"
