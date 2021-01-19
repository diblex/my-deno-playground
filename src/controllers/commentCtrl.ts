import { Comment } from "../models/Comment.ts";
import { validateCreate } from "../lib/validator.ts";
import { ServerRequest } from "../../deps.ts";

// TODO find how to convert Deno server body to json
export async function createComment(req: ServerRequest) {
  const body = await Deno.readAll(req.body);
  const validation = validateCreate(req.body, Comment);
  if (!validation.valid) {
    
    // res.status = 400;
    return req.respond({
      status: 400,
      body: validation.errors.toString()
      // errors: validation.errors
    });
  }
  const post = await Comment.create([req.body]);
  res.status = 201;
  return res.json({});
}

// export async function readComment(req: Request, res: Response) {
//   const posts = await Comment.select('id', 'title', 'body', 'author').all();
//   return res.json(posts);
// }

// export async function getComment(req: Request, res: Response) {
//   const post = await Comment.select('id', 'title', 'body', 'author').where('id', req.params.id).first();
//   return res.json(post);
// }

// export async function updateComment(req: Request, res: Response) {

// }

// export async function deleteComment(req: Request, res: Response) {

// }
