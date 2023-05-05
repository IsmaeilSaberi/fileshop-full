const express = require("express");
const app = express();

// importing installed packages
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// importing security packages
const helmet = require("helmet");
const xssCleaner = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// using middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(cors());

//using security middlewares
app.use(helmet());
app.use(xssCleaner());
app.use(mongoSanitize());
app.use(hpp());

// using project routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "this is the server of the fileshop project!" });
});

/////\\\\\ user routes and use it's middlewares
const userRoutes = require("./routes/UserRoutes");
app.use("/api", userRoutes);

////\\\\ middlebanner routes and use it's middlewares
const middleBannerRoutes = require("./routes/MiddleBannerRoutes");
app.use("/api", middleBannerRoutes);

/////\\\\\ post routes and use it's middlewares
const postRoutes = require("./routes/PostRoutes");
app.use("/api", postRoutes);

////\\\\ slider routes and use it's middlewares
const sliderRoutes = require("./routes/SliderRoutes");
app.use("/api", sliderRoutes);

////\\\\ category routes and use it's middlewares
const categoryRoutes = require("./routes/CategoryRoutes");
app.use("/api", categoryRoutes);

////\\\\ product routes and use it's middlewares
const productRoutes = require("./routes/ProductRoutes");
app.use("/api", productRoutes);

// connecting to data base
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then((d) => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
