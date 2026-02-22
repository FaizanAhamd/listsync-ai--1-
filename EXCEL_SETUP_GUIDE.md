# Amazon Excel Generator Setup Guide

## 📋 Overview
This project now supports direct `.xlsm` Excel file generation for Amazon product listings using the **ZIP surgery approach**. This preserves your template's structure perfectly—no styles lost, no shared string index collisions.

## 🎯 Prerequisites

1. **Node Modules Installed**
   ```bash
   npm install jszip
   ```

2. **Place Template in `/public` folder**
   - File: `SKIN_CARE_AGENT.xlsm`
   - Location: `public/SKIN_CARE_AGENT.xlsm`
   - This is your base template that will be populated with product data

## 🚀 Usage Methods

### Method 1: Use the CSVGenerator Component (Recommended)
The `CSVGenerator` component now includes an **"Export Excel"** button:

```tsx
// In your component
import { CSVGenerator } from "./components/CSVGenerator";

// Pass your product data
<CSVGenerator 
  data={{
    parent: {
      sku: "PARENT-SKU",
      title: "Product Title",
      brand: "Brand Name",
      description: "Product description...",
      bullets: ["Feature 1", "Feature 2", "Feature 3"],
      country_of_origin: "India",
      manufacturer: "Manufacturer Name"
    },
    children: [
      {
        sku: "CHILD-SKU-1",
        title: "Variant Title",
        price: 499,
        quantity: 100,
        variation_value: "Size: 50ml"
      }
    ]
  }}
  platform="Amazon"
/>
```

### Method 2: Direct Function Call
For custom implementations, call `generateAmazonExcel()` directly:

```tsx
import { generateAmazonExcel } from "./src/utils/amazonExcelGenerator";

// Minimal required fields
await generateAmazonExcel({
  sku: "SKU123",
  title: "Your Product Title",
  brand: "Brand Name",
  price: 499,
  quantity: 100,
  ingredients: "Water,Glycerin",
  mainImageUrl: "https://example.com/image.jpg"
});
```

### Method 3: Use the Form Component
Pre-built form with all fields:

```tsx
import AmazonExcelForm from "./components/AmazonExcelForm";

export default function App() {
  return <AmazonExcelForm />;
}
```

## 📝 Full Parameter Reference

```typescript
interface FormData {
  // Required Fields
  sku: string;                    // e.g., "SERUM-001"
  title: string;                  // 10+ chars
  brand: string;                  // e.g., "YourBrand"
  price: number | string;         // e.g., 499 or "499"
  quantity: number | string;      // e.g., 100
  ingredients: string;            // Comma-separated: "Water,Glycerin,Aloe"
  mainImageUrl: string;           // Image URL

  // Optional Fields (Auto-defaults)
  productType?: string;           // Default: "SKIN_CARE"
  productIdType?: string;         // Default: "GCID"
  productId?: string;
  browseNode?: string;            // Default: "1374416031"
  manufacturer?: string;          // Default: brand name
  modelNumber?: string;           // Default: "MODEL-{sku}"
  manufacturerPartNo?: string;    // Default: "MPN-{sku}"
  manufacturerDescription?: string;
  productTaxCode?: string;        // Default: "A_GEN_NOTAX"
  merchantShippingGroup?: string; // Default: "Standard Shipping"
  countryOfOrigin?: string;       // Default: "India"
  
  // Product Details
  description?: string;
  keyFeatures?: string;           // Newline-separated bullet points
  amazonKeywords?: string;        // Comma-separated
  skinType?: string;              // Comma-separated
  itemForm?: string;              // e.g., "Cream", "Serum", "Gel"
  scent?: string;
  gender?: string;                // Default: "Unisex"
  
  // Packaging
  numberOfItems?: string | number;      // Default: "1"
  itemPackageQuantity?: string | number; // Default: "1"
  
  // Images
  imageUrls?: string;             // Newline-separated URLs
  
  // Business
  mrp?: number | string;          // Maximum Retail Price
  lifestyle?: string;             // Default: "Beauty"
  style?: string;
}
```

## ✅ Validation Rules

These fields are **required** and will raise errors if missing:
- `sku` - Cannot be empty
- `title` - Minimum 10 characters
- `brand` - Cannot be empty
- `price` - Must be > 0
- `quantity` - Must be ≥ 1
- `ingredients` - At least 1 ingredient required
- `mainImageUrl` - At least 1 valid image URL required

## 🛠️ Column Mapping Reference

The generator maps to **313 Amazon columns** including:
- SKU & Parent SKU management
- Product metadata (brand, title, description)
- Pricing (our price, MRP)
- Inventory (fulfillment, quantity)
- Images (main + 8 variations)
- Product details (ingredients, skin types, form factor)
- Shipping configuration
- Tax & compliance (HSN, GST, tax codes)

Full mapping in `src/utils/amazonExcelGenerator.ts` → `buildColumnMap()` function

## 📦 File Structure

```
listsync-ai/
├── public/
│   └── SKIN_CARE_AGENT.xlsm          ← Place your template here
├── src/
│   ├── components/
│   │   ├── CSVGenerator.tsx           ← Updated with Excel button
│   │   └── AmazonExcelForm.tsx        ← Full form UI
│   └── utils/
│       └── amazonExcelGenerator.ts    ← Core generator (ZIP surgery)
└── package.json
```

## 🔧 How It Works (Technical Details)

### ZIP Surgery Approach
Instead of rebuilding the entire Excel workbook (which can corrupt formatting):

1. **Load** the `.xlsm` as a ZIP file using `jszip`
2. **Parse** `xl/sharedStrings.xml` to cache all text strings
3. **Map** your data to exact column indices in `xl/worksheets/sheet5.xml`
4. **Write** only the changed row (row 6)
5. **Update** shared strings if new values added
6. **Re-compress** as `.xlsm` with DEFLATE compression

### Result
✅ Preserves template styles  
✅ Maintains all formatting  
✅ No shared string index collisions  
✅ Maintains VBA macros (if any)  

## 🧪 Testing the Setup

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/

3. Navigate to the Excel export component

4. Fill in the form with test data

5. Click "Export Excel" button

6. Download and open the generated `amazon_SKU123.xlsm` file in Excel

## ⚠️ Troubleshooting

| Error | Solution |
|-------|----------|
| "Template not found (HTTP 404)" | Place `SKIN_CARE_AGENT.xlsm` in `/public` folder |
| "sharedStrings.xml not found" | Verify template is valid `.xlsm` file |
| Port 3000 already in use | Run `npm run dev` with different port: `vite --port 3001` |
| Excel file won't open | Check browser console for detailed error message |

## 📚 Example Integration

### In your App.tsx:
```tsx
import { CSVGenerator } from "./components/CSVGenerator";

function App() {
  const productData = {
    parent: {
      sku: "SERUM-PARENT",
      title: "Vitamin C Brightening Serum",
      brand: "YourBeautyBrand",
      description: "Premium anti-aging serum with 20% Vitamin C...",
      bullets: [
        "Brightens tired skin",
        "Reduces dark spots",
        "Lightweight, fast-absorbing",
        "Suitable for all skin types"
      ],
      manufacturer: "YourBeautyBrand",
      country_of_origin: "India"
    },
    children: [
      {
        sku: "SERUM-30ML",
        title: "Vitamin C Serum 30ml",
        price: 299,
        quantity: 50,
        variation_value: "30ml"
      },
      {
        sku: "SERUM-50ML",
        title: "Vitamin C Serum 50ml",
        price: 499,
        quantity: 100,
        variation_value: "50ml"
      }
    ]
  };

  return (
    <div>
      <h1>Product Export</h1>
      <CSVGenerator 
        data={productData} 
        platform="Amazon" 
      />
    </div>
  );
}

export default App;
```

## 🎉 You're All Set!
Your project now supports production-grade Excel export for Amazon listings. The ZIP surgery approach ensures perfect template preservation.

For questions or modifications, refer to the type definitions in `src/utils/amazonExcelGenerator.ts`.
