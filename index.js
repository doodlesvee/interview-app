const express = require("express");

const salesRouter = require("./routes");
require("./mongodb");

const app = express();
app.use(express.json());

app.use("/sales", salesRouter);

app.listen(5000, () => console.log("Listening on port 5000"));
