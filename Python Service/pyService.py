import grpc
from concurrent import futures
import service_pb2
import service_pb2_grpc

port = 9001


class MyServiceServicer(service_pb2_grpc.MyServiceServicer):
    def pySayHello(self, request, context):
        response_msg = f"""
        <pre>
        -----------------------
        | From pyService.py |
        -----------------------
         Hello {request.name}
        </pre>"""
        return service_pb2.PyHelloResponse(message=response_msg)

    def pySum(self, request, context):
        n1 = request.num1
        n2 = request.num2
        sumResult = n1 + n2
        response_msg = f"""
        <pre>
        -----------------------
        | From pyService.py |
        -----------------------
         Summation of {n1} and {n2} is = {sumResult}
        </pre>"""
        return service_pb2.PySumResponse(result=response_msg)


def serve():
    gRPCserver = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_MyServiceServicer_to_server(MyServiceServicer(), gRPCserver)
    gRPCserver.add_insecure_port(f"[::]:{port}")
    gRPCserver.start()
    print(f"gRPC python server is running on port {port}")
    gRPCserver.wait_for_termination()


if __name__ == "__main__":
    serve()
