import { PublicKey } from "@solana/web3.js";

export const TEAM_WALLET = new PublicKey(process.env.TEAM_WALLET);
export const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID);

export const MIN_BET_AMOUNT = 1_000_000;
