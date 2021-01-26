import { config } from "../deps.ts";
import { App } from './app.ts';

const { PORT, ENV } = config({safe: true});
const app = new App({port: Number(PORT), env: ENV});

console.log("Starting server...");
app.runServer();
console.log(`Listening in port ${PORT}`)

console.log("Press Ctrl-C to stop the server");
for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
  console.log("Server interrupted!");
  app.stopServer();
  Deno.exit();
}