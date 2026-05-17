const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (productData, token) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (productData[key] !== null && productData[key] !== undefined) {
        if (key === 'sizes' || key === 'thickness' || key === 'applications' || key === 'colors' || key === 'features') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id, productData, token) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (productData[key] !== null && productData[key] !== undefined) {
        if (key === 'sizes' || key === 'thickness' || key === 'applications' || key === 'colors' || key === 'features') {
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return null;
  },

  // Gallery
  getGallery: async () => {
    const response = await fetch(`${API_BASE_URL}/gallery/`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials/`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },

  // Services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services/`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  // Site Settings
  getSiteSettings: async () => {
    const response = await fetch(`${API_BASE_URL}/site-settings/`);
    if (!response.ok) throw new Error('Failed to fetch site settings');
    return response.json();
  },

  // Inquiry
  createInquiry: async (inquiryData) => {
    const response = await fetch(`${API_BASE_URL}/inquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiryData),
    });
    if (!response.ok) throw new Error('Failed to submit inquiry');
    return response.json();
  },

  // Auth
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },
};
