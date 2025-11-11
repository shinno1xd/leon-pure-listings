import { Property } from "@/types/property";

const STORAGE_KEY = "imobiliaria_leon_properties";
const ADMIN_KEY = "imobiliaria_leon_admin";

export const getProperties = (): Property[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveProperties = (properties: Property[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
};

export const addProperty = (property: Omit<Property, "id">): Property => {
  const properties = getProperties();
  const newProperty: Property = {
    ...property,
    id: Date.now().toString(),
    galeria: [property.imagemPrincipal],
  };
  properties.push(newProperty);
  saveProperties(properties);
  return newProperty;
};

export const updateProperty = (id: string, updates: Partial<Property>): void => {
  const properties = getProperties();
  const index = properties.findIndex((p) => p.id === id);
  if (index !== -1) {
    properties[index] = { ...properties[index], ...updates };
    saveProperties(properties);
  }
};

export const deleteProperty = (id: string): void => {
  const properties = getProperties().filter((p) => p.id !== id);
  saveProperties(properties);
};

export const getPropertyById = (id: string): Property | undefined => {
  return getProperties().find((p) => p.id === id);
};

export const isAdmin = (): boolean => {
  return localStorage.getItem(ADMIN_KEY) === "true";
};

export const login = (password: string): boolean => {
  if (password === "admin123") {
    localStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(ADMIN_KEY);
};
