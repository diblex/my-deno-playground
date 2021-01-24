import { serve, Server, ServerRequest } from '../depts.ts';
import { Router } from "./Router.ts";
import { RouteException } from "./RouteException.ts";
import { jsonToUint8Array } from "./utils.ts";

export class Jason {
  router: Router = new Router();
  server: Server | undefined;
  
  /**
   * This function will add a router in the HTTP server.
   * Routes registered in this router will be used.
   * @param router 
   */
  use(router: Router) {
    this.router.routes = this.router.routes.concat(router.routes);
  }

  /**
   * This function will start an HTTP server listening to the specified port.
   * @param port 
   */
  async listen(port: number) {
    this.server = serve({ port });
    for await (const req of this.server) {
      try {
        this.router.route(req);
      } catch(error) {
        this.errorHandler(req, error);
      }
    }
  }

  /**
   * This function closes the server and stops listening to the port.
   */
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