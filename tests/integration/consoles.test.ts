import app from "app";
import supertest from 'supertest'
import { generateCorrectConsoleBody, generateIncorrectConsoleBody, insertConsole } from "../factory/consoles-factory";
import { cleanDB } from "../helper";

const server = supertest(app)

beforeAll(async () => {
    await cleanDB();
})


describe("GET /consoles", () => {
    it("should respond [], if there is no game", async () => {
        const response = await server.get("/consoles")

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual([])
    })

    it("should respond [INFO], if there is at least game", async () => {
        await insertConsole()
        await insertConsole()
        const response = await server.get("/consoles")

        expect(response.status).toBe(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            ])
        )
    })
})

describe("GET /consoles/:id", () => {
    it("should respond 404, if there is no game with given id", async () => {
        const response = await server.get("/consoles/0")

        expect(response.status).toBe(404)
    })

    it("should respond {INFO}, if the id exist", async () => {
        const console = await insertConsole()

        const response = await server.get(`/consoles/${console.id}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
            })
        )
    })
})

describe("POST /games", () => {
    it("should respond 422, if the body is incorrect", async () => {
        const body = generateIncorrectConsoleBody()

        const response = await server.post("/consoles").send(body)
        expect(response.status).toBe(422)
    })

    it("should respond 201, if the body is correct", async () => {
        const console = await insertConsole()
        const body = generateCorrectConsoleBody()

        const response = await server.post(`/consoles`).send(body)
        expect(response.status).toBe(201)
    })

    it("should respond 409, if the console already exist", async () => {
        const console = await insertConsole()

        const body = generateCorrectConsoleBody(console.name)

        const response = await server.post("/consoles").send(body)
        expect(response.status).toBe(409)
    })
})