import { opine, Request, Response, Database, SQLite3Connector, json } from '/deps.ts';
import { controller } from "/controllers/testCtrl.ts";
import { createComment, getComment, readComment } from "/controllers/commentCtrl.ts";
import { Comment } from "/models/Comment.ts";

const port = 8000;
const server = opine();

// DB
const connector = new SQLite3Connector({
  filepath: './database.sqlite',
});
server.locals.db = new Database(connector);
server.locals.db.link([Comment]);
server.locals.db.sync();

// Middlewares
server.use(json()); // for parsing application/json

// Routes
server.get("/", (req: Request, res: Response) => {
  controller(req, res);
});

server.post("/api/v1/comment/", (req: Request, res: Response) => {
  createComment(req, res);
});

server.get("/api/v1/comment/:id", (req: Request, res: Response) => {
  getComment(req, res);
});

server.get("/api/v1/comment/", (req: Request, res: Response) => {
  readComment(req, res);
});

console.log(`http://localhost:${port}`);
server.listen({port});