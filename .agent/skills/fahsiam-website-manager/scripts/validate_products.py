#!/usr/bin/env python3
"""
Validate Products Script for Fah Siam Website Manager

This script validates all products in productsdetail.ts for data integrity.
It checks for missing fields, duplicate IDs, and invalid data types.

Usage:
    python validate_products.py <repo_path>

Example:
    python validate_products.py /home/ubuntu/web-fahsiam
"""

import sys
import re
from pathlib import Path
from typing import List, Dict, Tuple

class ProductValidator:
    """Validates product data integrity."""
    
    REQUIRED_FIELDS = ['id', 'name', 'price', 'image', 'category', 'benefits', 'usages', 'updatedAt']
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.products_file = self.repo_path / 'app' / 'data' / 'productsdetail.ts'
        
        if not self.products_file.exists():
            raise FileNotFoundError(f"❌ Products file not found: {self.products_file}")
    
    def validate_all(self) -> Tuple[bool, str, Dict]:
        """
        Validate all products.
        
        Returns:
            (is_valid, summary_message, validation_results)
        """
        content = self.products_file.read_text(encoding='utf-8')
        
        # Extract all product IDs
        id_pattern = r'id:\s*["\']([^"\']*)'
        product_ids = re.findall(id_pattern, content)
        
        if not product_ids:
            return False, "❌ No products found in file", {}
        
        # Check for duplicate IDs
        duplicate_ids = [pid for pid in product_ids if product_ids.count(pid) > 1]
        
        results = {
            'total_products': len(product_ids),
            'unique_products': len(set(product_ids)),
            'duplicate_ids': list(set(duplicate_ids)),
            'errors': [],
            'warnings': []
        }
        
        # Validate each product
        for product_id in set(product_ids):
            error = self._validate_product(content, product_id)
            if error:
                results['errors'].append(error)
        
        # Check for common issues
        self._check_common_issues(content, results)
        
        # Generate summary
        is_valid = len(results['errors']) == 0 and len(duplicate_ids) == 0
        summary = self._generate_summary(results, is_valid)
        
        return is_valid, summary, results
    
    def _validate_product(self, content: str, product_id: str) -> str:
        """
        Validate a single product.
        
        Returns:
            Error message if validation fails, empty string if valid
        """
        # Find product block
        pattern = rf'id:\s*["\']({re.escape(product_id)})["\']'
        match = re.search(pattern, content)
        
        if not match:
            return f"Product '{product_id}' not found"
        
        # Extract product object
        start_pos = match.start()
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
        
        product_obj = content[object_start:object_end]
        
        # Check required fields
        for field in self.REQUIRED_FIELDS:
            if f'{field}:' not in product_obj:
                return f"Product '{product_id}': Missing required field '{field}'"
        
        # Validate price is a number
        price_match = re.search(r'price:\s*(\d+)', product_obj)
        if not price_match:
            return f"Product '{product_id}': Invalid price format"
        
        price = int(price_match.group(1))
        if price <= 0:
            return f"Product '{product_id}': Price must be positive (current: {price})"
        
        # Validate benefits array is not empty
        benefits_match = re.search(r'benefits:\s*\[(.*?)\],', product_obj, re.DOTALL)
        if not benefits_match or not benefits_match.group(1).strip():
            # Try without comma for last item
            benefits_match = re.search(r'benefits:\s*\[(.*?)\]', product_obj, re.DOTALL)
            if not benefits_match or not benefits_match.group(1).strip():
                return f"Product '{product_id}': Benefits array is empty"
        
        # Validate usages array is not empty
        usages_match = re.search(r'usages:\s*\[(.*?)\],', product_obj, re.DOTALL)
        if not usages_match or not usages_match.group(1).strip():
            # Try without comma for last item
            usages_match = re.search(r'usages:\s*\[(.*?)\]', product_obj, re.DOTALL)
            if not usages_match or not usages_match.group(1).strip():
                return f"Product '{product_id}': Usages array is empty"
        
        # Validate date format
        date_match = re.search(r'updatedAt:\s*["\']([^"\']*)["\']', product_obj)
        if date_match:
            date_str = date_match.group(1)
            if not re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
                return f"Product '{product_id}': Invalid date format (should be YYYY-MM-DD, got {date_str})"
        
        return ""
    
    def _check_common_issues(self, content: str, results: Dict) -> None:
        """Check for common issues in the file."""
        
        # Check for unclosed braces
        open_braces = content.count('{')
        close_braces = content.count('}')
        if open_braces != close_braces:
            results['warnings'].append(f"Mismatched braces: {open_braces} opening, {close_braces} closing")
        
        # Check for unclosed brackets
        open_brackets = content.count('[')
        close_brackets = content.count(']')
        if open_brackets != close_brackets:
            results['warnings'].append(f"Mismatched brackets: {open_brackets} opening, {close_brackets} closing")
        
        # Check for trailing commas
        if re.search(r',\s*\]', content):
            results['warnings'].append("Found trailing commas in arrays")
        
        if re.search(r',\s*\}', content):
            results['warnings'].append("Found trailing commas in objects")
    
    def _generate_summary(self, results: Dict, is_valid: bool) -> str:
        """Generate validation summary message."""
        
        if is_valid:
            summary = f"✅ All products are valid!\n"
        else:
            summary = f"❌ Validation failed!\n"
        
        summary += f"   Total products: {results['total_products']}\n"
        summary += f"   Unique products: {results['unique_products']}\n"
        
        if results['duplicate_ids']:
            summary += f"   Duplicate IDs: {', '.join(results['duplicate_ids'])}\n"
        
        if results['errors']:
            summary += f"\n   Errors ({len(results['errors'])}):\n"
            for error in results['errors']:
                summary += f"   • {error}\n"
        
        if results['warnings']:
            summary += f"\n   Warnings ({len(results['warnings'])}):\n"
            for warning in results['warnings']:
                summary += f"   • {warning}\n"
        
        return summary

def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print("❌ Usage: python validate_products.py <repo_path>")
        print("\nExample:")
        print("  python validate_products.py /home/ubuntu/web-fahsiam")
        sys.exit(1)
    
    repo_path = sys.argv[1]
    
    try:
        validator = ProductValidator(repo_path)
        is_valid, summary, results = validator.validate_all()
        print(summary)
        sys.exit(0 if is_valid else 1)
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()
