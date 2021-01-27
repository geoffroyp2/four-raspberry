import app from "./app";
import { populateTest } from "./scripts/populate";
import { queryTest } from "./scripts/query";

const PORT = process.env.PORT || 3001;

// populateTest();
// queryTest();

app.listen(PORT, () => console.log(`server started on port: ${PORT}!`));
