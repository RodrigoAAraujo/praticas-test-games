import prisma  from "config/database";
import { faker } from "@faker-js/faker";

export async function insertConsole(){
    return prisma.console.create({
        data:{
            name: faker.name.middleName()
        }
    })
}

export function generateCorrectConsoleBody( title?: string) {
    return {
        name:  title || faker.name.middleName(),
    }
}

export function generateIncorrectConsoleBody() {
    return {
        wrong: faker.name.middleName(),
    } || {
        name: faker.datatype.number(),
    }
}