const BASE_URL = 'http://localhost:5000/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Stringify body if it is an object
  let body = options.body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Tarmoq xatosi yuz berdi');
  }

  return data;
}

export const api = {
  auth: {
    register: (data) => apiRequest('/auth/register', { method: 'POST', body: data }),
    login: (data) => apiRequest('/auth/login', { method: 'POST', body: data }),
    me: () => apiRequest('/auth/me'),
  },
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/products?${query}`);
    },
    getById: (id) => apiRequest(`/products/${id}`),
    getCategories: () => apiRequest('/products/categories'),
    getCategoryBySlug: (slug) => apiRequest(`/products/categories/${slug}`),
  },
  orders: {
    create: (data) => apiRequest('/orders', { method: 'POST', body: data }),
    getAll: () => apiRequest('/orders'),
    getById: (id) => apiRequest(`/orders/${id}`),
  },
};
