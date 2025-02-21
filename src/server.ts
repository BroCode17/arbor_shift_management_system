import 'dotenv/config'
import app from "./app";
import { dbConnection } from "./utils/db";

const port = 3000; // you can choose any port number

// connect db
dbConnection;

//main
// main()
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
