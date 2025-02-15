"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Prisma {
    constructor() { }
    static getInstance() {
        if (!Prisma.instance) {
            Prisma.instance = new client_1.PrismaClient();
        }
        return Prisma.instance;
    }
}
Prisma.instance = null;
exports.default = Prisma;
