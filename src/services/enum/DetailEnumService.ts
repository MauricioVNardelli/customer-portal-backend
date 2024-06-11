import prismaClient from "../../prisma";

class DetailEnumService {
  
  async execute(prTable: string) {
    return await prismaClient.$queryRawUnsafe(
      `SELECT * FROM ${prTable}`
    )
  }
}

export { DetailEnumService }