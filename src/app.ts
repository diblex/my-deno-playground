import { Database, HttpMethod, Jason, Router, SQLite3Connector } from "../deps.ts";
import { Comment } from "./models/Comment.ts";
import { createComment, deleteComment, getComment, listComments, updateComment } from "./controllers/commentCtrl.ts";
import { listArtifacts, renderArtifacts } from "./controllers/artifactCtrl.ts";

export class App {
  private jason: Jason;
  public db: Database;
  public port: number;
  public env: string;
  public debug: boolean;

  constructor(opts: {
    port: number,
    env?: string,
    debug?: boolean
  }) {
    this.env = opts.env ?? 'production';
    this.port = opts.port;
    this.debug = opts.debug ?? false;
    this.jason = new Jason();
    this.db = this.connectDB();
  }

  async runServer() {
    this.registedModels();
    await this.db.sync();
    this.registerControllers();
    this.jason.listen(this.port);
  }

  async stopServer() {
    await this.db.close();
    return this.jason.close();
  }

  private registerControllers() {
    const router = new Router();
    router.register(HttpMethod.POST, "/comments/", createComment);
    router.register(HttpMethod.GET, "/comments/", listComments);
    router.register(HttpMethod.GET, "/comments/:id", getComment);
    router.register(HttpMethod.PUT, "/comments/:id", updateComment);
    router.register(HttpMethod.DELETE, "/comments/:id", deleteComment);
    router.register(HttpMethod.GET, "/artifacts/", listArtifacts);
    router.register(HttpMethod.GET, "/artifacts/render", renderArtifacts);
    this.jason.use(router);
  }

  private connectDB() {
    const str = (this.env !== 'production') ? '.'+this.env : '';
    const connector = new SQLite3Connector({
      filepath: `./database${str}.sqlite`,
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

