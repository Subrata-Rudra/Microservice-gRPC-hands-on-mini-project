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
   - Communicates with other services(NodeJS service and Python service) via gRPC.

2. **NodeJS Service (Node.js)**:

   - Provides specific functionalities - sayHello(prints greeting message using javascript), sum(adds two numbers using javascript).
   - Communicates with the API Service via gRPC.

3. **Python Service (Python)**:
   - Provides specific functionalities - PySayHello(prints greeting message using python), PySum(adds two numbers using python).
   - Communicates with the API Service via gRPC.

## Technologies Used

- **gRPC**: For inter-service communication.
- **Node.js**: For the API Service and NodeJS Service.
- **Python**: For the Python Service.

## Demonstration Video 👇Click Below

[![Watch the video](./microservice%20thumbnail.png)](https://drive.google.com/file/d/1PT4nh3lqTDkx1qOi9-ycYXNIdwaFb-RO/view?usp=sharing)
