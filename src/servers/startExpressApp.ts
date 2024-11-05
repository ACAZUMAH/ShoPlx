import express from "express";
require("express-async-errors");
import errorHandler from "../middleware/errors/error-handler";
import mainRouter from "../routes/main-router";
import setUpSwagger from "../docs/index";
import "../services/Types/index";

const start = async () => {
  const app = express();
  app.use(express.json());

  app.use(mainRouter);

  setUpSwagger(app);
  
  app.all("*", (req, res) => {
    res
      .status(404)
      .json({ message: "Unable to retrive the requested resource" });
  });

  app.use(errorHandler);

  return app;
};

export default start; 