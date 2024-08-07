import { UpdateCompanyDTO } from "../controllers/CompanyController";
import { ICompanyBody } from "../lib/definitions";
import prismaClient from "../prisma";

export class CreateCompanyService {
  async execute(company): Promise<ICompanyBody> {
    return await prismaClient.company.create({
      data: {
        ...company,
      },
      select: {
        id: true,
        code: true,
        name: true,
        image: true,
        cnpj: true,
      },
    });
  }
}

export class DetailCompanyService {
  async execute(prId: string) {
    const companys = prId
      ? await prismaClient.company.findFirst({
          where: { id: prId },
        })
      : await prismaClient.company.findMany();

    const companysArray = Array.isArray(companys) ? companys : [companys];
    const formattedUsers = companysArray.map((company) => ({
      ...company,
    }));

    return prId ? formattedUsers[0] : formattedUsers;
  }
}

export class UpdateCompanyService {
  async execute(prId: string, company: UpdateCompanyDTO) {
    const data: any = { ...company, updated_at: new Date() };

    if (company.cnpj) {
      const checkExistsCnpj = await prismaClient.company.findFirst({
        where: {
          cnpj: company.cnpj,
          id: {
            not: prId,
          },
        },
      });

      if (checkExistsCnpj) {
        throw new Error("O CNPJ já foi informado por outra empresa");
      }
    }

    return await prismaClient.company.update({
      where: { id: prId },
      data,
    });
  }
}
