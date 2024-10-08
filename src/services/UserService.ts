import { status_enum } from "@prisma/client";
import { UpdateUserDTO } from "../controllers/UserController";
import { IUserBody } from "../lib/definitions";
import prismaClient from "../prisma";
import { hash } from "bcryptjs";

export class CreateUserService {
  async execute({ password, ...user }: IUserBody) {
    const passwordHash = await hash(password, 8);

    const status = await prismaClient.status.findFirst({
      where: {
        status: "ATIVO",
      },
      select: {
        id: true,
      },
    });

    if (!status) {
      throw new Error("Status não encontrado");
    }

    const createdUser = await prismaClient.users.create({
      data: {
        ...user,
        password: passwordHash,
        status_id: status.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: {
          select: {
            status: true,
          },
        },
      },
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      status: createdUser.status.status,
    };
  }
}

export class DetailUserService {
  async execute(prId: string) {
    if (prId) {
      const user = await prismaClient.users.findFirst({
        where: { id: prId },
        include: {
          status: true,
          company: true,
        },
      });

      return {
        ...user,
        status: user.status?.status,
        company: user.company?.name,
      };
    }

    const users = prId
      ? await prismaClient.users.findFirst({
          where: { id: prId },
          include: {
            status: true,
            company: true,
          },
        })
      : await prismaClient.users.findMany({
          include: {
            status: true,
            company: true,
          },
        });

    const usersArray = Array.isArray(users) ? users : [users];
    const formattedUsers = usersArray.map((user) => ({
      ...user,
      status: user.status.status,
      company: user?.company?.name,
    }));

    return prId ? formattedUsers[0] : formattedUsers;
  }
}

export class UpdateUserService {
  async execute(prId: string, user: UpdateUserDTO) {
    const data: any = { ...user, update_at: new Date() };

    if (user.status) {
      const status = await prismaClient.status.findFirst({
        where: {
          status: user.status as status_enum,
        },
      });

      if (!status) {
        throw new Error("Status não encontrado");
      }

      data.status_id = status.id;
      delete data.status;
    }

    if (user.password) {
      data.password =
        user.password.length < 30
          ? await hash(user.password, 8)
          : user.password;
    }

    const updatedUser = await prismaClient.users.update({
      where: { id: prId },
      include: {
        status: true,
        company: true,
      },
      data,
    });

    return {
      ...updatedUser,
      status: updatedUser.status?.status,
      company: updatedUser.company?.name,
    };
  }
}

export class ListUsersByCompanyService {
  async execute(prId: string) {
    return await prismaClient.users.findMany({
      where: { company_id: prId },
    });
  }
}
