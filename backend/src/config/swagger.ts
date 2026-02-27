export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Aksara Cakra Research API",
    version: "1.0.0",
    description: "API Documentation for Aksara Cakra Research Website",
  },
  servers: [
    {
      url: "http://localhost:5342",
      description: "Development server",
    },
    {
      url: "https://api.aksara-cakra.com",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user (defaults to ADMIN, needs approval)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                  role: { type: "string", default: "ADMIN" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login to get JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/api/articles": {
      get: {
        tags: ["Articles"],
        summary: "Get all articles",
        responses: {
          200: { description: "List of articles" },
        },
      },
      post: {
        tags: ["Articles"],
        summary: "Create a new article (Admin only)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  excerpt: { type: "string" },
                  category: { type: "string" },
                  author: { type: "string" },
                  pdf: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Article created" },
        },
      },
    },
    "/api/articles/{idOrSlug}": {
      get: {
        tags: ["Articles"],
        summary: "Get article by ID or Slug",
        parameters: [
          {
            name: "idOrSlug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Article details" },
        },
      },
    },
    "/api/comments": {
      get: {
        tags: ["Comments"],
        summary: "Get all comments",
        responses: {
          200: { description: "List of comments" },
        },
      },
      post: {
        tags: ["Comments"],
        summary: "Add a comment",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  articleId: { type: "string" },
                  name: { type: "string" },
                  content: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Comment added" },
        },
      },
    },
    "/api/contact": {
      post: {
        tags: ["Contact"],
        summary: "Submit a contact inquiry",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  organization: { type: "string" },
                  phone: { type: "string" },
                  inquiryType: { type: "string" },
                  subject: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Inquiry submitted" },
        },
      },
    },
    "/api/stats": {
      get: {
        tags: ["Stats"],
        summary: "Get dashboard statistics (Admin only)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Stats data" },
        },
      },
    },
  },
};
