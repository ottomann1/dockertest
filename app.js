const express = require("express");
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const app = express();
const router = express.Router();

const path = __dirname + "/views/";
const port = 8080;

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/status", function (req, res) {
  res.status(200).send();
});

app.post('/payments', (req, res) => {
  const { carId, amount } = req.body;
  if (!uuidValidate(carId)) {
    return res.status(400).json({ error: 'Invalid carId. It must be a valid UUID.' });
  }
  if (typeof amount !== 'number' || !Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Invalid amount. It must be an integer.' });
  }
  res.status(201).json({ message: 'Payment processed successfully', carId, amount });
});

app.use("/", router);

app.listen(port, function () {
  console.log("Example app listening on port 8080!");
});
