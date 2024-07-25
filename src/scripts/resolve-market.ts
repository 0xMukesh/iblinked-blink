import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { authority, authorityKp, connection, program } from "@/helpers";

const resolveMarket = async () => {
  const argv = await yargs(hideBin(process.argv)).options({
    market: { type: "string", alias: "m", demandOption: true },
    price_feed: { type: "string", alias: "pf", demandOption: true },
    price_feed_config: { type: "string", alias: "pfc", demandOption: true },
  }).argv;

  try {
    const market = new PublicKey(argv.market);
    const priceFeed = new PublicKey(argv.price_feed);
    const priceFeedConfig = new PublicKey(argv.price_feed_config);

    const resolveMarketIxn = await program.methods
      .resolveMarket()
      .accountsStrict({
        authority,
        market,
        priceFeed,
        priceFeedConfig,
      })
      .instruction();

    const txn = new Transaction().add(resolveMarketIxn);

    const { blockhash } = await connection.getLatestBlockhash();

    txn.recentBlockhash = blockhash;
    txn.feePayer = authority;

    const sig = await sendAndConfirmTransaction(connection, txn, [authorityKp]);

    console.log(sig);
  } catch (err) {
    console.log(err);
  }
};

resolveMarket();
