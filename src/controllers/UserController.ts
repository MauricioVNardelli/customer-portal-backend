import { Request, Response, query } from "express";
import { CreateUserService, DetailUserService } from "../services/UserService";

interface ReqQueryUser {
  id?: string
}

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;    

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password
    });
 
    return res.json(user);
  }
}

class DetailUserController {
  async handle(req: Request, res: Response) {
    
    const query: ReqQueryUser = req.query;    
    const id = query.id;

    const detailUserService = new DetailUserService();

    const users = await detailUserService.execute(id);
    
    return res.json(users);
  }
}

export { CreateUserController, DetailUserController }