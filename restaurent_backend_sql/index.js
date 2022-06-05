const express = require("express");

var app = express();
app.use(express.json());

const AuthenticationRouter = require("./routes/AuthenticationRouter");
const UsersRouter = require("./routes/UsersRouter");
const MealsRouter = require("./routes/MealsRouter");
const PaymentsRouter = require("./routes/PaymentsRouter");
const MembersRouter = require("./routes/MembersRouter");

const Auth = require("./middlewares/Auth");

app.use("/users", UsersRouter);
app.use("/authentication", AuthenticationRouter);
app.use("/meals", Auth, MealsRouter);
app.use("/payments", Auth, PaymentsRouter);
app.use("/members", Auth, MembersRouter);

app.listen(3000);
