import joi from "joi";
import { ConsoleInput } from "../services/consoles-service";

export const consoleSchema = joi.object<ConsoleInput>({
  name: joi.string().required()
});
