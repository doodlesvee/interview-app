const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/interview-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, result) => {
    if (error) console.log(error);
    else console.log("Database Connected");
  }
);
