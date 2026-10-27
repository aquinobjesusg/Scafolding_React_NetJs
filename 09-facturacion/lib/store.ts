import { useState, useEffect } from "react";

export type Client = {
  id: string;
  name: string;
  ruc: string;
  address: string;
  email: string;
  phone: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  price: number;
  taxRate: number;
};

export type InvoiceItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  taxRate: number;
};

export type Invoice = {
  id: string;
  number: string;
  clientId: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "emitida" | "anulada";
};

export type Quote = {
  id: string;
  number: string;
  clientId: string;
  date: string;
  validUntil: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  status: "borrador" | "enviado" | "aceptado" | "rechazado";
};

export type UserRole = "Administrador" | "Facturador" | "Contador";

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
};

const KEY = "nucleo-billing-v2";

type State = {
  clients: Client[];
  products: Product[];
  invoices: Invoice[];
  quotes: Quote[];
};

const seed: State = {
  clients: [
    { id: "c1", name: "Distribuidora Andina Cía. Ltda.", ruc: "1790012345001", address: "Av. Amazonas N34-120, Quito", email: "compras@andina.ec", phone: "02-2345678" },
    { id: "c2", name: "Comercial Pacífico S.A.", ruc: "0992345671001", address: "Malecón 2000, Guayaquil", email: "facturacion@pacifico.ec", phone: "04-2567890" },
  ],
  products: [
    { id: "p1", code: "SRV-001", name: "Servicio de consultoría", price: 150, taxRate: 15 },
    { id: "p2", code: "LIC-010", name: "Licencia anual de software", price: 480, taxRate: 15 },
    { id: "p3", code: "HW-220", name: "Router empresarial", price: 320, taxRate: 15 },
  ],
  invoices: [],
  quotes: [],
};

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seed;
}

let listeners: Array<() => void> = [];
let state: State = load();

function setState(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

export function useBillingStore() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.push(l);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return {
    ...state,
    addClient: (c: Omit<Client, "id">) =>
      setState({ ...state, clients: [...state.clients, { ...c, id: crypto.randomUUID() }] }),
    removeClient: (id: string) =>
      setState({ ...state, clients: state.clients.filter((c) => c.id !== id) }),
    addProduct: (p: Omit<Product, "id">) =>
      setState({ ...state, products: [...state.products, { ...p, id: crypto.randomUUID() }] }),
    removeProduct: (id: string) =>
      setState({ ...state, products: state.products.filter((p) => p.id !== id) }),
    addInvoice: (inv: Omit<Invoice, "id">) =>
      setState({ ...state, invoices: [{ ...inv, id: crypto.randomUUID() }, ...state.invoices] }),
    toggleInvoiceStatus: (id: string) =>
      setState({
        ...state,
        invoices: state.invoices.map((i) =>
          i.id === id ? { ...i, status: i.status === "emitida" ? "anulada" : "emitida" } : i
        ),
      }),
    addQuote: (q: Omit<Quote, "id">) =>
      setState({ ...state, quotes: [{ ...q, id: crypto.randomUUID() }, ...state.quotes] }),
    updateQuoteStatus: (id: string, status: Quote["status"]) =>
      setState({
        ...state,
        quotes: state.quotes.map((q) => (q.id === id ? { ...q, status } : q)),
      }),
    removeQuote: (id: string) =>
      setState({ ...state, quotes: state.quotes.filter((q) => q.id !== id) }),
    convertQuoteToInvoice: (id: string) => {
      const q = state.quotes.find((x) => x.id === id);
      if (!q) return;
      const invoice: Invoice = {
        id: crypto.randomUUID(),
        number: nextInvoiceNumber(),
        clientId: q.clientId,
        date: new Date().toISOString(),
        items: q.items,
        subtotal: q.subtotal,
        tax: q.tax,
        total: q.total,
        status: "emitida",
      };
      setState({
        ...state,
        invoices: [invoice, ...state.invoices],
        quotes: state.quotes.map((x) => (x.id === id ? { ...x, status: "aceptado" } : x)),
      });
    },
  };
}

export function nextInvoiceNumber(): string {
  const n = state.invoices.length + 1;
  return `001-001-${String(n).padStart(9, "0")}`;
}

export function nextQuoteNumber(): string {
  const n = state.quotes.length + 1;
  return `PRE-${String(n).padStart(6, "0")}`;
}

export function currency(n: number): string {
  return new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(n);
}

/* ------------------------- Auth store ------------------------- */

const USERS_KEY = "nucleo-users-v2";

const seedUsers: User[] = [
  {
    id: "u1",
    name: "Administrador General",
    username: "admin",
    password: "admin123",
    email: "admin@nucleo.ec",
    role: "Administrador",
  },
];

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedUsers;
}

let users: User[] = loadUsers();
let currentUser: User | null = null;
let authListeners: Array<() => void> = [];

function persistUsers() {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

function notifyAuth() {
  authListeners.forEach((l) => l());
}

export function useAuthStore() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    authListeners.push(l);
    return () => {
      authListeners = authListeners.filter((x) => x !== l);
    };
  }, []);

  return {
    users,
    currentUser,
    login: (username: string, password: string): { ok: boolean; error?: string } => {
      const u = users.find(
        (x) => x.username.toLowerCase() === username.trim().toLowerCase() && x.password === password
      );
      if (!u) return { ok: false, error: "Usuario o contraseña incorrectos" };
      currentUser = u;
      notifyAuth();
      return { ok: true };
    },
    logout: () => {
      currentUser = null;
      notifyAuth();
    },
    addUser: (u: Omit<User, "id">): { ok: boolean; error?: string } => {
      if (users.some((x) => x.username.toLowerCase() === u.username.toLowerCase())) {
        return { ok: false, error: "El nombre de usuario ya existe" };
      }
      users = [...users, { ...u, id: crypto.randomUUID() }];
      persistUsers();
      notifyAuth();
      return { ok: true };
    },
    removeUser: (id: string) => {
      users = users.filter((u) => u.id !== id);
      persistUsers();
      notifyAuth();
    },
  };
}