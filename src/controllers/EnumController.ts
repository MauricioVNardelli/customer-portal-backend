import { Request, Response } from "express";
import { EnumService } from "../services/EnumService";

export class EnumController {
  async handle(req: Request, res: Response) {
    
    const table = <string>req.query.table;    

    const enumService = new EnumService();
    const listTable = await enumService.execute(table);
    
    return res.json(listTable);
  }
}