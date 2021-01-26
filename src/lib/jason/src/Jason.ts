import { serve, Server, ServerRequest } from '../depts.ts';
import { Router } from "./Router.ts";
import { HttpException } from "./HttpException.ts";
import { jsonToUint8Array, stringToUint8Array } from "./utils.ts";

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
        await this.router.route(req);
      } catch(error) {
        await this.errorHandler(req, error);
      }
    }
  }

  /**
   * This function closes the server and stops listening to the port.
   */
  close() {
    this.server?.close();
  }

  private errorHandler(req: ServerRequest, error: HttpException) {
    const headers = new Headers();
    let body;
    if (!error.status) {
      body = stringToUint8Array(error.message);
      console.error(error.message, error.stack);
    } else {
      headers.set('Content-Type', 'application/json');
      body = jsonToUint8Array(error.body);
    }
    return req.respond({
      status: error.status ?? 500,
      body,
      headers
    });
  }
}