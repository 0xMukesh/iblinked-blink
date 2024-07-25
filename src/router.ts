import express from "express";

import { cancelBetHandler, placeBetHandler } from "@/controllers";

export const router = express.Router();

router.all("/actions/place-bet", placeBetHandler);
router.all("/actions/cancel-bet", cancelBetHandler);
