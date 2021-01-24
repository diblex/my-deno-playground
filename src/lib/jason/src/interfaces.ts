import { ServerRequest } from "../depts.ts";

/**
 * HTTP request methods collection
 */
export enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DEL = 'DELETE'
}

/**
 * Route that associates a URL path to a controller.
 */
export interface Route {
  method: HttpMethod,
  path: string, 
  controller: (req: ServerRequest, params: RequestParams) => Promise<void>
};

export interface RequestParams {[key: string]: string}