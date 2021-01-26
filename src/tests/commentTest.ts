import {
  assertEquals, 
  TestSuite,
  test,
} from "../../deps.ts";
import { App } from "../app.ts";
import { config } from "../../deps.ts";
import { Comment } from "../models/Comment.ts";

const { PORT, ENV } = config({safe: true});
const host = 'localhost';
const API_URL = `http://${host}:${PORT}`;
const baseData = [
  {
    title: 'test1',
    body: 'whatever-1'
  },
  {
    title: 'test2',
    body: 'whatever-2'
  },
  {
    title: 'test3',
    body: 'whatever-3'
  }
];

interface commentSuiteContext {
  app: App,
  server: Promise<void>
}

const commentSuite: TestSuite<commentSuiteContext> = new TestSuite({
  name: "comments",
  sanitizeOps: false,
  sanitizeResources: false,
  beforeAll(context: commentSuiteContext) {
    context.app = new App({port: Number(PORT), env: ENV});
    context.app.runServer();
  },
  async afterAll(context: commentSuiteContext) {
    return context.app.stopServer();
  },
  beforeEach(context: commentSuiteContext) {
    return Comment.create(baseData);
  },
  afterEach(context: commentSuiteContext) {
    return Comment.delete();
  },
});

test(commentSuite, "POST /comments should create a comment", async (): Promise<void> => {
  const res = await fetch(API_URL + '/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'test-create',
      body: 'blablabla'
    }),
  });
  const resBody = await res.json();
  assertEquals(res.status, 201);
  assertEquals(resBody, {});
}); 

test(commentSuite, "GET /comments/ should return a list of comments", async (): Promise<void> => {
  const res = await fetch(API_URL + '/comments/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const resBody = await res.json();
  assertEquals(res.status, 200);
  assertEquals(resBody.length, baseData.length);
  baseData.forEach((item, i) => {
    assertEquals(resBody[i].title, baseData[i].title);
    assertEquals(resBody[i].body, baseData[i].body);
  })
}); 

test(commentSuite, "GET /comments/:id should return a comment", async (): Promise<void> => {
  const res = await fetch(API_URL + '/comments/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const resBody = await res.json();
  assertEquals(res.status, 200);
  assertEquals(resBody.title, baseData[0].title);
}); 


test(commentSuite, "PUT /comments/:id should update a comment", async (): Promise<void> => {
  const res = await fetch(API_URL + '/comments/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'test-updated',
      body: 'updated',
      author: 'Daniel'
    })
  });
  assertEquals(res.status, 204);
  const resBody = await res.json();
}); 

test(commentSuite, "DELETE /comments/:id should delete a comment", async (): Promise<void> => {
  const res = await fetch(API_URL + '/comments/1', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  assertEquals(res.status, 204);
  const resBody = await res.json();
}); 
