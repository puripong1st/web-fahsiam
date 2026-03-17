---
name: fahsiam-website-manager
description: Complete website management system for Fah Siam (ฟ้าสยาม) fertilizer business. Use for managing products, optimizing SEO, generating product pages, and deploying the website. Includes product CRUD operations, image optimization, sitemap generation, and automated deployment workflows.
license: MIT
---

# Fah Siam Website Manager

A comprehensive Agent Skill for managing the Fah Siam (ฟ้าสยาม) fertilizer e-commerce website built with Next.js. This skill provides automated workflows for product management, SEO optimization, and website deployment.

## Overview

This skill transforms Manus into a specialized website manager for Fah Siam's fertilizer business. It handles:

- **Product Management**: Add, update, and delete fertilizer products with full validation
- **Image Optimization**: Automatically compress and convert product images to WebP format
- **SEO Optimization**: Generate and maintain sitemaps, optimize metadata, and implement SEO best practices
- **Page Generation**: Automatically create product detail pages from product data
- **Deployment**: Deploy the website to GitHub Pages or other hosting platforms

## When to Use This Skill

Use this skill when you need to:

1. **Add new fertilizer products** to the catalog with complete details (name, price, benefits, usage instructions)
2. **Update existing product information** (price changes, benefits, usage guidelines)
3. **Optimize product images** for web performance (compression, format conversion to WebP)
4. **Generate product detail pages** automatically from product data
5. **Update the website sitemap** for SEO and search engine crawling
6. **Deploy the website** to production after making changes
7. **Manage the GitHub repository** for the website (commit, push, pull)

## Core Workflows

### Workflow 1: Adding a New Product

**Trigger**: User provides new fertilizer product details

**Steps**:
1. Validate product data using `add_product.py`
2. Generate unique product ID from product name
3. Add product to `productsdetail.ts`
4. Generate product detail page using `generate_product_page.py`
5. Update sitemap using `update_sitemap.py`
6. Commit changes to GitHub

**Output**: Confirmation message with product ID and links to the new product page

### Workflow 2: Updating Product Information

**Trigger**: User provides product ID and fields to update

**Steps**:
1. Validate product ID exists in `productsdetail.ts`
2. Validate updated fields using `update_product.py`
3. Update product data in `productsdetail.ts`
4. Regenerate product detail page if needed
5. Update sitemap with new `updatedAt` timestamp
6. Commit changes to GitHub

**Output**: Confirmation of updated fields and timestamp

### Workflow 3: Optimizing Product Images

**Trigger**: User uploads new product images or requests optimization

**Steps**:
1. Validate image files (format, size, dimensions)
2. Compress images using `optimize_images.py`
3. Convert to WebP format for better web performance
4. Move optimized images to `public/image/Fertilizer/`
5. Update image paths in `productsdetail.ts` if needed
6. Commit changes to GitHub

**Output**: List of optimized images with file sizes and compression ratios

### Workflow 4: Deploying the Website

**Trigger**: User requests deployment after making changes

**Steps**:
1. Run all validations (product data, images, sitemap)
2. Build the Next.js project
3. Deploy to GitHub Pages using `deploy_website.sh`
4. Verify deployment success
5. Provide deployment URL and summary

**Output**: Deployment confirmation with live website URL

## Required Resources

### Scripts

Read `/home/ubuntu/skills/fahsiam-website-manager/scripts/` for implementation details:

- **`add_product.py`**: Add new products with validation
- **`update_product.py`**: Update existing product data
- **`generate_product_page.py`**: Generate product detail pages
- **`optimize_images.py`**: Compress and convert images to WebP
- **`update_sitemap.py`**: Generate/update sitemap for SEO
- **`deploy_website.sh`**: Deploy website to production
- **`validate_products.py`**: Validate all product data integrity

### References

Read these documents for detailed specifications:

- **`product_schema.md`**: Product data structure and validation rules
- **`seo_guidelines.md`**: SEO best practices for the website
- **`deployment_guide.md`**: Deployment configuration and troubleshooting

### Templates

- **`product_page_boilerplate.tsx`**: Template for product detail pages
- **`product_component_template.tsx`**: Reusable React components for product display

## Usage Examples

### Example 1: Add a New Product

```
User: "Add a new fertilizer product: name='ปุ๋ยอินทรีย์เคมี 15-5-10', price=1590, oldPrice=1890, benefits=['ช่วยบำรุงต้นและใบ', 'ช่วยให้รากแข็งแรง'], usages=[...]"

Skill Process:
1. Validate all required fields
2. Generate ID: "organic-chemical-15-5-10-growth"
3. Add to productsdetail.ts with updatedAt timestamp
4. Generate product page at app/products/[id]/page.tsx
5. Update sitemap.ts
6. Commit to GitHub
7. Return: "✅ Product added successfully. ID: organic-chemical-15-5-10-growth. View at: /products/organic-chemical-15-5-10-growth"
```

### Example 2: Update Product Price

```
User: "Update product 'organic-chemical-12-3-5-growth' - change price from 1290 to 1190"

Skill Process:
1. Validate product ID exists
2. Update price in productsdetail.ts
3. Update updatedAt timestamp
4. Regenerate product page
5. Update sitemap
6. Commit to GitHub
7. Return: "✅ Product updated. New price: ฿1,190 (was ฿1,290). Updated at: 2026-03-17"
```

### Example 3: Optimize Product Images

```
User: "Optimize images for products: [list of image files]"

Skill Process:
1. Validate image files
2. Compress each image
3. Convert to WebP format
4. Move to public/image/Fertilizer/
5. Update paths in productsdetail.ts
6. Commit to GitHub
7. Return: "✅ 6 images optimized. Average compression: 45%. Total size reduced: 2.3MB → 1.2MB"
```

### Example 4: Deploy Website

```
User: "Deploy the website to production"

Skill Process:
1. Run all validations
2. Build Next.js project
3. Deploy to GitHub Pages
4. Verify deployment
5. Return: "✅ Website deployed successfully! Live at: https://puripong1st.github.io/web-fahsiam"
```

## Data Structure Reference

### Product Object Structure

```typescript
type Product = {
  id: string;                    // Unique identifier (auto-generated)
  name: string;                  // Product name in Thai
  price: number;                 // Current price in THB
  oldPrice?: number;             // Original price (optional)
  badge?: "ใหม่" | "ฮิต" | "ลดราคา";  // Product badge (optional)
  image: string;                 // Path to product image (WebP format)
  category: string;              // Product category (e.g., "ปุ๋ย")
  benefits: string[];            // List of product benefits
  usages: ProductUsage[];        // Usage instructions by crop type
  updatedAt: string;             // Last update date (YYYY-MM-DD)
};

type ProductUsage = {
  groupName: string;             // Crop/plant group name
  items: ProductUsageDetail[];   // Usage details for each crop
};

type ProductUsageDetail = {
  label: string;                 // Specific crop name
  value: string;                 // Usage amount/instructions
};
```

## Error Handling & Validation

All scripts include comprehensive error handling:

- **Input Validation**: All user inputs are validated before processing
- **File Integrity**: Checks for duplicate IDs, missing required fields, invalid image formats
- **Atomic Operations**: Changes are committed to Git, allowing rollback if needed
- **Error Messages**: Clear, actionable error messages in Thai when validation fails
- **Recovery**: Automatic recovery mechanisms for common errors (e.g., missing directories)

## SEO Optimization Features

The skill automatically:

- Generates SEO-friendly product URLs based on product names
- Creates proper metadata for each product page
- Maintains an updated sitemap for search engine crawling
- Optimizes images for web performance (WebP, compression)
- Implements Schema.org structured data for products
- Tracks last update dates for freshness signals

## GitHub Integration

All operations are integrated with GitHub:

- Automatic commits after each change with descriptive messages
- Branch management for staging changes before deployment
- Rollback capability through Git history
- Deployment automation to GitHub Pages

## Troubleshooting

### Common Issues

**Issue**: Product ID already exists
- **Solution**: Use a different product name or manually specify a unique ID

**Issue**: Image optimization fails
- **Solution**: Check image format (must be JPG, PNG, or WebP) and file size (<10MB)

**Issue**: Deployment fails
- **Solution**: Verify GitHub credentials, check branch status, ensure no uncommitted changes

**Issue**: Sitemap not updating
- **Solution**: Run `update_sitemap.py` manually or check for file permission issues

## Best Practices

1. **Always validate data before adding**: Use the validation scripts to catch errors early
2. **Optimize images before uploading**: Reduces storage and improves performance
3. **Update product information regularly**: Keep prices and benefits current
4. **Test changes before deployment**: Review changes in staging before going live
5. **Maintain consistent naming**: Use Thai names for products and English for technical IDs
6. **Document changes**: Include descriptive commit messages for all changes

## Support & Maintenance

For issues or feature requests:

1. Check the troubleshooting section above
2. Review the relevant reference document
3. Run validation scripts to identify problems
4. Check Git logs for recent changes

---

**Last Updated**: 2026-03-17  
**Version**: 1.0.0  
**Maintained by**: Manus AI
