import { Server, ServerRequest } from "../deps.ts";
import {
  serve,
} from "../deps.ts";
import { testController } from "./controllers/testCtrl.ts";
import { jsonToUtf8 } from "./lib/utils.ts";
import { HttpMethod, RouteException, Router } from "./router.ts";


export class App {
  private server: Server;
  private router: Router;
  public port: number;

  constructor(opts: {
    port: number
  }) {
    this.port = opts.port;
    this.server = serve({ port: this.port });
    this.router = new Router();
  }

  registerControllers() {
    // this.router.register(HttpMethod.POST, "/api/v1/comment/", testController);
    this.router.register(HttpMethod.GET, "/test/:id", testController);
  }

  async runServer() {
    this.registerControllers();
    for await (const req of this.server) {
      try {
        this.router.route(req);
      } catch(error) {
        this.errorHandler(req, error);
      }
    }
  }

  stopServer() {
    this.server.close();
  }

  private errorHandler(req: ServerRequest, error: RouteException) {
    req.headers.set('content-type', 'application-json');
    req.respond({
      status: error.status ?? 500, 
      body: jsonToUtf8(error.body),
      headers: req.headers
    });
  }

}

