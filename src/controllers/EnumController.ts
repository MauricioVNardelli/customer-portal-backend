import { Request, Response } from "express";
import { EnumService } from "../services/EnumService";

export class EnumController {
  async handle(req: Request, res: Response) {
    
    const typeName = <string>req.query.name;

    if (!typeName)
      throw new Error('The name parameter was not provided');

    const enumService = new EnumService();
    const listTable = await enumService.execute(typeName);
    
    return res.json(listTable);
  }
}