import { Request, Response } from "express";
import {
  CreateUserService,
  DetailUserService,
  ListUsersByCompanyService,
  UpdateUserService,
} from "../services/UserService";
import prismaClient from "../prisma";
import { type_role, status_enum, users } from "@prisma/client";

interface ReqQueryUser {
  id?: string;
}

export interface UpdateUserDTO {
  role?: type_role;
  name: string;
  email: string;
  password?: string;
  status?: status_enum;
  status_id?: string;
}

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const userData = req.body as users;

    if (!userData.email) {
      throw new Error("E-mail não enviado");
    }

    if (!userData.password) {
      throw new Error("Password não enviado");
    }

    const userAlreadyExists = await prismaClient.users.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado");
    }

    const createUser = new CreateUserService();
    const user = await createUser.execute(userData);

    return res.json(user);
  }
}

export class DetailUserController {
  async handle(req: Request, res: Response) {
    const query = req.query as ReqQueryUser;

    const detailUserService = new DetailUserService();
    const users = await detailUserService.execute(query.id);

    return res.json(users);
  }
}

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const query = req.query as ReqQueryUser;
    const userData = req.body as UpdateUserDTO;

    if (!query.id) {
      throw new Error("ID não enviado");
    }

    const service = new UpdateUserService();
    const user = await service.execute(query.id, userData);

    return res.json(user);
  }
}

export class ListUsersByCompanyController {
  async handle(req: Request, res: Response) {
    const query = req.query as ReqQueryUser;

    if (!query.id) {
      throw new Error("ID da empresa não enviado");
    }

    const listUsersByCompanyService = new ListUsersByCompanyService();
    const usersCompany = await listUsersByCompanyService.execute(query.id);

    return res.json(usersCompany);
  }
}
