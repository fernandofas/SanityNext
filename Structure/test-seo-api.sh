#!/bin/bash

# Sitemap & Robots.txt API Verification Script
# Run this after deployment to test your dynamic API routes

echo "🧪 Testing SanityNext Dynamic SEO API Routes"
echo "============================================="

BASE_URL="https://www.SanityNext.com"

echo ""
echo "📋 Testing robots.txt API route..."
curl -s -o /dev/null -w "Status: %{http_code} | Response Time: %{time_total}s\n" "$BASE_URL/api/robots.txt"

echo ""
echo "🗺️  Testing sitemap.xml API route..."
curl -s -o /dev/null -w "Status: %{http_code} | Response Time: %{time_total}s\n" "$BASE_URL/api/sitemap.xml"

echo ""
echo "🔍 Checking robots.txt content..."
echo "--------------------------------"
curl -s "$BASE_URL/api/robots.txt"

echo ""
echo ""
echo "📊 Checking sitemap.xml structure..."
echo "------------------------------------"
curl -s "$BASE_URL/api/sitemap.xml" | head -20

echo ""
echo "..."
echo "(sitemap truncated for readability)"

echo ""
echo "✅ Verification complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Submit sitemap to Google Search Console: $BASE_URL/api/sitemap.xml"
echo "2. Submit sitemap to Bing Webmaster Tools: $BASE_URL/api/sitemap.xml"
echo "3. Verify robots.txt is accessible: $BASE_URL/api/robots.txt"
echo "4. Set up Sanity webhooks for auto-updates"