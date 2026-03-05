import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import rateLimit from "express-rate-limit";
import compression from "compression";
import hpp from "hpp";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import commentRoutes from "./routes/commentRoutes";
import contactRoutes from "./routes/contactRoutes";
import statsRoutes from "./routes/statsRoutes";
import userRoutes from "./routes/userRoutes";
import careerRoutes from "./routes/careerRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://aksara-cakra.com",
        "https://www.aksara-cakra.com",
      ];
      // Allow requests with no origin (mobile apps, curl, etc.)
      // Allow any localhost origin in development
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^http:\/\/localhost(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(compression());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    status: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use("/api/", limiter);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads")),
);

app.use(
  "/api/uploads",
  express.static(path.join(process.cwd(), "public", "uploads")),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[Error] ${statusCode} - ${message}`);
    if (err.stack) console.error(err.stack);

    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  },
);

export default app;
