import { serve, Server, ServerRequest } from '../depts.ts';
import { Router } from "./Router.ts";
import { RouteException } from "./RouteException.ts";
import { jsonToUint8Array } from "./utils.ts";

export class Jason {
  router: Router = new Router();
  server: Server | undefined;
  
  use(router: Router) {
    this.router.routes = this.router.routes.concat(router.routes);
  }

  listen(port: number) {
    this.server = serve({ port });
    for await (const req of this.server) {
      try {
        this.router.route(req);
      } catch(error) {
        this.errorHandler(req, error);
      }
    }
  }

  close() {
    this.server?.close();
  }

  private errorHandler(req: ServerRequest, error: RouteException) {
    req.headers.set('content-type', 'application-json');
    req.respond({
      status: error.status ?? 500, 
      body: jsonToUint8Array(error.body),
      headers: req.headers
    });
  }
}