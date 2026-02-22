/**
 * AmazonExcelForm.tsx — Example integration of amazonExcelGenerator
 * Shows how to call generateAmazonExcel() from a React form
 */

import React, { useState } from "react";
import { generateAmazonExcel } from "../utils/amazonExcelGenerator";

export default function AmazonExcelForm() {
  const [formData, setFormData] = useState({
    sku: "",
    title: "",
    brand: "",
    price: "",
    quantity: "",
    productType: "SKIN_CARE",
    description: "",
    keyFeatures: "",
    amazonKeywords: "",
    ingredients: "",
    skinType: "",
    itemForm: "",
    mainImageUrl: "",
    imageUrls: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const fileName = await generateAmazonExcel(formData);
      setSuccess(`✅ File generated: ${fileName}`);
      // Reset form
      setFormData({
        sku: "",
        title: "",
        brand: "",
        price: "",
        quantity: "",
        productType: "SKIN_CARE",
        description: "",
        keyFeatures: "",
        amazonKeywords: "",
        ingredients: "",
        skinType: "",
        itemForm: "",
        mainImageUrl: "",
        imageUrls: "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Amazon Excel Generator</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            SKU (Required)
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title (min 10 chars)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand (Required)
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (Required)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity (Required)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Key Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Key Features (one per line)
          </label>
          <textarea
            name="keyFeatures"
            value={formData.keyFeatures}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amazon Keywords (comma separated)
          </label>
          <input
            type="text"
            name="amazonKeywords"
            value={formData.amazonKeywords}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ingredients (comma separated, Required)
          </label>
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Skin Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skin Type (comma separated)
          </label>
          <input
            type="text"
            name="skinType"
            value={formData.skinType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Item Form */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Item Form
          </label>
          <input
            type="text"
            name="itemForm"
            value={formData.itemForm}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Main Image URL (Required)
          </label>
          <input
            type="url"
            name="mainImageUrl"
            value={formData.mainImageUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Image URLs (one per line)
          </label>
          <textarea
            name="imageUrls"
            value={formData.imageUrls}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Generating..." : "Generate Excel File"}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500">
        ℹ️ Template file (SKIN_CARE_AGENT.xlsm) should be placed in the{" "}
        <code className="bg-gray-100 px-1 py-0.5 rounded">/public</code> folder
      </p>
    </div>
  );
}
