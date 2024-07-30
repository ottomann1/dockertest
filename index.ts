import express, { Request, Response, NextFunction } from "express";
import logger from "./logger";

const app = express();
const router = express.Router();

const port = 8080;
app.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  logger.log("/" + req.method);
  next();
});

router.get("/status", (req: Request, res: Response) => {
  logger.info("status checked");
  res.status(200).send();
});

app.post("/payments", (req: Request, res: Response) => {
  logger.info(req.body);
  const { carId, amount } = req.body;
  logger.info({ message: "info", carId, amount });
  logger.warn({ message: "warning ", carId, amount });
  logger.log({ message: "log ", carId, amount });
  logger.silly({ message: "silly", carId, amount });
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
