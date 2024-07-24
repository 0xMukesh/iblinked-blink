import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { router } from "@/router";

dotenv.config();

const app = express();

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "up and running",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is up and running at port ${port}`);
});
