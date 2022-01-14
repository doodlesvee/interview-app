const Sales = require("./model");
const rp = require("request-promise");

module.exports = {
  saveJson: async (req, res) => {
    try {
      const response = await rp({
        uri: "https://roxiler-interviews.s3.amazonaws.com/product_transaction.json",
        json: true,
      });

      const sales = await Sales.insertMany(response);
      res.send(sales);
    } catch (e) {
      console.log(e);
    }
  },

  statisticsAPI: async (req, res) => {
    try {
      const { month } = req.body;
      if (!month) return res.status(400).send({ err: "Please enter a month " });

      if (month > 0 && month < 13) {
        const result = await Sales.aggregate([
          {
            $project: {
              _id: 0,
              title: 1,
              price: 1,
              sold: 1,
              category: 1,
              month: { $month: "$dateOfSale" },
            },
          },
          { $match: { month } },
        ]);

        console.log(result);

        let totalSales = 0;
        let soldProduct = 0;
        let notSold = 0;

        result.forEach(({ price, sold }) => {
          totalSales += price;
          sold ? soldProduct++ : notSold++;
        });

        res.send({
          totalSales: totalSales.toFixed(2),
          soldProduct,
          notSold,
        });
      } else res.status(400).send({ err: "Please enter a valid month " });
    } catch (e) {
      console.log(e);
    }
  },

  pieChartAPI: async (req, res) => {
    try {
      const { month } = req.body;
      if (!month) return res.status(400).send({ err: "Please enter a month " });

      if (month > 0 && month < 13) {
        const result = await Sales.aggregate([
          {
            $project: {
              _id: 0,
              title: 1,
              price: 1,
              sold: 1,
              category: 1,
              month: { $month: "$dateOfSale" },
            },
          },
          { $match: { month: 7 } },
          { $unwind: "$category" },
          {
            $group: {
              _id: { $toLower: "$category" },
              count: { $sum: 1 },
            },
          },
        ]);

        const data = {};

        for (let i = 0; i < result.length; i++) {
          data[result[i]._id] = result[i].count;
        }

        res.send(data);
      } else res.status(400).send({ err: "Please enter a valid month " });
    } catch (e) {
      console.log(e);
    }
  },
  barChartAPI: async (req, res) => {
    try {
      const result = await Sales.aggregate([
        {
          $match: {
            price: {
              $gt: 0,
              $lt: 100,
            },
          },
        },
        {
          $count: "0-100",
        },
      ]);

      res.send(result);
    } catch (e) {
      console.log(e);
    }
  },

  allResponse: async (req, res) => {
    try {
      const { month } = req.body;
      if (!month) return res.status(400).send({ err: "Enter a valid month" });
      if (month > 0 && month < 13) {
        const pie = await rp({
          method: "POST",
          uri: "http://localhost:5000/sales/pie",
          json: true,
          body: {
            month,
          },
        });

        const stats = await rp({
          method: "POST",
          uri: "http://localhost:5000/sales/stats",
          json: true,
          body: {
            month,
          },
        });

        res.send({ pie, stats });
      } else return res.status(400).send({ err: "Enter a valid month" });
    } catch (e) {
      console.log(e);
    }
  },
};
