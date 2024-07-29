const express = require("express");
const logger = require('./logger');
const app = express();
const router = express.Router();

const path = __dirname + "/views/";
const port = 8080;
app.use(express.json())
router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/status", function (req, res) {
  logger.info("status checked")
  res.status(200).send();
});

app.post('/payments', (req, res) => {
  logger.info("payment received: ", req.body);
  const { carId, amount } = req.body;
  if (typeof amount !== 'number' || !Number.isInteger(amount)) {
    logger.info('Invalid amount. It must be an integer.')
    return res.status(400).json({ error: 'Invalid amount. It must be an integer.' });
  }
  logger.info({ message: 'Payment processed successfully', carId, amount })
  res.status(201).json({ message: 'Payment processed successfully', carId, amount });
});

app.use("/", router);

app.listen(port, function () {
  logger.info("Example app listening on port 8080!");
});
