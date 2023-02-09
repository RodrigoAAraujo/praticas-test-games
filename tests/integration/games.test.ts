import app from "app";
import { consoleSchema } from "schemas/console-schema";
import supertest from 'supertest'
import { insertConsole } from "../factory/consoles-factory";
import { generateCorrectGameBody, generateIncorrectGameBody, insertGame } from "../factory/games-factory";
import { cleanDB } from "../helper";

const server = supertest(app)

beforeAll(async () => {
    await cleanDB();
})


describe("GET /games", () => {
    it("should respond [], if there is no game", async () => {
        const response = await server.get("/games")

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual([])
    })

    it("should respond [INFO], if there is at least game", async () => {
        const console = await insertConsole()

        await insertGame(console.id)

        const response = await server.get("/games")

        expect(response.status).toBe(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    Console: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    }),
                    consoleId: expect.any(Number),
                    id: expect.any(Number),
                    title: expect.any(String),
                })
            ])
        )
    })
})

describe("GET /games/:id", () => {
    it("should respond 404, if there is no game with given id", async () => {
        const response = await server.get("/games/0")

        expect(response.status).toBe(404)
    })

    it("should respond {INFO}, if the id exist", async () => {
        const console = await insertConsole()
        const { id } = await insertGame(console.id)

        const response = await server.get(`/games/${id}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                consoleId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
            })
        )
    })
})

describe("POST /games", () => {
    it("should respond 422, if the body is incorrect", async () => {
        const body = generateIncorrectGameBody()

        const response = await server.post("/games").send(body)
        expect(response.status).toBe(422)
    })

    it("should respond 201, if the body is correct", async () => {
        const console = await insertConsole()
        const body = generateCorrectGameBody(console.id)

        const response = await server.post(`/games`).send(body)
        expect(response.status).toBe(201)
    })

    it("should respond 409, if the game already exist", async () => {
        const Console = await insertConsole()

        const game = await insertGame(Console.id)     
        const body = generateCorrectGameBody(Console.id, game.title)

        const response = await server.post("/games").send(body)
        expect(response.status).toBe(409)
    })

    it("should respond 409, if console doesn`t exist", async () => {
        const body = generateCorrectGameBody(0)

        const response = await server.post("/games").send(body)
        expect(response.status).toBe(409)
    })
})