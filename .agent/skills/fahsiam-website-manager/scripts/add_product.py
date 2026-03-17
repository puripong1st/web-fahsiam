#!/usr/bin/env python3
"""
Add Product Script for Fah Siam Website Manager

This script adds a new fertilizer product to the productsdetail.ts file.
It includes comprehensive validation and automatic ID generation.

Usage:
    python add_product.py <repo_path> <product_data_json>
"""

import json
import sys
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

class ProductValidator:
    REQUIRED_FIELDS = ['name', 'price', 'image', 'category', 'benefits', 'usages']
    VALID_BADGES = ['ใหม่', 'ฮิต', 'ลดราคา']
    VALID_CATEGORIES = ['ปุ๋ย']
    
    @staticmethod
    def validate(product_data: Dict[str, Any]) -> tuple[bool, str]:
        for field in ProductValidator.REQUIRED_FIELDS:
            if field not in product_data:
                return False, f"❌ Missing required field: {field}"
        if not isinstance(product_data['price'], (int, float)) or product_data['price'] <= 0:
            return False, "❌ Price must be a positive number"
        if 'badge' in product_data and product_data['badge'] not in ProductValidator.VALID_BADGES:
            return False, f"❌ Invalid badge"
        return True, "✅ Valid"

class IDGenerator:
    @staticmethod
    def generate_id(name: str) -> str:
        id_base = re.sub(r'[^\w\s]', '', name)
        id_base = re.sub(r'\s+', '-', id_base.strip()).lower()
        return f"{id_base[:40]}-growth"

class ProductManager:
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.products_file = self.repo_path / 'app' / 'data' / 'productsdetail.ts'
    
    def add_product(self, product_data: Dict[str, Any]) -> tuple[bool, str]:
        is_valid, msg = ProductValidator.validate(product_data)
        if not is_valid: return False, msg
        
        product_id = IDGenerator.generate_id(product_data['name'])
        product_data['id'] = product_id
        product_data['updatedAt'] = datetime.now().strftime('%Y-%m-%d')
        
        content = self.products_file.read_text(encoding='utf-8')
        
        # Check if ID exists
        if f'id: "{product_id}"' in content:
            return False, f"❌ ID {product_id} already exists"
        
        # Find the MOCK_PRODUCTS array end
        match = re.search(r'export const MOCK_PRODUCTS: Product\[\] = \[(.*)\];', content, re.DOTALL)
        if not match:
            return False, "❌ Could not find MOCK_PRODUCTS array"
            
        array_content = match.group(1)
        product_str = self._generate_product_object(product_data)
        
        # Append to array
        new_array_content = array_content.rstrip()
        if new_array_content and not new_array_content.endswith(','):
            new_array_content += ','
        new_array_content += f'\n  {product_str}\n'
        
        new_content = content.replace(match.group(1), new_array_content)
        self.products_file.write_text(new_content, encoding='utf-8')
        return True, f"✅ Added {product_id}"

    def _generate_product_object(self, p: Dict[str, Any]) -> str:
        benefits = ',\n      '.join([f'"{b}"' for b in p['benefits']])
        usages = []
        for u in p['usages']:
            items = ',\n          '.join([f'{{ label: "{i["label"]}", value: "{i["value"]}" }}' for i in u['items']])
            usages.append(f'{{ groupName: "{u["groupName"]}", items: [\n          {items}\n        ] }}')
        usages_str = ',\n      '.join(usages)
        
        opt = ""
        if 'oldPrice' in p: opt += f',\n    oldPrice: {p["oldPrice"]}'
        if 'badge' in p: opt += f',\n    badge: "{p["badge"]}"'
        
        return f'''{{
    id: "{p['id']}",
    updatedAt: "{p['updatedAt']}",
    name: "{p['name']}",
    price: {p['price']}{opt},
    image: "{p['image']}",
    category: "{p['category']}",
    benefits: [
      {benefits}
    ],
    usages: [
      {usages_str}
    ]
  }}'''

def main():
    if len(sys.argv) < 3: sys.exit(1)
    repo_path, product_json = sys.argv[1], sys.argv[2]
    try:
        manager = ProductManager(repo_path)
        success, message = manager.add_product(json.loads(product_json))
        print(message)
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()
