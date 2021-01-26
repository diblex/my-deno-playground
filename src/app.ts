import { Database, HttpMethod, Jason, Router, SQLite3Connector } from "../deps.ts";
import { Comment } from "./models/Comment.ts";
import { createComment, deleteComment, getComment, listComments, updateComment } from "./controllers/commentCtrl.ts";

export class App {
  private jason: Jason;
  private db: Database;
  public port: number;
  public debug: boolean;

  constructor(opts: {
    port: number,
    debug?: boolean
  }) {
    this.port = opts.port;
    this.debug = opts.debug ?? false;
    this.jason = new Jason();
    this.db = this.connectDB();
  }

  async runServer() {
    this.registedModels();
    this.db.sync();
    this.registerControllers();
    this.jason.listen(this.port);
  }

  stopServer() {
    this.db.close();
    this.jason.close();
  }

  private registerControllers() {
    const router = new Router();
    // router.register(HttpMethod.GET, "/test/:id", testController);
    router.register(HttpMethod.POST, "/comment/", createComment);
    router.register(HttpMethod.GET, "/comment/", listComments);
    router.register(HttpMethod.GET, "/comment/:id", getComment);
    router.register(HttpMethod.PUT, "/comment/:id", updateComment);
    router.register(HttpMethod.DELETE, "/comment/:id", deleteComment);
    this.jason.use(router);
  }

  private connectDB() {
    const connector = new SQLite3Connector({
      filepath: './database.sqlite',
    });
    return new Database(connector, {debug: true});
  }

  private registedModels() {
    // In case of pivot models created with Relationships.manyToMany, 
    // it is good practice to put them first
    this.db.link([
      Comment
    ])
  }
}

