const API_BASE_URL = "http://localhost:8989/api";

type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

async function request<T>(endpoint: string, method: string = "GET", body: any = null, token: string | null = null): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Error en la solicitud" }));
      throw new Error(errorData.message || `Error ${response.status}`);
    }
    if (response.status === 204) return undefined as T;
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const api = {
  auth: {
    login: (email: string, password: string) => request<LoginResponse>("/auth/login", "POST", { email, password }),
    register: (name: string, email: string, password: string) => request<LoginResponse>("/auth/register", "POST", { name, email, password }),
    forgotPassword: (email: string) => request<{ message: string }>("/auth/forgot-password", "POST", { email }),
  },
  crud: {
    list: (section: string, token: string) => request<any[]>(`/${section}`, "GET", null, token),
    create: (section: string, data: any, token: string) => request<any>(`/${section}`, "POST", data, token),
    update: (section: string, id: string, data: any, token: string) => request<any>(`/${section}/${id}`, "PUT", data, token),
    delete: (section: string, id: string, token: string) => request<void>(`/${section}/${id}`, "DELETE", null, token),
  },
  facturas: {
    list: (token: string) => request<any[]>(`/facturas`, "GET", null, token),
    create: (data: any, token: string) => request<any>(`/facturas`, "POST", data, token),
    update: (id: string, data: any, token: string) => request<any>(`/facturas/${id}`, "PUT", data, token),
    delete: (id: string, token: string) => request<void>(`/facturas/${id}`, "DELETE", null, token),
  },
  stats: {
    get: (token: string) => request<{ barData: any[]; pieData: any[]; tableData: any[] }>(`/stats`, "GET", null, token),
  },
  profile: {
    get: (token: string) => request<any>(`/profile`, "GET", null, token),
    update: (data: any, token: string) => request<any>(`/profile`, "PUT", data, token),
    changePassword: (data: { actual: string; nueva: string }, token: string) => request<{ message: string }>(`/profile/password`, "PUT", data, token),
  },
};