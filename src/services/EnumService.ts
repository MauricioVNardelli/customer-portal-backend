import prismaClient from "../prisma";

class EnumService {
  
  async execute(prTypeName: string) {
    return await prismaClient.$queryRawUnsafe(
      `SELECT unnest(enum_range(NULL::"${prTypeName}")) as value`
    )
    .catch(() => {
      throw new Error("non-existent type");
    })
  }
}

export { EnumService }