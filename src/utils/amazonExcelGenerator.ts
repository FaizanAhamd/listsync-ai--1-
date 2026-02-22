/**
 * amazonExcelGenerator.ts — Production-grade ZIP surgery approach
 * Manipulates SKIN_CARE_AGENT.xlsm directly without rebuilding the entire workbook
 * npm install jszip
 */

import JSZip from "jszip";

const MID = "A21TJRUUN4KGV";
const LANG = "en_IN";
const M = `marketplace_id=${MID}`;
const ML = `marketplace_id=${MID}][language_tag=${LANG}`;

const TEMPLATE_URL = "/SKIN_CARE_AGENT.xlsm";
const TEMPLATE_SHEET_PATH = "xl/worksheets/sheet5.xml";
const SHARED_STRINGS_PATH = "xl/sharedStrings.xml";
const DATA_ROW_NUMBER = 6;

interface FormData {
  sku: string;
  title: string;
  brand: string;
  price: number | string;
  quantity: number | string;
  productType?: string;
  productIdType?: string;
  productId?: string;
  browseNode?: string;
  manufacturer?: string;
  modelNumber?: string;
  manufacturerPartNo?: string;
  manufacturerDescription?: string;
  productTaxCode?: string;
  merchantShippingGroup?: string;
  description?: string;
  keyFeatures?: string;
  amazonKeywords?: string;
  ingredients?: string | string[];
  skinType?: string;
  itemForm?: string;
  scent?: string;
  countryOfOrigin?: string;
  mainImageUrl?: string;
  imageUrls?: string;
  lifestyle?: string;
  style?: string;
  gender?: string;
  itemTypeName?: string;
  numberOfItems?: string | number;
  itemPackageQuantity?: string | number;
  netQuantity?: string | number;
  mrp?: number | string;
}

interface NormalizedData {
  sku: string;
  title: string;
  brand: string;
  price: number;
  quantity: number;
  productType?: string;
  productIdType?: string;
  productId?: string;
  browseNode?: string;
  manufacturer?: string;
  modelNumber?: string;
  manufacturerPartNo?: string;
  manufacturerDescription?: string;
  productTaxCode?: string;
  merchantShippingGroup?: string;
  description?: string;
  keyFeatures?: string;
  amazonKeywords?: string;
  skinType?: string;
  itemForm?: string;
  scent?: string;
  countryOfOrigin?: string;
  mainImageUrl?: string;
  imageUrls?: string;
  lifestyle?: string;
  style?: string;
  gender?: string;
  itemTypeName?: string;
  numberOfItems?: string | number;
  itemPackageQuantity?: string | number;
  netQuantity?: string | number;
  mrp?: number;
  bullets: string[];
  keywords: string[];
  ingredients: string[];
  skinTypes: string[];
  mainImg: string;
  extraImages: string[];
}

export async function generateAmazonExcel(formData: FormData): Promise<string> {
  const r = normalizeData(formData);
  const errs = validateData(r);
  
  if (errs.length > 0) {
    throw new Error("Validation failed:\n" + errs.map((e) => "• " + e).join("\n"));
  }

  console.log("📥 Fetching template:", TEMPLATE_URL);
  const res = await fetch(TEMPLATE_URL);
  
  if (!res.ok) {
    throw new Error(
      `Template not found (HTTP ${res.status}). Place SKIN_CARE_AGENT.xlsm in /public.`
    );
  }
  
  const buffer = await res.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const ssFile = zip.file(SHARED_STRINGS_PATH);
  if (!ssFile) throw new Error("sharedStrings.xml not found in template.");
  
  const ssXml = await ssFile.async("string");
  const sharedStrings = parseSharedStrings(ssXml);

  const colMap = buildColumnMap();
  const payload = buildPayload(r);

  const cellWrites: Array<{
    colIndex: number;
    value: string | number;
    isNumeric: boolean;
    colName: string;
    ssIndex?: number;
  }> = [];
  
  for (const [colName, value] of Object.entries(payload)) {
    const colIndex = colMap[colName as keyof ReturnType<typeof buildColumnMap>];
    if (colIndex === undefined) {
      console.warn("❌ NOT FOUND:", colName);
      continue;
    }
    if (value === null || value === undefined || value === "") continue;
    
    const isNumeric = typeof value === "number";
    cellWrites.push({ colIndex, value, isNumeric, colName });
    console.log("✅", colName, "→ col", colIndex, "=", value);
  }

  for (const cw of cellWrites) {
    if (!cw.isNumeric) {
      cw.ssIndex = getOrAddString(sharedStrings, String(cw.value));
    }
  }

  const rowXml = buildRowXml(DATA_ROW_NUMBER, cellWrites);

  let sheetXml = await zip.file(TEMPLATE_SHEET_PATH)?.async("string");
  if (!sheetXml) throw new Error("sheet5.xml not found in template.");
  
  sheetXml = sheetXml.replace(/<row r="6"[^>]*>[\s\S]*?<\/row>/g, "");
  sheetXml = sheetXml.replace("</sheetData>", rowXml + "</sheetData>");

  zip.file(TEMPLATE_SHEET_PATH, sheetXml);
  zip.file(SHARED_STRINGS_PATH, serializeSharedStrings(sharedStrings));

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.ms-excel.sheet.macroEnabled.12",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  const fileName = "amazon_" + r.sku + ".xlsm";
  triggerDownload(blob, fileName);
  console.log("✅ Downloaded:", fileName, ((blob.size / 1024).toFixed(1)) + " KB");
  
  return fileName;
}

function buildRowXml(
  rowNum: number,
  cellWrites: Array<{ colIndex: number; value: string | number; isNumeric: boolean; ssIndex?: number }>
): string {
  const sorted = [...cellWrites].sort((a, b) => a.colIndex - b.colIndex);
  let cells = "";
  
  for (const cw of sorted) {
    const addr = colIndexToLetter(cw.colIndex) + rowNum;
    if (cw.isNumeric) {
      cells += '<c r="' + addr + '" t="n"><v>' + cw.value + "</v></c>";
    } else {
      cells += '<c r="' + addr + '" t="s"><v>' + cw.ssIndex + "</v></c>";
    }
  }
  
  return '<row r="' + rowNum + '" spans="1:313">' + cells + "</row>";
}

function buildPayload(r: NormalizedData): Record<string, string | number | null> {
  const d: Record<string, string | number | null> = {};
  
  const p = (col: string, val: string | number | undefined | null) => {
    if (val !== null && val !== undefined && val !== "") {
      d[col] = val;
    }
  };

  p("contribution_sku#1.value", r.sku);
  p("::record_action", "Create");
  p("product_type#1.value", r.productType);
  p(`item_name[${ML}]#1.value`, r.title);
  p(`brand[${ML}]#1.value`, r.brand);
  p("amzn1.volt.ca.product_id_type", r.productIdType);
  p("amzn1.volt.ca.product_id_value", r.productId);
  p(`recommended_browse_nodes[${M}]#1.value`, r.browseNode);
  p(`manufacturer[${ML}]#1.value`, r.manufacturer);
  p(`model_number[${M}]#1.value`, r.modelNumber);
  p(`part_number[${M}]#1.value`, r.manufacturerPartNo);
  p("rtip_manufacturer_contact_information#1.value", r.manufacturerDescription);
  p(`condition_type[${M}]#1.value`, "New");
  p("product_tax_code#1.value", r.productTaxCode);
  p("fulfillment_availability#1.fulfillment_channel_code", "DEFAULT");
  p("fulfillment_availability#1.quantity", r.quantity);
  p("fulfillment_availability#1.is_inventory_available", "true");
  p(
    `purchasable_offer[${M}][audience=ALL]#1.our_price#1.schedule#1.value_with_tax`,
    r.price
  );
  p(
    `purchasable_offer[${M}][audience=ALL]#1.maximum_retail_price#1.schedule#1.value_with_tax`,
    r.mrp
  );
  p(`merchant_shipping_group[${M}]#1.value`, r.merchantShippingGroup);
  p(`product_description[${M}][language_tag=${LANG}]#1.value`, r.description);
  
  r.bullets.forEach((b, i) =>
    p(`bullet_point[${M}][language_tag=${LANG}]#${i + 1}.value`, b)
  );
  
  r.keywords.forEach((k, i) =>
    p(`generic_keyword[${M}][language_tag=${LANG}]#${i + 1}.value`, k)
  );
  
  p(`item_type_name[${M}][language_tag=${LANG}]#1.value`, r.itemTypeName);
  p(`number_of_items[${M}]#1.value`, r.numberOfItems);
  p(`item_package_quantity[${M}]#1.value`, r.itemPackageQuantity);
  p(`target_gender[${M}]#1.value`, r.gender);
  p(`lifestyle[${M}][language_tag=${LANG}]#1.value`, r.lifestyle);
  p(`style[${M}][language_tag=${LANG}]#1.value`, r.style);
  
  r.skinTypes.forEach((st, i) =>
    p(`skin_type[${M}][language_tag=${LANG}]#${i + 1}.value`, st)
  );
  
  p(`item_form[${M}][language_tag=${LANG}]#1.value`, r.itemForm);
  
  r.ingredients.forEach((ing, i) =>
    p(`ingredients[${M}][language_tag=${LANG}]#${i + 1}.value`, ing)
  );
  
  if (r.scent) p(`scent[${M}][language_tag=${LANG}]#1.value`, r.scent);
  p(`country_of_origin[${M}]#1.value`, r.countryOfOrigin);
  p(`main_product_image_locator[${M}]#1.media_location`, r.mainImg);
  
  r.extraImages.forEach((img, i) =>
    p(`other_product_image_locator_${i + 1}[${M}]#1.media_location`, img)
  );
  
  return d;
}

function buildColumnMap(): Record<string, number> {
  return {
    "contribution_sku#1.value": 0,
    "::record_action": 1,
    "product_type#1.value": 2,
    [`item_name[${ML}]#1.value`]: 3,
    [`brand[${ML}]#1.value`]: 4,
    "amzn1.volt.ca.product_id_type": 5,
    "amzn1.volt.ca.product_id_value": 6,
    [`recommended_browse_nodes[${M}]#1.value`]: 7,
    [`model_number[${M}]#1.value`]: 20,
    [`manufacturer[${ML}]#1.value`]: 21,
    [`condition_type[${M}]#1.value`]: 25,
    "product_tax_code#1.value": 27,
    "fulfillment_availability#1.fulfillment_channel_code": 49,
    "fulfillment_availability#1.quantity": 50,
    "fulfillment_availability#1.is_inventory_available": 53,
    [`purchasable_offer[${M}][audience=ALL]#1.our_price#1.schedule#1.value_with_tax`]: 54,
    [`purchasable_offer[${M}][audience=ALL]#1.maximum_retail_price#1.schedule#1.value_with_tax`]: 55,
    [`merchant_shipping_group[${M}]#1.value`]: 81,
    [`product_description[${M}][language_tag=${LANG}]#1.value`]: 82,
    [`bullet_point[${M}][language_tag=${LANG}]#1.value`]: 83,
    [`bullet_point[${M}][language_tag=${LANG}]#2.value`]: 84,
    [`bullet_point[${M}][language_tag=${LANG}]#3.value`]: 85,
    [`bullet_point[${M}][language_tag=${LANG}]#4.value`]: 86,
    [`bullet_point[${M}][language_tag=${LANG}]#5.value`]: 87,
    [`generic_keyword[${M}][language_tag=${LANG}]#1.value`]: 88,
    [`generic_keyword[${M}][language_tag=${LANG}]#2.value`]: 89,
    [`generic_keyword[${M}][language_tag=${LANG}]#3.value`]: 90,
    [`generic_keyword[${M}][language_tag=${LANG}]#4.value`]: 91,
    [`generic_keyword[${M}][language_tag=${LANG}]#5.value`]: 92,
    [`lifestyle[${M}][language_tag=${LANG}]#1.value`]: 93,
    [`style[${M}][language_tag=${LANG}]#1.value`]: 94,
    [`target_gender[${M}]#1.value`]: 95,
    [`number_of_items[${M}]#1.value`]: 101,
    [`item_package_quantity[${M}]#1.value`]: 102,
    [`item_type_name[${M}][language_tag=${LANG}]#1.value`]: 103,
    [`part_number[${M}]#1.value`]: 107,
    "rtip_manufacturer_contact_information#1.value": 109,
    [`ingredients[${M}][language_tag=${LANG}]#1.value`]: 133,
    [`ingredients[${M}][language_tag=${LANG}]#2.value`]: 134,
    [`ingredients[${M}][language_tag=${LANG}]#3.value`]: 135,
    [`ingredients[${M}][language_tag=${LANG}]#4.value`]: 136,
    [`ingredients[${M}][language_tag=${LANG}]#5.value`]: 137,
    [`item_form[${M}][language_tag=${LANG}]#1.value`]: 149,
    [`scent[${M}][language_tag=${LANG}]#1.value`]: 168,
    [`skin_type[${M}][language_tag=${LANG}]#1.value`]: 173,
    [`skin_type[${M}][language_tag=${LANG}]#2.value`]: 174,
    [`skin_type[${M}][language_tag=${LANG}]#3.value`]: 175,
    [`skin_type[${M}][language_tag=${LANG}]#4.value`]: 176,
    [`skin_type[${M}][language_tag=${LANG}]#5.value`]: 177,
    [`country_of_origin[${M}]#1.value`]: 207,
    [`main_product_image_locator[${M}]#1.media_location`]: 285,
    [`other_product_image_locator_1[${M}]#1.media_location`]: 286,
    [`other_product_image_locator_2[${M}]#1.media_location`]: 287,
    [`other_product_image_locator_3[${M}]#1.media_location`]: 288,
    [`other_product_image_locator_4[${M}]#1.media_location`]: 289,
    [`other_product_image_locator_5[${M}]#1.media_location`]: 290,
    [`other_product_image_locator_6[${M}]#1.media_location`]: 291,
    [`other_product_image_locator_7[${M}]#1.media_location`]: 292,
    [`other_product_image_locator_8[${M}]#1.media_location`]: 293,
  };
}

function normalizeData(f: FormData): NormalizedData {
  const r: NormalizedData = { ...f } as NormalizedData;
  
  if (!r.productType) r.productType = "SKIN_CARE";
  if (!r.productIdType) r.productIdType = "GCID";
  if (!r.countryOfOrigin) r.countryOfOrigin = "India";
  if (!r.manufacturer) r.manufacturer = r.brand;
  if (!r.manufacturerPartNo) r.manufacturerPartNo = "MPN-" + r.sku;
  if (!r.modelNumber) r.modelNumber = "MODEL-" + r.sku;
  if (!r.gender) r.gender = "Unisex";
  if (!r.merchantShippingGroup) r.merchantShippingGroup = "Standard Shipping";
  if (!r.itemPackageQuantity) r.itemPackageQuantity = "1";
  if (!r.numberOfItems) r.numberOfItems = "1";
  if (!r.productTaxCode) r.productTaxCode = "A_GEN_NOTAX";
  if (!r.mrp) r.mrp = r.price;
  if (!r.browseNode) r.browseNode = "1374416031";
  if (!r.itemTypeName) r.itemTypeName = "skin-moisturizer";
  if (!r.lifestyle) r.lifestyle = "Beauty";
  
  if (!r.manufacturerDescription && r.description) {
    r.manufacturerDescription = r.description.slice(0, 100);
  }
  
  if (r.netQuantity && /^\d+$/.test(String(r.netQuantity).trim())) {
    r.netQuantity = String(r.netQuantity).trim() + " ml";
  }

  r.bullets = r.keyFeatures
    ? r.keyFeatures
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
    : [];
    
  r.keywords = r.amazonKeywords
    ? r.amazonKeywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
    : [];
    
  const ingredientsInput = Array.isArray(r.ingredients) ? r.ingredients.join(",") : r.ingredients;
  r.ingredients = ingredientsInput
    ? String(ingredientsInput)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
    : [];
    
  r.skinTypes = r.skinType
    ? r.skinType
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
    : ["All Skin Types"];

  const imgs = r.imageUrls
    ? r.imageUrls
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
    
  r.mainImg = imgs[0] || r.mainImageUrl || "";
  r.extraImages = imgs.slice(1, 9);

  r.price = parseFloat(String(r.price)) || 0;
  r.mrp = parseFloat(String(r.mrp)) || r.price;
  r.quantity = parseInt(String(r.quantity)) || 0;
  
  return r;
}

function validateData(r: NormalizedData): string[] {
  const e: string[] = [];
  
  if (!r.sku?.trim()) e.push("SKU is required");
  if (!r.title || r.title.length < 10) e.push("Title must be at least 10 characters");
  if (!r.brand?.trim()) e.push("Brand is required");
  if (typeof r.price !== 'number' || r.price <= 0) e.push("Price must be greater than 0");
  if (typeof r.quantity !== 'number' || r.quantity < 1) e.push("Quantity must be at least 1");
  if (!r.ingredients?.length) e.push("Ingredients are mandatory");
  if (!r.mainImg) e.push("At least 1 image URL is required");
  
  return e;
}

function parseSharedStrings(xml: string): string[] {
  const strings: string[] = [];
  const regex = /<si>[\s\S]*?<t(?:[^>]*)>([\s\S]*?)<\/t>[\s\S]*?<\/si>/g;
  let m: RegExpExecArray | null;
  
  while ((m = regex.exec(xml)) !== null) {
    strings.push(unescapeXml(m[1]));
  }
  
  return strings;
}

function getOrAddString(arr: string[], str: string): number {
  const i = arr.indexOf(str);
  if (i !== -1) return i;
  arr.push(str);
  return arr.length - 1;
}

function serializeSharedStrings(strings: string[]): string {
  const n = strings.length;
  const items = strings
    .map((s) => {
      const esc = escapeXml(s);
      return s !== s.trim()
        ? '<si><t xml:space="preserve">' + esc + "</t></si>"
        : "<si><t>" + esc + "</t></si>";
    })
    .join("");
    
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
    '<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
    'count="' +
    n +
    '" uniqueCount="' +
    n +
    '">' +
    items +
    "</sst>"
  );
}

function colIndexToLetter(i: number): string {
  let r = "";
  let n = i;
  while (n >= 0) {
    r = String.fromCharCode((n % 26) + 65) + r;
    n = Math.floor(n / 26) - 1;
  }
  return r;
}

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function unescapeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function triggerDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
