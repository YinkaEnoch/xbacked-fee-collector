# xbacked-fee-collector

> This module runs the collectFees method to distribute fees accrued in the
> vault to the DAO and stakers.

## Install

- Install from NPM: `npm i xbacked-fee-collector`
- Clone this repository and run `npm install` from the cloned directory to
  install the required dependencies

## Usage

- Create a .env file and specify the required variables using the .env-example
  file
- Run `npm start` or `npm run dev` - for development purposes

## env Parameters

- PASS_PHRASE: Mnemonic phrase for the wallet address to be used
- SLEEP_DURATION: How long should the interval between each call should last.
  Must be in milliseconds e.g `5000` equivalent of 5s. (NB.: 1000 == 1s)
- NETWORK: The network to connect to e.g TestNet, MainNet

