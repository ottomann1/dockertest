const express = require("express");

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
  res.status(200).send();
});

app.post('/payments', (req, res) => {
  console.log(req.body);
  const { carId, amount } = req.body;
  if (typeof amount !== 'number' || !Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Invalid amount. It must be an integer.' });
  }
  res.status(201).json({ message: 'Payment processed successfully', carId, amount });
});

app.use("/", router);

app.listen(port, function () {
  console.log("Example app listening on port 8080!");
});
