#!/usr/bin/env python3
"""
Update Product Script for Fah Siam Website Manager

This script updates an existing fertilizer product in the productsdetail.ts file.
It supports partial updates and includes validation.

Usage:
    python update_product.py <repo_path> <product_id> <update_data_json>

Example:
    python update_product.py /home/ubuntu/web-fahsiam organic-chemical-12-3-5-growth '{
        "price": 1190,
        "benefits": ["ช่วยบำรุงต้นและใบ", "ช่วยให้รากแข็งแรง"]
    }'
"""

import json
import sys
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional
import ast

class ProductUpdater:
    """Updates existing products in productsdetail.ts."""
    
    UPDATABLE_FIELDS = ['name', 'price', 'oldPrice', 'badge', 'image', 'category', 'benefits', 'usages']
    PROTECTED_FIELDS = ['id', 'updatedAt']
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.products_file = self.repo_path / 'app' / 'data' / 'productsdetail.ts'
        
        if not self.products_file.exists():
            raise FileNotFoundError(f"❌ Products file not found: {self.products_file}")
    
    def find_product(self, product_id: str) -> Optional[Dict[str, Any]]:
        """Find product by ID in the file."""
        content = self.products_file.read_text(encoding='utf-8')
        
        # Look for the product object
        pattern = rf'id:\s*["\']({re.escape(product_id)})["\']'
        if not re.search(pattern, content):
            return None
        
        return {'id': product_id, 'found': True}
    
    def update_product(self, product_id: str, update_data: Dict[str, Any]) -> tuple[bool, str]:
        """
        Update a product with new data.
        
        Returns:
            (success, message)
        """
        # Validate product exists
        product = self.find_product(product_id)
        if not product:
            return False, f"❌ Product with ID '{product_id}' not found"
        
        # Validate update fields
        for field in update_data.keys():
            if field not in self.UPDATABLE_FIELDS:
                return False, f"❌ Cannot update protected field: {field}"
        
        # Validate field values
        is_valid, validation_msg = self._validate_update_data(update_data)
        if not is_valid:
            return False, validation_msg
        
        # Read file content
        content = self.products_file.read_text(encoding='utf-8')
        
        # Find and replace the product
        try:
            updated_content = self._replace_product_in_content(content, product_id, update_data)
            self.products_file.write_text(updated_content, encoding='utf-8')
            
            # Generate summary message
            summary = f"✅ Product '{product_id}' updated successfully!\n"
            for field, value in update_data.items():
                if field not in ['benefits', 'usages']:
                    summary += f"   {field}: {value}\n"
            summary += f"   Updated at: {datetime.now().strftime('%Y-%m-%d')}"
            
            return True, summary
        except Exception as e:
            return False, f"❌ Error updating product: {str(e)}"
    
    @staticmethod
    def _validate_update_data(update_data: Dict[str, Any]) -> tuple[bool, str]:
        """Validate update data fields."""
        
        if 'price' in update_data:
            if not isinstance(update_data['price'], (int, float)) or update_data['price'] <= 0:
                return False, "❌ Price must be a positive number"
        
        if 'oldPrice' in update_data:
            if not isinstance(update_data['oldPrice'], (int, float)) or update_data['oldPrice'] <= 0:
                return False, "❌ Old price must be a positive number"
        
        if 'badge' in update_data:
            valid_badges = ['ใหม่', 'ฮิต', 'ลดราคา']
            if update_data['badge'] not in valid_badges:
                return False, f"❌ Invalid badge. Must be one of: {', '.join(valid_badges)}"
        
        if 'image' in update_data:
            if not isinstance(update_data['image'], str) or not update_data['image'].endswith(('.webp', '.jpg', '.png')):
                return False, "❌ Image must be a valid path ending with .webp, .jpg, or .png"
        
        if 'benefits' in update_data:
            if not isinstance(update_data['benefits'], list) or len(update_data['benefits']) == 0:
                return False, "❌ Benefits must be a non-empty array"
        
        if 'usages' in update_data:
            if not isinstance(update_data['usages'], list) or len(update_data['usages']) == 0:
                return False, "❌ Usages must be a non-empty array"
        
        return True, "✅ Update data is valid"
    
    @staticmethod
    def _replace_product_in_content(content: str, product_id: str, update_data: Dict[str, Any]) -> str:
        """Replace product object in file content."""
        
        # Find the product object boundaries
        id_pattern = rf'id:\s*["\']({re.escape(product_id)})["\']'
        id_match = re.search(id_pattern, content)
        
        if not id_match:
            raise ValueError(f"Product ID '{product_id}' not found in file")
        
        # Find the start of the object (look backwards for opening brace)
        start_pos = id_match.start()
        brace_count = 0
        object_start = start_pos
        
        for i in range(start_pos - 1, -1, -1):
            if content[i] == '{':
                brace_count -= 1
                if brace_count == -1:
                    object_start = i
                    break
            elif content[i] == '}':
                brace_count += 1
        
        # Find the end of the object (look forwards for closing brace)
        brace_count = 0
        object_end = start_pos
        
        for i in range(object_start, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    object_end = i + 1
                    break
        
        # Extract the product object
        product_obj_str = content[object_start:object_end]
        
        # Parse and update the object
        updated_obj_str = ProductUpdater._update_product_object_str(product_obj_str, update_data)
        
        # Replace in content
        new_content = content[:object_start] + updated_obj_str + content[object_end:]
        
        return new_content
    
    @staticmethod
    def _update_product_object_str(obj_str: str, update_data: Dict[str, Any]) -> str:
        """Update fields in a product object string."""
        
        # Update simple fields (string and number)
        for field in ['name', 'price', 'oldPrice', 'badge', 'image', 'category']:
            if field in update_data:
                value = update_data[field]
                
                # Handle optional fields
                if field in ['oldPrice', 'badge']:
                    # Check if field exists in object
                    if f'{field}:' not in obj_str:
                        # Add the field before image
                        if field == 'oldPrice':
                            obj_str = obj_str.replace(
                                'image:',
                                f'oldPrice: {value},\n    image:'
                            )
                        elif field == 'badge':
                            obj_str = obj_str.replace(
                                'image:',
                                f'badge: "{value}",\n    image:'
                            )
                    else:
                        # Update existing field
                        pattern = rf'{field}:\s*[^,\n}}]+'
                        if field in ['oldPrice']:
                            obj_str = re.sub(pattern, f'{field}: {value}', obj_str)
                        else:
                            obj_str = re.sub(pattern, f'{field}: "{value}"', obj_str)
                else:
                    # Update required fields
                    pattern = rf'{field}:\s*[^,\n}}]+'
                    if field == 'price':
                        obj_str = re.sub(pattern, f'{field}: {value}', obj_str)
                    else:
                        obj_str = re.sub(pattern, f'{field}: "{value}"', obj_str)
        
        # Update arrays (benefits, usages)
        if 'benefits' in update_data:
            benefits = update_data['benefits']
            benefits_str = ',\n      '.join([f'"{b}"' for b in benefits])
            pattern = r'benefits:\s*\[(.*?)\]'
            obj_str = re.sub(pattern, f'benefits: [\n      {benefits_str}\n    ]', obj_str, flags=re.DOTALL)
        
        # Update updatedAt timestamp
        today = datetime.now().strftime('%Y-%m-%d')
        pattern = r'updatedAt:\s*"[^"]*"'
        obj_str = re.sub(pattern, f'updatedAt: "{today}"', obj_str)
        
        return obj_str

def main():
    """Main entry point."""
    if len(sys.argv) < 4:
        print("❌ Usage: python update_product.py <repo_path> <product_id> <update_data_json>")
        print("\nExample:")
        print('  python update_product.py /home/ubuntu/web-fahsiam organic-chemical-12-3-5-growth \'{"price": 1190}\'')
        sys.exit(1)
    
    repo_path = sys.argv[1]
    product_id = sys.argv[2]
    update_json = sys.argv[3]
    
    try:
        update_data = json.loads(update_json)
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON: {str(e)}")
        sys.exit(1)
    
    try:
        updater = ProductUpdater(repo_path)
        success, message = updater.update_product(product_id, update_data)
        print(message)
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()
