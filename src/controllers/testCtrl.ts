
import { ServerRequest } from "../../deps.ts";
import { fetchRepoArtifacts } from "../services/artifactSrvc.ts";
import { MainTemplate } from "../templates/mainTmpl.ts";

export async function testController(req: ServerRequest, params: {[key: string]: string}) {
  console.log('PARAMS', params);
  const artifacts = await fetchRepoArtifacts();
  const template = new MainTemplate({ artifacts });
  let html = template.render();
  req.respond({body: html});
}