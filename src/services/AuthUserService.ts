import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string
}

class AuthUserService {
  async execute( { email, password }: AuthRequest ) {

    const user = await prismaClient.users.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error("Usuário incorreto");
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("Senha incorreta");
    }

    const token = sign(
      { name: user.name, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d', subject: user.id.toString() }
    );

    return {
      id: user.id,
      name: user.name,
      email: email,
      token: token
    };
  }
}

export { AuthUserService }