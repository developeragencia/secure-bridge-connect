
export interface Client {
  id: string;
  name: string;
  documentNumber: string; // CNPJ
  email: string;
  phone: string;
  address?: string;
  contactPerson?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
}
