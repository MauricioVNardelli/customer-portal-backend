import { Request, Response } from "express";
import { DetailEnumService } from "../../services/enum/DetailEnumService";

const listTableEnum = ['fi_typeperson', 'fi_typecompany', 'sy_status'];

class DetailEnumController {
  async handle(req: Request, res: Response) {
    
    const table = <string>req.query.table;    
    
    const prTableIsEnum = listTableEnum.indexOf(table) >= 0;

    console.log(listTableEnum.indexOf(table));

    if (!prTableIsEnum)
      throw new Error('The table entered is not included in the list of tables of type ENUM');

    const detailEnumService = new DetailEnumService();
    const listTable = await detailEnumService.execute(table);
    
    return res.json(listTable);
  }
}

export { DetailEnumController }