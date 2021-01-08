import { Request, Response } from "../../deps.ts";
import { fetchRepoArtifacts } from "../services/artifactSrvc.ts";
import { MainTemplate } from "../templates/mainTmpl.ts";

export async function controller(req: Request, res: Response) {
  const artifacts = await fetchRepoArtifacts();
  const template = new MainTemplate({ artifacts });
  let html = template.render();
  res.send(html);
}