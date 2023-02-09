import { Router } from "express";

import { createGame, getGames, getSpecificGame } from "../controllers/games-controller";
import { validateSchemaMiddleware } from "../middlewares/schemaValidatorMiddleware";
import { gameSchema } from "../schemas/game-schema";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.get("/games/:id", getSpecificGame);
gamesRouter.post("/games", validateSchemaMiddleware(gameSchema), createGame);

export default gamesRouter;