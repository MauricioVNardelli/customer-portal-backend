import { Router } from "express";

import { EnumController } from "./controllers/EnumController";
import { AuthUserController } from "./controllers/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import {
  CreateUserController,
  DetailUserController,
  UpdateUserController,
} from "./controllers/UserController";
import { DetailContractController } from "./controllers/ContractController";

const router = Router();

router.post("/session", new AuthUserController().handle);

//-- users
router.post("/user", isAuthenticated, new CreateUserController().handle);
router.get("/user", new DetailUserController().handle);
router.put("/user", new UpdateUserController().handle);

//-- contracts
router.get("/contract", isAuthenticated, new DetailContractController().handle);
router.get(
  "/contract/pdf",
  isAuthenticated,
  new DetailContractController().getFilePdf
);

//--Enum
router.get("/enum", isAuthenticated, new EnumController().handle);

export { router };
