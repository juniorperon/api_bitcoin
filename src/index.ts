import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Investimento em Bitcoins");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.use("/api/auth", authRoutes);
