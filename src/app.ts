import express, { json, Request, Response } from "express";
import "express-async-errors";
import gamesRouter from "./routers/games-router";
import consolesRouter from "./routers/consoles-router";
import { Express } from "express";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("I'am alive!"));
app.use(gamesRouter);
app.use(consolesRouter);


export default app;