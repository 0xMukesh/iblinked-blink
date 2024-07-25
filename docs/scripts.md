# scripts

## create-market

creates a price config PDA + creates a market PDA and logs public key of both of them which can later on be used in `/place-bet` and `/cancel-bet` routes

## resolve-market

<!-- TODO: need to make it a CRON job which runs automatically -->

takes in `market`, `price_feed` and `price_feed_config` as arguments and resolves the market and logs the transaction signature
