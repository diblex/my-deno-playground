/**
 * Class for HTTP exceptions.
 * They include the HTTP status code and a body to be send in HTTP response.
 */
export class HttpException extends Error {
  status: number;
  body: {[key: string]: string | number | boolean}[];


  constructor(status: number, body?: {[key: string]: string | number | boolean}[]) {
    super();
    this.status = status;
    this.body = body ?? [];
  }
}
