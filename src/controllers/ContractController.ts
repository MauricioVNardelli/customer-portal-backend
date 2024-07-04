import { Request, Response } from "express";
import { DetailContractService } from "../services/ContractService";

export class DetailContractController {
  async handle(req: Request, res: Response) {
    
    const detailService = new DetailContractService();
    const data = await detailService.execute();
    
    return res.json(data);
  }

  async getFilePdf(req: Request, res: Response) {    

    const detailService = new DetailContractService();
    const data = await detailService.getPDFContract();
    
    return res.json(data);
  }
}