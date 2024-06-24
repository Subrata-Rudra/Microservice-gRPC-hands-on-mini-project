# Microservice gRPC Hands-On Mini Project

This project demonstrates a microservice architecture using gRPC for inter-service communication. It includes three services:
- **API Service**: Node.js
- **NodeJS Service**: Node.js
- **Python Service**: Python

## Overview

The primary aim of this project is to showcase the use of gRPC (Remote Procedure Call) for efficient and reliable communication between microservices.

## Services

1. **API Service (Node.js)**:
   - Handles incoming API requests.
   - Communicates with other services via gRPC.

2. **NodeJS Service (Node.js)**:
   - Provides specific business functionalities.
   - Communicates with the API Service and Python Service via gRPC.

3. **Python Service (Python)**:
   - Provides specific business functionalities.
   - Communicates with the NodeJS Service via gRPC.

## Technologies Used

- **gRPC**: For inter-service communication.
- **Node.js**: For the API Service and NodeJS Service.
- **Python**: For the Python Service.

## Demonstration

