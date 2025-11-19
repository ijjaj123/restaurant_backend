// API Configuration
// Change this to your production URL when deploying
// Example: export const API_BASE_URL = 'https://your-api.com';
export const API_BASE_URL = 'http://127.0.0.1:7003';

// API endpoints
export const API_ENDPOINTS = {
  menu: `${API_BASE_URL}/api/home/menu-items/`,
  products: `${API_BASE_URL}/api/products/`,
  orders: `${API_BASE_URL}/api/orders/`,
  orderById: (id: number) => `${API_BASE_URL}/api/orders/${id}/`,
};

// Generic API request handler
async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Product types
export interface Product {
  id: number;
  name: string;
  price: string | number;
  image: string;
  description: string;
}

// Order types
export interface Order {
  id: number;
  dish: number;
  dish_name?: string;
  quantity: number;
  customer_name: string;
  status: string;
  created_at: string;
}

// API functions

export async function loadProducts(): Promise<Product[]> {
  return apiRequest<Product[]>(API_ENDPOINTS.menu);
}

export async function createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
  return apiRequest<Product>(API_ENDPOINTS.products, {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

export async function loadOrders(): Promise<Order[]> {
  return apiRequest<Order[]>(API_ENDPOINTS.orders);
}

export async function orderProduct(
  productId: number,
  quantity: number = 1,
  customerName: string = 'Guest'
): Promise<Order> {
  return apiRequest<Order>(API_ENDPOINTS.orders, {
    method: 'POST',
    body: JSON.stringify({
      dish: productId,
      quantity,
      customer_name: customerName,
    }),
  });
}

export async function updateOrderStatus(
  orderId: number,
  status: string
): Promise<Order> {
  return apiRequest<Order>(API_ENDPOINTS.orderById(orderId), {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
