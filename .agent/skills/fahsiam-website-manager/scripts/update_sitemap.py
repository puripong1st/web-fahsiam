#!/usr/bin/env python3
"""
Update Sitemap Script for Fah Siam Website Manager

This script ensures the sitemap.ts file is correctly configured.
Since the website uses a dynamic sitemap based on MOCK_PRODUCTS, 
this script mainly validates the sitemap configuration and 
updates static route metadata if needed.

Usage:
    python update_sitemap.py <repo_path>
"""

import sys
from pathlib import Path

def validate_sitemap(repo_path: str):
    path = Path(repo_path) / 'app' / 'sitemap.ts'
    if not path.exists():
        print(f"❌ Sitemap file not found: {path}")
        return False
    
    content = path.read_text(encoding='utf-8')
    required = ['MOCK_PRODUCTS', 'plants', 'BASE_URL', 'export default function sitemap']
    
    for item in required:
        if item not in content:
            print(f"❌ Sitemap missing required logic: {item}")
            return False
            
    print("✅ Sitemap logic is valid and dynamic.")
    return True

if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(1)
    success = validate_sitemap(sys.argv[1])
    sys.exit(0 if success else 1)
