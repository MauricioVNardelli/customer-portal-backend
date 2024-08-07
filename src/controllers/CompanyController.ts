import { Request, Response } from "express";
import { company } from "@prisma/client";
import prismaClient from "../prisma";
import {
  CreateCompanyService,
  DetailCompanyService,
  UpdateCompanyService,
} from "../services/CompanyService";

interface ReqQueryCompany {
  id?: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  cnpj?: string;
  image?: string;
}

export class CreateCompanyController {
  public async handle(req: Request, res: Response) {
    const companyData = req.body as company;

    if (!companyData.name) {
      throw new Error("Nome da empresa não informado");
    }

    if (!companyData.cnpj) {
      throw new Error("CNPJ da empresa não informado");
    }

    const companyAlreadyExists = await prismaClient.company.findFirst({
      where: {
        cnpj: companyData.cnpj,
      },
    });

    if (companyAlreadyExists) {
      throw new Error("Empresa já cadastrada");
    }

    const createCompany = new CreateCompanyService();
    const company = await createCompany.execute(companyData);

    return res.json(company);
  }
}

export class DetailCompanyController {
  public async handle(req: Request, res: Response) {
    const query = req.query as ReqQueryCompany;

    const detailCompanyService = new DetailCompanyService();
    const companys = await detailCompanyService.execute(query.id);

    return res.json(companys);
  }
}

export class UpdateCompanyController {
  async handle(req: Request, res: Response) {
    const query = req.query as ReqQueryCompany;
    const companyData = req.body as UpdateCompanyDTO;

    if (!query.id) {
      throw new Error("ID da empresa não enviado");
    }

    const service = new UpdateCompanyService();
    const user = await service.execute(query.id, companyData);

    return res.json(user);
  }
}
