import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import depositRoutes from "./routes/depositRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Investimento em Bitcoins");
});

app.use("/api/auth", authRoutes);
app.use("/api/deposit", depositRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
