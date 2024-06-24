const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;
app.use(express.json());
app.use(cors());

// Enable gRPC debug logging
grpc.setLogVerbosity(grpc.logVerbosity.DEBUG);
grpc.setLogger(console);

// Load the protobuf
const PROTO_PATH = path.join(__dirname, "service.proto");
// This loadSync function synchronously loads the service.proto file and converts it into a JavaScript object that can be used by the gRPC library.
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// This function takes the package definition (created in the previous step) and loads it into a format that gRPC can use.
// .myservice: This accesses the specific service defined in your proto file. The name myservice should match the package name defined in the proto file (package myservice;).
const myserviceProto = grpc.loadPackageDefinition(packageDefinition).myservice;

// Create a client instance
const JSclient = new myserviceProto.MyService(
  process.env.MAIN_JS_SERVICE_URL,
  grpc.credentials.createInsecure()
);

// Create a client instance
const PYclient = new myserviceProto.MyService(
  process.env.MAIN_PY_SERVICE_URL,
  grpc.credentials.createInsecure()
);

app.get("/", (req, res) => {
  res.status(200).send(`<pre>
    -----------------------
    | From apiService.js |
    -----------------------
    apiService Server is live✅
    </pre>`);
});

app.get("/jsHello", (req, res) => {
  const username = req.query.username;
  // Call the sayHello method
  JSclient.jsSayHello({ name: username }, (err, resp) => {
    if (!err) {
      res.status(200).send(resp.message);
    } else {
      res.status(500).send("Internal Server Error");
      console.error(err);
    }
  });
});

app.get("/jsSum", (req, res) => {
  const { number1, number2 } = req.query;
  // Call the sum method
  JSclient.jsSum({ num1: number1, num2: number2 }, (err, resp) => {
    if (!err) {
      res.status(200).send(resp.result);
    } else {
      res.status(500).send("Internal Server Error");
      console.error(err);
    }
  });
});

app.get("/pyHello", (req, res) => {
  const username = req.query.username;
  // Call the sayHello method
  PYclient.pySayHello({ name: username }, (err, resp) => {
    if (!err) {
      res.status(200).send(resp.message);
    } else {
      res.status(500).send("Internal Server Error");
      console.error(err);
    }
  });
});

app.get("/pySum", (req, res) => {
  const { number1, number2 } = req.query;
  // Call the sum method
  PYclient.pySum({ num1: number1, num2: number2 }, (err, resp) => {
    if (!err) {
      res.status(200).send(resp.result);
    } else {
      res.status(500).send("Internal Server Error");
      console.error(err);
    }
  });
});

app.listen(port, () => {
  console.log(
    `apiService microservice server is running on http://127.0.0.1:${port}`
  );
});
