import {
  assertEquals, 
  TestSuite,
  test,
  Server
} from "../../deps.ts";
import { runServer } from "../server.ts";

const host = 'localhost';
const port = 8000;
const API_URL = `http://${host}:${port}/api/v1/`;

interface commentSuiteContext {
  server: Server
}

const commentSuite: TestSuite<commentSuiteContext> = new TestSuite({
  name: "comment",
  beforeAll(context: commentSuiteContext) {
    context.server = runServer();
  },
  afterAll(context: commentSuiteContext) {
    context.server.close();
  },
  beforeEach(context: commentSuiteContext) {
    // setup context
  },
  afterEach(context: commentSuiteContext) {
    // reset context
  },
});

test(commentSuite, "Endpoint Comment Create should return 201", async (): Promise<void> => {
  const comment = {
    title: 'test comment',
    body: 'lorem ipsum'
  };
  const res = await fetch(API_URL + 'comment/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  const resBody = await res.json();
  assertEquals(res.status, 201);
  assertEquals(resBody, {});

}); 