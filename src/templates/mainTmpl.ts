import { Artifact } from "/models/Artifact.ts";

export class MainTemplate {
  artifacts: Artifact[];

  constructor(opts: {
    artifacts: Artifact[];
  }) {
    this.artifacts = opts.artifacts;
  }

  render() {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Hello World!\n</h1>
        <p>Here the Deno artifacts available:</p>
        <ul>
        ${this.renderArtifacts()}
        </ul>
      </body>
    </html>
    `;
  }

  private renderArtifacts() {
    let html = "";
    for (const item of this.artifacts) {
      html += `<li>${item.name}</li>`;
    }
    return html;
  }
}
