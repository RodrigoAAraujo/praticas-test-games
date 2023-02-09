import { Game } from "@prisma/client";
import consolesRepository from "../repositories/consoles-repository";
import gamesRepository from "../repositories/games-repository";

export type GameInput = Omit<Game, "id">;

async function getGames() {
  const games = await gamesRepository.getGames();
  return games;
}

async function getSpecificGame(id: number) {
  const game = await gamesRepository.getSpecificGame(id);
  if (!game) {
    throw { message: "Game not found." }
  }

  return game;
}

async function createGame(game: GameInput) {
  const gameAlreadyRegistered = await gamesRepository.getSpecificGameByName(game.title);
  if (gameAlreadyRegistered) {
    throw { message: "This game already exists!" }
  }

  const console = await consolesRepository.getSpecificConsole(game.consoleId);
  if (!console) {
    throw { message: "This console does not exists!" }
  }

  await gamesRepository.insertGame(game);
}

const gamesService = {
  getGames,
  getSpecificGame,
  createGame
}

export default gamesService;