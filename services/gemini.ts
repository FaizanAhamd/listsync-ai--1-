/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const GEMINI_API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';  // Free tier optimized
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Response cache to prevent repeated API calls
const responseCache = new Map<string, any>();

// Mock demo response for when API is unavailable
const generateMockResponse = (productData: { name: string, brand: string, category: string, features: string }) => {
  const skuRoot = productData.name.replace(/\s+/g, '-').toUpperCase();
  return {
    parent: {
      sku: `${skuRoot}-PARENT`,
      title: `${productData.brand} ${productData.name} - ${productData.features.split(',')[0]}`,
      description: `Premium ${productData.category} product by ${productData.brand}. Features: ${productData.features}`,
      bullets: productData.features.split(',').map(f => f.trim()).slice(0, 5),
      hsn: "3304",
      gst_rate: 18,
      brand: productData.brand,
      manufacturer: productData.brand,
      country_of_origin: "India"
    },
    children: [
      {
        sku: `${skuRoot}-30ML`,
        parent_sku: `${skuRoot}-PARENT`,
        variation_value: "30ml",
        price: 299,
        quantity: 50,
        title: `${productData.brand} ${productData.name} 30ml`
      },
      {
        sku: `${skuRoot}-50ML`,
        parent_sku: `${skuRoot}-PARENT`,
        variation_value: "50ml",
        price: 499,
        quantity: 100,
        title: `${productData.brand} ${productData.name} 50ml`
      }
    ],
    validation: {
      status: "success_demo",
      suggestions: ["Using demo response. Upgrade to paid plan for AI-generated responses."]
    }
  };
};

export async function optimizeListing(productData: { name: string, brand: string, category: string, features: string }) {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
      console.warn('⚠️ Using demo response - API key not configured');
      return generateMockResponse(productData);
    }

    // Check cache first
    const cacheKey = `${productData.name}-${productData.brand}-${productData.category}`;
    if (responseCache.has(cacheKey)) {
      console.log('📦 Using cached response');
      return responseCache.get(cacheKey);
    }

    // Simplified prompt to reduce token count
    const simplifiedPrompt = `Generate Indian marketplace listing for:
Product: ${productData.name}
Brand: ${productData.brand}
Category: ${productData.category}
Features: ${productData.features}

Return ONLY this JSON:
{
  "parent": {
    "sku": "SKU-CODE-PARENT",
    "title": "Product title 80-200 chars",
    "description": "Description text",
    "bullets": ["feature1", "feature2"],
    "hsn": "3304",
    "gst_rate": 18,
    "brand": "${productData.brand}",
    "manufacturer": "${productData.brand}",
    "country_of_origin": "India"
  },
  "children": [{
    "sku": "SKU-CODE-30ML",
    "parent_sku": "SKU-CODE-PARENT",
    "variation_value": "30ml",
    "price": 299,
    "quantity": 50,
    "title": "Title variant"
  }],
  "validation": {"status": "success", "suggestions": []}
}`;

    const requestBody = {
      contents: {
        parts: [{ text: simplifiedPrompt }]
      }
    };

    console.log("📡 Calling Gemini API (Free Tier)...");
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API Error:', response.status, errorData);
      
      // Handle rate limiting - use demo response instead
      if (response.status === 429) {
        console.warn('⚠️ API quota exhausted - using demo response');
        const demoResponse = generateMockResponse(productData);
        responseCache.set(cacheKey, demoResponse);
        return demoResponse;
      }
      
      throw new Error(`Gemini API failed (${response.status}): Check your API key and free tier status`);
    }

    const data = await response.json();
    console.log("✅ Gemini Response received");

    // Extract text from response
    let responseText = '';
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      responseText = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected Gemini response format');
    }

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    // Cache the successful response
    responseCache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error("Gemini Optimization Error:", error);
    // Return demo response as fallback
    return generateMockResponse(productData);
  }
}

export async function chatWithAI(message: string, history: { role: 'user' | 'ai', text: string }[]) {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
      return `Demo response: I'm ListSync AI Assistant. Upgrade to paid plan for real AI responses. Your message: "${message}"`;
    }

    const mappedHistory = history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const requestBody = {
      history: mappedHistory,
      contents: {
        parts: [{ text: message }]
      }
    };

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      if (response.status === 429) {
        return 'API quota exhausted. Please upgrade to paid plan or try again after 24 hours.';
      }
      throw new Error(`Chat API failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  } catch (error) {
    console.error("Chat Error:", error);
    return 'Chat service temporarily unavailable. Please upgrade to paid plan.';
  }
}