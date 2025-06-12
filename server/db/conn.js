const mongoose = require("mongoose");

const db = process.env.DATABASE

mongoose.connect(db).then(() =>console.log("data base connected")).catch((error) => console.log("error" + error.message));
