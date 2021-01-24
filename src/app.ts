import { testController } from "./controllers/testCtrl.ts";
import { HttpMethod, Router } from "./lib/jason/mod.ts";
import { Jason } from "./lib/jason/src/Jason.ts";

export class App {
  private jason: Jason;
  public port: number;

  constructor(opts: {
    port: number
  }) {
    this.port = opts.port;
    this.jason = new Jason();
  }

  registerControllers() {
    const router = new Router();
    // this.router.register(HttpMethod.POST, "/api/v1/comment/", testController);
    router.register(HttpMethod.GET, "/test/:id", testController);
    this.jason.use(router);
  }

  async runServer() {
    this.registerControllers();
    this.jason.listen(this.port);
  }

  stopServer() {
    this.jason.close();
  }

}

