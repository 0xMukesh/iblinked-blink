import express from "express";

import { placeBetHandler } from "@/controllers";

export const router = express.Router();

router.all("/actions/place-bet", placeBetHandler);
