import { Request, Response } from "express";
import httpStatus from "http-status";

import consolesService, { ConsoleInput } from "../services/consoles-service";

export async function getConsoles(req: Request, res: Response) {
  const consoles = await consolesService.getConsoles();
  res.send(consoles);
}

export async function getSpecificConsole(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const console = await consolesService.getSpecificConsole(id);
    res.send(console);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createConsole(req: Request, res: Response) {
  const consoleToCreate = req.body as ConsoleInput;
  try {
    await consolesService.createConsole(consoleToCreate);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.CONFLICT);
  }
}