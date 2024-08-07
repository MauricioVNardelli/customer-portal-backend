import { Router } from "express";

import { EnumController } from "./controllers/EnumController";
import { AuthUserController } from "./controllers/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import {
  CreateUserController,
  DetailUserController,
  ListUsersByCompanyController,
  UpdateUserController,
} from "./controllers/UserController";
import { DetailContractController } from "./controllers/ContractController";
import {
  CreateCompanyController,
  DetailCompanyController,
  UpdateCompanyController,
} from "./controllers/CompanyController";

const router = Router();

router.post("/session", new AuthUserController().handle);

//-- users
router.post("/user", isAuthenticated, new CreateUserController().handle);
router.get("/user", isAuthenticated, new DetailUserController().handle);
router.put("/user", isAuthenticated, new UpdateUserController().handle);
router.get(
  "/user/company",
  isAuthenticated,
  new ListUsersByCompanyController().handle
);

//-- contracts
router.get("/contract", isAuthenticated, new DetailContractController().handle);
router.get(
  "/contract/pdf",
  isAuthenticated,
  new DetailContractController().getFilePdf
);

//--Enum
router.get("/enum", isAuthenticated, new EnumController().handle);

//-- company
router.post("/company", new CreateCompanyController().handle);
router.get("/company", new DetailCompanyController().handle);
router.put("/company", new UpdateCompanyController().handle);

export { router };
