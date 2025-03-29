import "dotenv/config"
import express from "express";
import ViteExpress from "vite-express";
import {authRouter} from "./routes/authRouter";

const httpPort = Number(process.env.HTTP_PORT) || 3500;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter)


ViteExpress.listen(app, httpPort, () =>
  console.log(`Server listening on http://localhost:${httpPort}`),
);
