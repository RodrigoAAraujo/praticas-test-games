import { Console } from "@prisma/client";
import consolesRepository from "../repositories/consoles-repository";

export type ConsoleInput = Omit<Console, "id">;

async function getConsoles() {
  const consoles = await consolesRepository.getConsoles();
  return consoles;
}

async function getSpecificConsole(id: number) {
  const console = await consolesRepository.getSpecificConsole(id);
  if (!console) {
    throw { message: "Console not found." }
  }

  return console;
}

async function createConsole(console: ConsoleInput) {
  const consoleAlreadyRegistered = await consolesRepository.getSpecificConsoleByName(console.name);
  if (consoleAlreadyRegistered) {
    throw { message: "This console already exists!" }
  }

  await consolesRepository.insertConsole(console);
}

const consolesService = {
  getConsoles,
  getSpecificConsole,
  createConsole
}

export default consolesService;