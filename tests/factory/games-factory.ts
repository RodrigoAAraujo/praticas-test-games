import prisma from "config/database";
import { faker } from "@faker-js/faker";
import { any } from "joi";


export async function insertGame(consoleId: number) {
    return prisma.game.create({
        data: {
            title: faker.name.middleName(),
            consoleId
        }
    })
}

export function generateCorrectGameBody(consoleId: number, title?: string) {
    if(title == undefined){
        return {
            title:    faker.name.middleName() ,
            consoleId
        }
    }

    return {
        title,
        consoleId
    }
}

export function generateIncorrectGameBody() {
    return {
        wrong: faker.name.middleName(),
        consoleId: faker.datatype.number()
    } || {
        title: faker.datatype.number(),
        consoleId: faker.datatype.number()
    }
}