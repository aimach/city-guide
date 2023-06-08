import express from "express";
import cors from "cors";
import dataSource from "./dataSource";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ hello: "World" });
});

const start = async (): Promise<void> => {
  const port = 5000;

  await dataSource.initialize();
  app.listen({ port }, () => {
    console.log(`Backend app ready at http://localhost:${port}`);
  });
};
void start();
