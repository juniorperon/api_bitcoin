"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const depositRoutes_1 = __importDefault(require("./routes/depositRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("API de Investimento em Bitcoins");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/deposit", depositRoutes_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
