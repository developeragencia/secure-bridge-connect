
export interface Client {
  id: string;
  name: string;
  documentNumber: string;
  email: string;
  phone: string;
  address?: string;
  contactPerson?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE" | "INACTIVE";
  // Additional fields for compatibility with ClientDetail
  cnpj: string;
  segment: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  type: 'private' | 'public';
}
