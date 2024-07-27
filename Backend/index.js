const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const MongoDB = require("./database.js");
MongoDB();

app.use(cors());
app.use(express.json());

app.use("/api", require("./Routes/createUser"));
app.use("/api", require("./Routes/displayData"));
app.use("/api", require("./Routes/orderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
