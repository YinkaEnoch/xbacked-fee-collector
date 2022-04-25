# xbacked-fee-collector

> This module runs the collectFees method to distribute fees accrued in the
> vault to the DAO and stakers. The caller is rewarded with 0.5% of the accrued fees

## Install

- Install from NPM: `npm i xbacked-fee-collector`
- Clone this repository and run `npm install` from the cloned directory to
  install the required dependencies

## Usage (NPM)

- Import taskRunner from xbacked-fee-collector
- Pass the required parameters to the taskRunner function

## Usage (Github clone)

- Create a .env file and specify the required variables using the .env-example
  file
- Run `npm start` or `npm run dev` - for development purposes

## env Parameters

- PASS_PHRASE: Mnemonic phrase for the wallet address to be used
- SLEEP_DURATION: How long should the interval between each call should last.
  Must be in milliseconds e.g `5000` equivalent of 5s. (NB.: 1000 == 1s)
- NETWORK: The network to connect to e.g TestNet, MainNet

## Misc.

- Add `"type":"module"` to your package.json for the package to work

<pre>
{
  ..., 
  "main":"index.js", 
  "type":"module",
  ...
}
</pre>

- Sample code (npm installation)
<pre>
import 'dotenv/config';
import taskRunner from 'xbacked-fee-collector';

taskRunner({
sleepDuration: process.env.SLEEP_DURATION,
network: process.env.NETWORK,
passPhrase: process.env.PASS_PHRASE
}).catch(e => console.log(e))

</pre>

