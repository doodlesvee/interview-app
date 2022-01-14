const {
  saveJson,
  statisticsAPI,
  pieChartAPI,
  allResponse,
  barChartAPI,
} = require("./controller");
const salesRouter = require("express").Router();

salesRouter.get("/", saveJson);
salesRouter.post("/stats", statisticsAPI);
salesRouter.post("/pie", pieChartAPI);
salesRouter.get("/bar", barChartAPI);
salesRouter.post("/all", allResponse);

module.exports = salesRouter;
