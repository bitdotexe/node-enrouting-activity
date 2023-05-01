import http from "http";
import path from "path";
import { promises as fs } from "fs";

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const server = http.createServer(async (req, res) => {
  // Destructuring the "req"
  let { url, method } = req;

  console.log(`✅ CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrouting requests
  switch (url) {
    case "/":
      // Root request
      // Establishing headers
      res.setHeader("Content.Type", "text/html");
      // Writing the answer
      res.write(`
        <html>
          <head>
            <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
            <title>My App</title>
          </head>
          <body>
            <h1 style="color: #333">Hello from my server !</h1>
            <p style="color: #34495E">You're in the root resource.</p>
          </body>
        </html>
      `);
      console.log(`🟢 Answering: 200 ${req.url} ${req.method}`);
      // Establishing the answer code
      res.statusCode = 200;
      // Closing the comunication
      res.end();
      break;
    case "/author":
      // Root request
      // Establishing headers
      res.setHeader("Content.Type", "text/html");
      // Writing the answer
      res.write(`
          <html>
            <head>
              <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
              <title>My App</title>
            </head>
            <body>
              <h1>Created by:</h1>
              <p>Uriel Abisai Torres García | @bitdotexe</p>
              <p>191130325</p>
              <p>Fullstack web development I</p>
              <p>Created: 04/30/2023</p>
            </body>
          </html>
        `);
      console.log(`🟢 Answering: 200 ${req.url} ${req.method}`);
      // Establishing the answer code
      res.statusCode = 200;
      // Closing the comunication
      res.end();
      break;
    case "/favicon.ico":
      // Specifying the path to the icon file
      const faviconPath = path.join(__dirname, "favicon.ico");
      try {
        const data = await fs.readFile(faviconPath);
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end(data);
      } catch (err) {
        console.error(err);
        // Root request
        // Stablishing headers
        res.setHeader("Content-Type", "text/html");
        // Writing the answer
        res.write(`
          <html>
            <head>
              <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
              <title>My App</title>
            </head>
            <body> 
              <h1>&#128534; 500 The server is out of service</h1>
              <p>We're sorry there was an error in our server...</p>
              <p> ${err.message}</p>
            </body>
          </html>
          `);
        console.log(`🔴 Answering: 500 ${req.url} ${req.method}`);
        // Stablishing the answer code
        res.statusCode = 500;
        // Closing comunication
        res.end();
      }
      break;
    default:
      // Root request
      // Establishing headers
      res.setHeader("Content.Type", "text/html");
      // Writing the answer
      res.write(`
        <html>
          <head>
            <link rel="icon" type="image/png" sizes="32x32" href="https://img.icons8.com/fluency/256/domain.png">
            <title>My App</title>
          </head>
          <body>
            <h1>&#128534; 404 Not found</h1>
            <p>Sorry We can't find what you're looking for.</p>
          </body>
        </html>
      `);
      console.log(`🔴 Answering: 404 ${req.url} ${req.method}`);
      // Establishing the answer code
      res.statusCode = 404;
      // Closing comunication
      res.end();
      break;
  }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("⏺️ Server listening in http://localhost:3000");
});
