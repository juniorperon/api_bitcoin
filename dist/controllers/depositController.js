"use strict";
// src/controllers/depositController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeposit = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const makeDeposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { amount } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const deposit = yield prisma.deposit.create({
            data: { amount, userId },
        });
        yield prisma.user.update({
            where: { id: userId },
            data: {
                balance: {
                    increment: amount,
                },
            },
        });
        res.status(201).json({ message: "Deposit successful", deposit });
    }
    catch (error) {
        res.status(400).json({ error: "Error making deposit" });
    }
});
exports.makeDeposit = makeDeposit;
