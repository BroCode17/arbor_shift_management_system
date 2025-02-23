import 'dotenv/config'
import app from "./app";
import { dbConnection } from "./utils/db";

// connect db
dbConnection;

//main
// main()
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
