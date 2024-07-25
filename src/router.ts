import express from "express";

import {
  cancelBetHandler,
  claimWinningsHandler,
  placeBetHandler,
} from "@/controllers";

export const router = express.Router();

router.all("/actions/place-bet", placeBetHandler);
router.all("/actions/cancel-bet", cancelBetHandler);
router.all("/actions/claim-winnings", claimWinningsHandler);
