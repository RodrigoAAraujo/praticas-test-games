import { Router } from "express";

import { createConsole, getConsoles, getSpecificConsole } from "../controllers/consoles-controller";
import { validateSchemaMiddleware } from "../middlewares/schemaValidatorMiddleware";
import { consoleSchema } from "../schemas/console-schema";

const consolesRouter = Router();

consolesRouter.get("/consoles", getConsoles);
consolesRouter.get("/consoles/:id", getSpecificConsole);
consolesRouter.post("/consoles", validateSchemaMiddleware(consoleSchema), createConsole);

export default consolesRouter;