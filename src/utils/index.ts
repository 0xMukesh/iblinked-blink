import { PublicKey } from "@solana/web3.js";

export const isValidPublicKey = (pk: string) => {
  try {
    new PublicKey(pk);
    return true;
  } catch (err) {
    return false;
  }
};

export const isProperChoice = (val: string) => {
  if (val.toLowerCase() === "yes" || "no") {
    return true;
  } else {
    return false;
  }
};
