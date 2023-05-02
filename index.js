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
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
        <title>My App</title>
        <style>
          body {
            background-color: #393646;
            font-family: Arial, sans-serif;
          }
          h1, h2 {
            color: #F4EEE0;
            text-align: center;
            margin-top: 50px;
          }
          form {
            margin-top: 30px;
            text-align: center;
          }
          input[type="text"] {
            width: 300px;
            padding: 10px;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 0px 5px #F4EEE0;
            outline: none;
          }
          button[type="submit"] {
            background-color: #4F4557;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            box-shadow: 0px 0px 5px #6D5D6E;
            outline: none;
          }
          button[type="submit"]:hover {
            background-color: #6D5D6E;
          }
        </style>
      </head>
      <body> 
        <h1>Welcome back!</h1>
        <h2>Send me a message...</h2>
        <div>
          <form action="/message" method="POST">
            <input type="text" name="message">
            <button type="submit">Send</button>
          </form>
        </div>
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
    case "/message":
      // Verifying if it's POST
      if (method === "POST") {
        /* We create a variable to
        save the client in-data*/
        let body = "";

        /* We register the event manager
        for the data reception*/
        req.on("data", (data) => {
          body += data;
          if (body.length > 1e6) return req.socket.destroy();
        });

        /* We register the event manager
        to end the data reception*/
        req.on("end", () => {
          // Procesing the form
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          /* By the URLSearchParams we extract
          the inputs of the form*/
          const params = new URLSearchParams(body);
          /* We build an object based on the data
          and on the params variable*/
          const parsedParams = Object.fromEntries(params);
          res.write(`
              <html>
              <head>
                <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                <title>My App</title>
                <style>
                  body {
                    background-color: #5F264A;
                    font-family: Arial, sans-serif;
                  }
                  h1 {
                    color: #B0A4A4;
                    font-size: 48px;
                    margin-top: 50px;
                    text-align: center;
                  }
                  p {
                    font-size: 24px;
                    color: #B0A4A4;
                    text-align: center;
                    margin-top: 20px;
                  }
                  .error-message {
                    font-size: 18px;
                    color: #643A6B;
                    text-align: center;
                    margin-top: 20px;
                  }
                </style>
              </head>
              <body> 
                <h1 style="color: #FFFF">SERVER MESSAGE RECIEVED &#128172</h1>
                <p>${parsedParams.message}</p>
              </body>
            </html>
            `);
          // We finish the connectipon
          return res.end();
        });
      } else {
        res.statusCode = 404;
        res.write("🔴 404: Endpoint not found");
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
