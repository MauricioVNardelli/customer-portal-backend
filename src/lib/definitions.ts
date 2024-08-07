import { type_role } from "@prisma/client";

export interface IUserBody {
  role: type_role;
  name: string;
  email: string;
  password: string;
  status_id: string;
}

export interface ICompanyBody {
  code: number;
  name: string;
  image: string;
  cnpj: string;
}
