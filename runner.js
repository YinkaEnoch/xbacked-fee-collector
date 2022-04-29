import "dotenv/config";
import taskRunner from "./index.js";

taskRunner({
  sleepDuration: process.env.SLEEP_DURATION,
  network: process.env.NETWORK,
  passPhrase: process.env.PASS_PHRASE,
  targetAmount: process.env.TARGET_AMOUNT,
}).catch((e) => console.log(e));
