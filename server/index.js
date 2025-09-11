require("dotenv").config();
const mongoose = require("mongoose");
//const MONGO_URL = "mongodb+srv://abhinavbhardwaj2805_db_user:hello1234@cluster01.avrissd.mongodb.net/"
const express = require("express");
const app = express();
const item = require("./routes/items");
const cors = require("cors");
const user = require("./routes/user");
app.use(express.urlencoded({extended: false}));

app.use(cors({"origin":"*"}));

app.use(express.json());



process.on(("uncaughtException"), (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
});
// const server = app.listen(PORT, () => {console.log("server is running on port", PORT)});

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,}).then((data) => {console.log("mongodb connected with server:", data.connection.host);});
app.use("/user", user);
app.use("/items", item);
app.listen(process.env.PORT, () => console.log(`Server Started at PORT:${process.env.PORT}`));