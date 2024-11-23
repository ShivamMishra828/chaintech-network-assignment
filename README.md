# Chaintech Network Assignment

## Table of Contents

-   [Chaintech Network Assignment](#chaintech-network-assignment)
    -   [Table of Contents](#table-of-contents)
    -   [Overview](#overview)
    -   [Features](#features)
    -   [Technologies Used](#technologies-used)
    -   [Project Structure](#project-structure)
    -   [Project Structure](#project-structure-1)
    -   [Installation](#installation)
        -   [Prerequisites](#prerequisites)
        -   [Steps to Install](#steps-to-install)
    -   [Docker Support](#docker-support)
    -   [API Endpoints](#api-endpoints)
        -   [Tasks API](#tasks-api)
    -   [API Testing with Postman](#api-testing-with-postman)
    -   [Error Handling](#error-handling)

## Overview

The **Chaintech Network Assignment** is a Node.js application built using TypeScript. It serves as a task management system where users can create, read, update, and delete tasks. The application follows best practices in software development, including the use of middleware for validation, structured error handling, and organized code architecture.

## Features

-   Create, read, update, and delete tasks.
-   Input validation using Zod schemas.
-   Middleware for error handling and request logging.
-   Rate limiting to prevent abuse of the API.
-   Environment variable management using dotenv.
-   Comprehensive logging with Winston.
-   TypeScript for type safety and better developer experience.

## Technologies Used

-   **Node.js**: JavaScript runtime for building the server-side application.
-   **Express**: Web framework for building RESTful APIs.
-   **TypeScript**: Superset of JavaScript that adds static types.
-   **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
-   **Zod**: Schema validation library for TypeScript.
-   **Winston**: Logging library for Node.js applications.
-   **Nodemon**: Tool that automatically restarts the server during development.
-   **Prettier**: Code formatter to maintain consistent code style.

## Project Structure

## Project Structure

```plaintext
src/
├── config/             # Configuration files (logger, server, etc.)
├── controllers/        # Route handler functions
├── db/                 # Database connection
├── middlewares/        # Middleware for validation, logging, etc.
├── models/             # Mongoose schemas and models
├── repository/         # Data access layer
├── routes/             # API route definitions
├── schemas/            # Validation Schemas
├── services/           # Business Logic Layer
├── utils/              # Utility functions and helpers
├── app.ts              # Main Express app setup
└── index.ts            # Entry point of the application
```

## Installation

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [pnpm](https://pnpm.io/) (recommended package manager)

### Steps to Install

1. Clone the repository:

    ```bash
    git clone https://github.com/ShivamMishra828/chaintech-network-assignment
    cd chaintech-network-assignment
    ```

2. Install dependencies using pnpm:

    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root directory and add your environment variables. Here's an example:

    ```bash
    PORT=3000
    RATE_LIMIT_WINDOW_MS=600000
    RATE_LIMIT_MAX=20
    CORS_ORIGIN='http://localhost:3000'
    DATABASE_URL='mongodb://localhost:27017/task-db'
    ```

4. Build the project:

    ```bash
    pnpm build
    ```

5. Running the Application:

-   Development Mode: To start the application in development mode with automatic restarts on file changes:

    ```bash
    pnpm start:dev
    ```

-   Production Mode: To start the application in production mode:

    ```bash
    pnpm start
    ```

## Docker Support

You can also run this application using Docker. Here's how to set it up:

1. Build the Docker image:

    ```bash
    docker build -t task-management-app .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 3000:3000 task-management-app
    ```

3. Access the application at `http://localhost:3000`.

## API Endpoints

### Tasks API

1. Create Task

-   Endpoint: `POST /api/v1/tasks`
-   Request Body:
    ```json
    {
        "title": "Task Title",
        "description": "Task Description",
        "dueDate": "2024-12-31T23:59:59Z",
        "category": "personal"
    }
    ```
-   Response: 201 Created
    ```json
    {
        "success": true,
        "message": "Task created successfully",
        "data": {
            "_id": "taskId",
            "title": "Task Title",
            "description": "Task Description",
            "dueDate": "2024-12-31T23:59:59Z",
            "status": "pending",
            "category": "personal",
            "createdAt": "2024-12-24T23:59:59Z",
            "updatedAt": "2024-12-24T23:59:59Z"
        }
    }
    ```

2. Fetch All Tasks

-   Endpoint: `GET /api/v1/tasks`
-   Response: 200 OK
    ```json
    {
        "success": true,
        "message": "Tasks fetched successfully",
        "data": [
            {
                "_id": "67409360cae0ade2eb53bb5f",
                "title": "Demo Title 1",
                "description": "Updated Demo Description 1",
                "status": "pending",
                "category": "personal",
                "dueDate": "2024-11-29T14:21:20.955Z",
                "createdAt": "2024-11-22T14:21:20.959Z",
                "updatedAt": "2024-11-23T05:24:37.371Z",
                "__v": 0
            },
            {
                "_id": "6740a44e23e5b1e222381114",
                "title": "Demo Title 2",
                "description": "Demo Description 2",
                "status": "completed",
                "category": "personal",
                "dueDate": "2024-11-29T15:33:34.438Z",
                "createdAt": "2024-11-22T15:33:34.443Z",
                "updatedAt": "2024-11-23T06:48:07.195Z",
                "__v": 0
            }
        ]
    }
    ```

3. Fetch Task By ID

-   Endpoint: `GET /api/v1/tasks/:taskId`
-   Response: 200 OK

    ```json
    {
        "success": true,
        "message": "Task fetched successfully",
        "data": {
            "_id": "6740a44e23e5b1e222381114",
            "title": "Demo Title 2",
            "description": "Demo Description 2",
            "status": "completed",
            "category": "personal",
            "dueDate": "2024-11-29T15:33:34.438Z",
            "createdAt": "2024-11-22T15:33:34.443Z",
            "updatedAt": "2024-11-23T06:48:07.195Z",
            "__v": 0
        }
    }
    ```

-   Response 404 Not Found
    ```json
    {
        "success": false,
        "message": "Task not found",
        "error": {
            "statusCode": 404,
            "isOperational": true
        }
    }
    ```

4. Update Task Details

-   Endpoint: `PUT /api/v1/tasks/:taskId`
-   Request Body:

    ```json
    {
        "description": "Updated Task Description",
        "category": "work"
    }
    ```

-   Response: 200 OK

    ```json
    {
        "success": true,
        "message": "Task details updated successfully",
        "data": {
            "_id": "6740a44e23e5b1e222381114",
            "title": "Updated Task Description",
            "description": "Updated Demo Description 1",
            "status": "completed",
            "category": "work",
            "dueDate": "2024-11-29T15:33:34.438Z",
            "createdAt": "2024-11-22T15:33:34.443Z",
            "updatedAt": "2024-11-23T14:03:11.276Z",
            "__v": 0
        }
    }
    ```

-   Response 404 Not Found
    ```json
    {
        "success": false,
        "message": "Task not found",
        "error": {
            "statusCode": 404,
            "isOperational": true
        }
    }
    ```

5. Update Task Status

-   Endpoint: `PATCH /api/v1/tasks/:taskId`
-   Request Body:

    ```json
    {
        "status": "completed"
    }
    ```

-   Response: 200 OK

    ```json
    {
        "success": true,
        "message": "Task status updated successfully",
        "data": {
            "_id": "6740a44e23e5b1e222381114",
            "title": "Demo Title 2",
            "description": "Updated Demo Description 1",
            "status": "pending",
            "category": "completed",
            "dueDate": "2024-11-29T15:33:34.438Z",
            "createdAt": "2024-11-22T15:33:34.443Z",
            "updatedAt": "2024-11-23T14:05:06.201Z",
            "__v": 0
        }
    }
    ```

-   Response 404 Not Found
    ```json
    {
        "success": false,
        "message": "Task not found",
        "error": {
            "statusCode": 404,
            "isOperational": true
        }
    }
    ```

6. Delete Task

-   Endpoint: `DELETE /api/v1/tasks/:taskId`
-   Response: 204 No Content

## API Testing with Postman

You can test the API using Postman. Follow these steps:

1. Open [Postman](https://www.postman.com/).
2. Import the collection using the following link:
    - [Postman API Collection](https://elements.getpostman.com/redirect?entityId=24282021-54bd2dc2-4372-492a-b6ef-272b0c76dbcc&entityType=collection)
3. Test all available endpoints directly.

## Error Handling

Centralized error handling for validation and unexpected errors.
