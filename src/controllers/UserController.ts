import { Request, Response } from "express";
import {
  CreateUserService,
  DetailUserService,
  UpdateUserService,
} from "../services/UserService";
import prismaClient from "../prisma";
import { users } from "@prisma/client";
import { IUserBody } from "../lib/definitions";

interface ReqQueryUser {
  id?: string;
}

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const userData = req.body as users;

    if (!userData.email) {
      throw new Error("E-mail não enviado");
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
    const userData = req.body as IUserBody;

    if (!query.id) {
      throw new Error("ID não enviado");
    }

    const service = new UpdateUserService();
    const user = await service.execute(query.id, userData);

    return res.json(user);
  }
}
