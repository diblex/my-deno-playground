import { App } from './app.ts';

const port = 8000;
const app = new App({port});
console.log("Starting server...");
app.runServer();
console.log(`Listening in port ${port}`)

console.log("Press Ctrl-C to stop the server");
for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
  console.log("server interrupted!");
  app.stopServer();
  Deno.exit();
}