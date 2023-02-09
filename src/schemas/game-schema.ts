import joi from "joi";
import { GameInput } from "../services/games-service";

export const gameSchema = joi.object<GameInput>({
  title: joi.string().required(),
  consoleId: joi.number().required()
});
