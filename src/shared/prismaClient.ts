import { prisma, PrismaClient } from "@prisma/client";

// const {  } = require('@prisma/client')

const prismaClient = new PrismaClient({
    errorFormat: "minimal"
})


export default prismaClient;