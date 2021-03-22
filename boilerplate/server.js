const filesystem = require('fs');
const http = require('http');

const indexHTMLContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script>
      window.env = {};
      window.env.GITHUB_USERNAME = "${process.env.GITHUB_USERNAME}";
    </script>
    <script src="./main.js"></script>
  </head>
  <body></body>
</html>
`;

filesystem.writeFileSync(`./dist/index.html`, indexHTMLContent, `utf8`);
filesystem.copyFileSync(`./src/styles.css`, `./dist/styles.css`);

/** @type {http.RequestListener} */
const serve = (request, response) => {
  if(request.url === `/`) request.url = `/index.html`;

  let requestedFileData;
  try {
    requestedFileData = filesystem.readFileSync(`./dist${request.url}`);
  } catch (error) {
    response.writeHead(404);
    response.end(`The requested URL ${request.url} was not found on this server.`);
    return;
  }

  if(request.url === `/styles.css`) response.setHeader(`Content-Type`, `text/css`);
  response.writeHead(200);
  response.end(requestedFileData);
};

http.createServer(serve).listen(process.env.NODE_LISTENER_PORT);
console.log(`listening on port ${process.env.NODE_LISTENER_PORT}`);
