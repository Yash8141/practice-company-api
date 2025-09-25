import swaggerJSDoc from "swagger-jsdoc";

const publicBaseUrl =
  process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Practice Company API",
      version: "1.0.0",
      description: "API documentation for Departments, Employees, and Auth",
    },
    servers: [{ url: publicBaseUrl }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Department: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
        Employee: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            age: { type: "integer" },
            dob: { type: "string" },
            city: { type: "string" },
            department: { type: "string" },
            login: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
        Login: {
          type: "object",
          properties: {
            _id: { type: "string" },
            username: { type: "string" },
            password: { type: "string" },
            employee: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
