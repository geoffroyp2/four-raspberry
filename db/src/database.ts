import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

const connect = () => {
  if (database) return;

  const uri = "mongodb://192.168.0.121:27017/four?readPreference=primary&ssl=false";

  console.log("connecting to database...");

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

const disconnect = () => {
  if (!database) return;

  Mongoose.disconnect();
  console.log("database disconnected");
};

export default { connect, disconnect };
