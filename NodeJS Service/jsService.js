// Importing all the required modules
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const port = 6000;

// Load the protobuf
// Defining the path of service.proto file
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

// Implement the sayHello RPC method
function sayHello(call, callback) {
  const response = {
    message: `
    <pre>
    -----------------------
    | From mainService.js |
    -----------------------
    Hello ${call.request.name}
    </pre>`,
  };
  callback(null, response);
}

function sum(call, callback) {
  let n1 = parseInt(call.request.num1),
    n2 = parseInt(call.request.num2);
  let sumResult = n1 + n2;
  const response = {
    result: `
    <pre>
    -----------------------
    | From mainService.js |
    -----------------------
    Summation of ${n1} and ${n2} is = ${sumResult}
    </pre>`,
  };
  callback(null, response);
}

// Create the server and register the service
const gRPCserver = new grpc.Server();
gRPCserver.addService(myserviceProto.MyService.service, {
  jsSayHello: sayHello,
  jsSum: sum,
});

// Start the server
gRPCserver.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Error binding server:", err);
      return;
    }
    console.log(`gRPC nodejs Server is running at http://0.0.0.0:${port}`);
  }
);
