import app from "./app";
import { populateTest } from "./scripts/populate";

const PORT = process.env.PORT || 3001;

populateTest();

app.listen(PORT, () => console.log(`server started on port: ${PORT}!`));
