import { ServerRequest } from "../depts.ts";
import { HttpMethod, Route } from "./interfaces.ts";
import { RouteException } from "./RouteException.ts";

const PARAM_VALUE_REG_EXP = /([A-Za-z0-9_\\-]+)/;
const PARAM_NAME_REG_EXP = /:[a-zA-Z]+/g;

/**
 * Class to enroute requests coming to a HTTP server.
 * It works directly with Deno std@0.83.0/http/server.ts
 */
export class Router {
  routes: Route[] = [];

  /**
   * Register a route into the router.
   * @param method HTTP method
   * @param path Path of the route, without domain. It can include URL params
   * defined by an alias.
   * Like /resource/:id/sub-resource/:name
   * @param controller Action to execute in this route.
   */
  register(method: HttpMethod, path: string, controller: Route["controller"]) {
    this.routes.push({
      method,
      path,
      controller
    });
  }

  /**
   * It routes a request to the proper controller.
   * @param req 
   */
  route(req: ServerRequest) {
    const index = this.routes.findIndex((route) => {
      return this.testRoute(route, req);
    });
    if (index !== -1) {
      const route = this.routes[index];
      const params = this.getParams(route, req);
      return route.controller(req, params);
    } else {
      throw new RouteException(404);
    }
  }

  /**
   * Returns true if the request matches the route.
   * @param route
   * @param req
   */
  private testRoute(route: Route, req: ServerRequest) {
    const regExp = this.getRoutePathAsRegExp(route);
    if (req.method !== route.method ) {
      return null;
    }
    return regExp.test(req.url);
  }

  private getRoutePathAsRegExp(route: Route) {
    let regExpStr = route.path;
    const paramNames = this.getRouteParamsNames(route);
    paramNames?.forEach(name => {
      regExpStr = regExpStr.replace(`:${name}`, PARAM_VALUE_REG_EXP.source);
    });
    regExpStr += '$';
    return new RegExp(regExpStr);
  }

  private getRouteParamsNames(route: Route) {
    return route.path.match(PARAM_NAME_REG_EXP)?.map(match => match.substring(1));
  }

  /**
   * Returns object with the URL params in the request, where the keys are the
   * params aliases defined in the route and the values are the values in the
   * request.
   * @param route Route where the params are defined
   * @param req HTTP request
   */
  private getParams(route: Route, req: ServerRequest) {
    const res = {} as {[key: string]: string};
    const names = this.getRouteParamsNames(route);
    const regExp = this.getRoutePathAsRegExp(route);
    const paramValues = req.url.match(regExp);
    paramValues?.shift();
    if (paramValues?.length) {
      names?.forEach((name, i) => {
        res[name] = paramValues[i];
      })
    }
    return res;
  }
}
