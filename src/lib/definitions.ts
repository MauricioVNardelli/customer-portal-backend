import { type_role } from "@prisma/client";

export interface IUserBody {
  role: type_role;
  name: string;
  email: string;
  password: string;
  status_id: string;
}
