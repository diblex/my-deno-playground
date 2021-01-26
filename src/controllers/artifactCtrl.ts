
import { getJasonHeader, jsonToUint8Array, ServerRequest } from "../../deps.ts";
import { fetchRepoArtifacts } from "../services/artifactSrvc.ts";
import { MainTemplate } from "../templates/mainTmpl.ts";

export async function listArtifacts(req: ServerRequest) {
  const artifacts = await fetchRepoArtifacts();
  req.respond({
    status: 200, 
    body: jsonToUint8Array(artifacts),
    headers: getJasonHeader()
  });
}

export async function renderArtifacts(req: ServerRequest) {
  const artifacts = await fetchRepoArtifacts();
  const template = new MainTemplate({ artifacts });
  req.respond({
    status: 200,
    body: template.render()
  });
}
