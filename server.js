const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const parserServer = require('parse-server').ParseServer;
const parseDashboard = require('parse-dashboard')
const userAuth = require('./routes/user')

const port = 8383;

/**middleware */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(port, () => {
    console.log('server listening to port: ', port);
})


const api = new parserServer({
    databaseURI: "mongodb+srv://ejayawan22:qhlQQ72Obehoig6U@cluster0.f0mr86i.mongodb.net/?retryWrites=true&w=majority",
    appId: "123",
    masterKey: "1234",
    serverURL: `http://localhost:${port}/parse`,
    // cloud: "./cloud/main.js",
    appName: "MSC",
  });
  
  const dashboardConfig = new parseDashboard({
    apps: [
      {
        appId: "123",
        masterKey: "1234",
        serverURL: `http://localhost:${port}/parse`,
        appName: "MSC",
      },
    ],
  });

api.start();

  // Mount the Parse API middlewared
app.use("/parse", api.app);
app.use("/dashboard", dashboardConfig);

app.use('/api/user', userAuth);
