/**
 * @param {string} content
 * @param {string[]} dependencies
 */
export function renderShell(content, dependencies) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${dependencies.map((dependency) => `<script type="module" src="${dependency}"></script>`).join('')}
      <title>CaliCircuit</title>
    </head>
    <body>
      <h1><a href="/">CaliCircuit</a></h1>
      ${content}
    </body>
    </html>  
  `;
}
