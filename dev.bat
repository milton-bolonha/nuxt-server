@echo off
set NODE_OPTIONS=--dns-result-order=ipv4first
node -r dotenv/config node_modules/nuxt/bin/nuxt.mjs dev --host 127.0.0.1
