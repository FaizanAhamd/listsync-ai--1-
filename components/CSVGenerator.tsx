
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { generateAmazonExcel } from '../src/utils/amazonExcelGenerator';

interface CSVGeneratorProps {
  data: any;
  platform: 'Amazon' | 'Flipkart' | 'Meesho';
}

export const CSVGenerator: React.FC<CSVGeneratorProps> = ({ data, platform }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const escapeCSV = (val: any) => {
    if (val === undefined || val === null) return "";
    let str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      str = '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const downloadExcel = async () => {
    if (platform !== 'Amazon') {
      setError('Excel export is currently available only for Amazon platform');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const p = data.parent;
      const child = data.children?.[0]; // Use first child for Excel export

      if (!child) {
        throw new Error('At least one product variation required for Excel export');
      }

      await generateAmazonExcel({
        sku: child.sku,
        title: p.title,
        brand: p.brand,
        price: child.price,
        quantity: child.quantity,
        productType: 'SKIN_CARE',
        description: p.description,
        keyFeatures: p.bullets ? p.bullets.join('\n') : '',
        amazonKeywords: p.brand + ', skin care, beauty',
        ingredients: 'Organic Ingredients',
        skinType: 'All',
        itemForm: 'Serum',
        countryOfOrigin: p.country_of_origin || 'India',
        manufacturer: p.manufacturer || p.brand,
        modelNumber: `MODEL-${child.sku}`,
        manufacturerPartNo: `MPN-${child.sku}`,
        productTaxCode: 'A_GEN_NOTAX',
        mainImageUrl: 'https://example.com/placeholder.jpg',
        numberOfItems: '1',
        itemPackageQuantity: '1',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate Excel file';
      setError(message);
      console.error('Excel export error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    let csvContent = "";
    
    if (platform === 'Amazon') {
      // Strict 41-column Blueprint Mapping per Technical Architecture
      const headers = [
        "sku", "parent_sku", "relationship_type", "variation_theme", "product_type", 
        "brand", "title", "bullet_point1", "bullet_point2", "bullet_point3", 
        "bullet_point4", "bullet_point5", "description", "search_terms", "price", 
        "quantity", "condition_type", "product_id", "product_id_type", "item_form", 
        "skin_type", "ingredients", "net_quantity", "hsn", "gst_rate", 
        "manufacturer", "manufacturer_part_no", "model_number", "merchant_shipping_group", "item_package_quantity", 
        "product_tax_code", "main_image_url", "other_image_url1", "other_image_url2", "country_of_origin", 
        "weight", "volume", "expiry_applicable", "expiry_date", "variation_value", "hsns_description"
      ];

      const rows = [];
      
      // 1. Parent Row (Non-sellable grouping SKU)
      const p = data.parent;
      const parentRow = new Array(41).fill("");
      parentRow[0] = p.sku;
      parentRow[1] = ""; // parent_sku is blank for parent
      parentRow[2] = "parent";
      parentRow[3] = "Size"; // variation_theme
      parentRow[4] = "Skin Care"; // product_type
      parentRow[5] = p.brand;
      parentRow[6] = p.title;
      parentRow[7] = p.bullets?.[0] || "";
      parentRow[8] = p.bullets?.[1] || "";
      parentRow[9] = p.bullets?.[2] || "";
      parentRow[10] = p.bullets?.[3] || "";
      parentRow[11] = p.bullets?.[4] || "";
      parentRow[12] = p.description;
      parentRow[13] = p.brand + ", skin care, beauty"; // search_terms
      parentRow[14] = "0"; // price for parent
      parentRow[15] = "0"; // quantity for parent
      parentRow[16] = "New";
      parentRow[17] = ""; // product_id
      parentRow[18] = "GCID"; // product_id_type
      parentRow[19] = "Serum"; // item_form
      parentRow[20] = "All"; // skin_type
      parentRow[21] = "Organic Ingredients"; // ingredients
      parentRow[22] = "Multiple Sizes"; // net_quantity
      parentRow[23] = p.hsn || "3304";
      parentRow[24] = p.gst_rate || "18.0";
      parentRow[25] = p.manufacturer || p.brand;
      parentRow[26] = `MPN-${p.sku}`;
      parentRow[27] = `MODEL-${p.sku}`;
      parentRow[28] = "Standard Shipping";
      parentRow[29] = "1";
      parentRow[30] = "A_GEN_NOTAX";
      parentRow[31] = "https://example.com/placeholder-parent.jpg"; // main_image_url
      parentRow[34] = p.country_of_origin || "India";
      
      rows.push(parentRow.map(escapeCSV).join(","));

      // 2. Children Rows (Sellable SKUs)
      if (data.children && Array.isArray(data.children)) {
        data.children.forEach((c: any) => {
          const childRow = new Array(41).fill("");
          childRow[0] = c.sku;
          childRow[1] = p.sku; // parent_sku
          childRow[2] = "child";
          childRow[3] = "Size";
          childRow[4] = "Skin Care";
          childRow[5] = p.brand;
          childRow[6] = c.title || p.title;
          childRow[7] = p.bullets?.[0] || "";
          childRow[8] = p.bullets?.[1] || "";
          childRow[9] = p.bullets?.[2] || "";
          childRow[10] = p.bullets?.[3] || "";
          childRow[11] = p.bullets?.[4] || "";
          childRow[12] = p.description;
          childRow[13] = p.brand + ", beauty, " + (c.variation_value || "");
          childRow[14] = c.price;
          childRow[15] = c.quantity;
          childRow[16] = "New";
          childRow[17] = `EAN-${c.sku}`; // product_id
          childRow[18] = "EAN"; // product_id_type
          childRow[19] = "Serum";
          childRow[20] = "All";
          childRow[23] = p.hsn || "3304";
          childRow[24] = p.gst_rate || "18.0";
          childRow[25] = p.manufacturer || p.brand;
          childRow[26] = `MPN-${c.sku}`;
          childRow[27] = `MODEL-${c.sku}`;
          childRow[28] = "Standard Shipping";
          childRow[29] = "1";
          childRow[30] = "A_GEN_NOTAX";
          childRow[31] = "https://example.com/placeholder-child.jpg";
          childRow[34] = "India";
          childRow[39] = c.variation_value;
          childRow[40] = "Taxable Cosmetics"; // hsns_description
          rows.push(childRow.map(escapeCSV).join(","));
        });
      }

      csvContent = [headers.join(","), ...rows].join("\n");
    } else {
      // Generic export for other platforms
      const headers = ["SKU", "Parent SKU", "Title", "Price", "Quantity", "GST", "HSN", "Description"];
      const rows = [];
      const p = data.parent;
      
      if (data.children && Array.isArray(data.children)) {
        data.children.forEach((c: any) => {
          rows.push([
            c.sku, 
            p.sku, 
            escapeCSV(c.title || p.title), 
            c.price, 
            c.quantity, 
            p.gst_rate, 
            p.hsn, 
            escapeCSV(p.description)
          ].join(","));
        });
      }
      csvContent = [headers.join(","), ...rows].join("\n");
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${platform}_listing_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center gap-2">
      {error && (
        <div className="text-xs text-red-500 flex-1">
          {error}
        </div>
      )}
      <button 
        onClick={downloadExcel}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-700 border border-emerald-600 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-white hover:text-white group"
        title="Download as Excel (.xlsm) - Production Ready"
      >
        <ArrowDownTrayIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        {loading ? 'Generating...' : 'Export Excel'}
      </button>
      <button 
        onClick={downloadCSV}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 hover:border-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-gray-200 hover:text-white group"
      >
        <ArrowDownTrayIcon className="w-4 h-4 text-[#2563EB] group-hover:scale-110 transition-transform" />
        Export {platform} CSV
      </button>
    </div>
  );
};
