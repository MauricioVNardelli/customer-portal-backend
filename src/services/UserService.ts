import { IUserBody } from '../lib/definitions';
import prismaClient from '../prisma';
import { hash } from 'bcryptjs';

export class CreateUserService {  
  async execute({ password, ...user }: IUserBody) {
    const passwordHash = await hash(password, 8);

    return await prismaClient.users.create({
      data: {
        ...user,
        password: passwordHash,        
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
  }
}

export class DetailUserService {
  async execute(prId: string) {
    
    if (prId) {
      return await prismaClient.users.findFirst({
        where: { id: prId  } 
      })
    }

    return await prismaClient.users.findMany();
  }
}

export class UpdateUserService {
  async execute(prId: string, { password, ...user }: IUserBody) {
    
    let passwordHash = password;

    if (password.length < 30)
      passwordHash = await hash(password, 8);

    return await prismaClient.users.update({
      where: {
        id: prId
      },
      data: {
        ...user,
        password: passwordHash,
        update_at: new Date()
      }
    })
  }
}