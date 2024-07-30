import express, { Request, Response, NextFunction } from "express";
import logger from "./logger";

const app = express();
const router = express.Router();

const port = 8080;
app.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("/" + req.method);
  next();
});

router.get("/status", (req: Request, res: Response) => {
  logger.info("status checked");
  res.status(200).send();
});

app.post("/payments", (req: Request, res: Response) => {
  logger.info({ message: "info", req });
  logger.warn({ message: "warning ", req });
  logger.log({ message: "log ", req });
  logger.silly({ message: "silly", req });

  const { carId, amount } = req.body;
  if (typeof amount !== "number" || !Number.isInteger(amount)) {
    logger.error("Invalid amount. It must be an integer.");
    return res
      .status(400)
      .json({ error: "Invalid amount. It must be an integer." });
  }
  logger.info({ message: "Payment processed successfully", carId, amount });
  res
    .status(201)
    .json({ message: "Payment processed successfully", carId, amount });
});

app.use("/", router);

app.listen(port, () => {
  logger.info("Example app listening on port 8080!");
});
