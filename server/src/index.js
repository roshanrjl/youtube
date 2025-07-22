import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import app  from "./app.js";
import { validateEnv } from "./utils/validateEnv.js";
import { COLORS } from "./constants.js";


dotenv.config({
  path: "./.env",
});


validateEnv();

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `${COLORS.green}[Server] [INFO]${COLORS.reset} Server is running at ${COLORS.red}http://localhost:${process.env.PORT}${COLORS.reset}`
      );
    });
  })
  .catch((error) => {
    console.log(`${COLORS.red}[Server] [ERROR]${COLORS.reset} Connection failed:`, error);
  });
