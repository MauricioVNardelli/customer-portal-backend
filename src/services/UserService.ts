import prismaClient from '../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {  
  async execute({name, email, password}: UserRequest) {
    
    if(!email) {
      throw new Error("E-mail incorreto");
    }

    const userAlreadyExists = await prismaClient.users.findFirst({
      where: {
        email: email
      }
    })

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado")
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.users.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,        
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user;
  }
}

class DetailUserService {
  async execute(id: string) {
    
    if (id) {
      return await prismaClient.users.findFirst({
        where: { id: id  } 
      })
    }

    return await prismaClient.users.findMany();
  }
}

export { CreateUserService, DetailUserService }