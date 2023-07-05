import express from "express";
import cors from "cors";
import dataSource from "./dataSource";
import {
  authRoutes,
  poiRoutes,
  profileRoutes,
  citiesRoutes,
  categoriesRoutes,
} from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/poi", poiRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/categories", categoriesRoutes);

const start = async (): Promise<void> => {
  const port = 5000;

  await dataSource.initialize();
  app.listen({ port }, () => {
    console.log(`Backend app ready at http://localhost:${port}`);
  });
};
void start();
