import { Comment } from "../models/Comment.ts";
import { validateCreate, validateUpdate } from "../lib/validator.ts";
import { getJasonHeader, jsonToUint8Array, RequestParams, RouteException, uint8ArrayToJson, ServerRequest } from "../../deps.ts";

const maxItems = 100;

export async function createComment(req: ServerRequest) {
  const bodyParams = uint8ArrayToJson(await Deno.readAll(req.body));
  const validation = validateCreate(bodyParams, Comment);
  if (!validation.valid) {
    throw new RouteException(400, validation.errors)
  }
  await Comment.create([bodyParams]);
  req.respond({status: 201});
}

export async function listComments(req: ServerRequest) {
  const posts = await Comment.limit(maxItems).all();
  req.respond({
    status: 200, 
    body: jsonToUint8Array(posts),
    headers: getJasonHeader()
  });
}

export async function getComment(req: ServerRequest, params: RequestParams) {
  const postQuery = Comment.where('id', params.id);
  const post = await postQuery.first();
  if (!post) {
    throw new RouteException(404);
  }
  req.respond({
    status: 200,
    body: jsonToUint8Array(post),
    headers: getJasonHeader()
  })
}

export async function updateComment(req: ServerRequest, params: RequestParams) {
  const bodyParams = uint8ArrayToJson(await Deno.readAll(req.body));
  const validation = validateUpdate(bodyParams, Comment);
  if (!validation.valid) {
    throw new RouteException(400, validation.errors)
  }
  const comment = await Comment.where('id', params.id).update(bodyParams);
  if (!comment.length) {
    throw new RouteException(404);
  } else {
    req.respond({status: 204});
  }
}

export async function deleteComment(req: ServerRequest, params: RequestParams) {
    await Comment.where('id', params.id).delete();
    req.respond({status: 204});
}

