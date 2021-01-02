import { Comment } from "/models/Comment.ts";
import { Request, Response } from "/deps.ts";
import { validateCreate } from "/lib/validator.ts";

export async function createComment(req: Request, res: Response) {
  const validation = validateCreate(req.body, Comment);
  if (!validation.valid) {
    res.status = 400;
    return res.json({
      status: res.status,
      errors: validation.errors
    });
  }
  const post = await Comment.create([req.body]);
  return res.sendStatus(201);
}

export async function readComment(req: Request, res: Response) {
  const posts = await Comment.select('id', 'title', 'body', 'author').all();
  return res.json(posts);
}

export async function getComment(req: Request, res: Response) {
  const post = await Comment.select('id', 'title', 'body', 'author').where('id', req.params.id).first();
  return res.json(post);
}

export async function updateComment(req: Request, res: Response) {

}

export async function deleteComment(req: Request, res: Response) {

}
