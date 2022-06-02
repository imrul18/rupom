const express = require("express");
const mongoose = require("mongoose");

const AuthenticationRouter = require("./routes/AuthenticationRouter");
const UsersRouter = require("./routes/UsersRouter");
const MealsRouter = require("./routes/MealsRouter");
const PaymentsRouter = require("./routes/PaymentsRouter");
const MembersRouter = require("./routes/MembersRouter");
// const CompaniesRouter = require("./routes/CompaniesRouter");

const Auth = require("./middlewares/Auth");

var app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/restaurant")
  .then(() => console.log("Connected!!!"))
  .catch((err) => console.log(err));

app.use("/users", UsersRouter);
app.use("/authentication", AuthenticationRouter);
app.use("/meals", MealsRouter);
app.use("/payments", PaymentsRouter);
app.use("/members", MembersRouter);

// app.use("/companies",  CompaniesRouter);

app.use((err, req, res, next) => {
  res.json({ status: 500, type:'error', message: "Authentication failed!"});
});

app.listen(3000);
