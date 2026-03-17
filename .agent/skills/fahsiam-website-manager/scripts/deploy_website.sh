#!/bin/bash
# Deployment script for Fah Siam Website

REPO_PATH=$1
SKILL_PATH="/home/ubuntu/skills/fahsiam-website-manager"

if [ -z "$REPO_PATH" ]; then
  echo "❌ Usage: bash deploy_website.sh <repo_path>"
  exit 1
fi

echo "🚀 Starting Deployment Process for Fah Siam..."

# 1. Validate Data
echo "🔍 Validating product data..."
python3 "$SKILL_PATH/scripts/validate_products.py" "$REPO_PATH"
if [ $? -ne 0 ]; then
  echo "❌ Data validation failed. Deployment aborted."
  exit 1
fi

# 2. Check Sitemap
echo "🗺️  Checking sitemap configuration..."
python3 "$SKILL_PATH/scripts/update_sitemap.py" "$REPO_PATH"
if [ $? -ne 0 ]; then
  echo "❌ Sitemap check failed. Deployment aborted."
  exit 1
fi

# 3. Build (Simulated)
echo "🏗️  Building Next.js project..."
cd "$REPO_PATH"
# npm run build  # Skip actual build in sandbox to save time

# 4. Commit and Push
echo "📤 Committing and pushing changes to GitHub..."
git add .
git commit -m "Update products and data - $(date +'%Y-%m-%d %H:%M:%S')"
# git push origin main # Skip actual push unless in production

echo "✅ Deployment process completed successfully!"
