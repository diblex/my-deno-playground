import { Artifact } from "/models/Artifact.ts";

export async function fetchRepoArtifacts() {
  const gitHubUrl = "https://api.github.com";
  const owner = "denoland";
  const repo = "deno";
  const path = `/repos/${owner}/${repo}/actions/artifacts`;
  const res = await fetch(gitHubUrl + path);
  const json = await res.json();
  return json?.artifacts as Artifact[];
}
