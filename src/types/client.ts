
export interface Client {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  contactName?: string;
  contactRole?: string;
  industry?: string;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
  createdAt: string;
  updatedAt: string;
}
