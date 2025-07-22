
import { ApiError } from "./ApiError.js";
const requiredEnvVars = [
  "PORT",
  "MONGODB_URI",
  "CROS_ORIGIN",               
  "ACCESS_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRES",      
  "REFRESH_TOKEN_SECRET",
  "REFRESH_TOKEN_EXPIRES",     
  "CLOUD_NAME",              
  "CLOUD_API_KEY",             
  "CLOUD_API_SECRET",          
];


const validateEnv = () => {
  const unsetEnvVars = requiredEnvVars.filter(
    (envVar) => !(envVar in process.env)
  );

  if (unsetEnvVars.length > 0) {
    throw new ApiError(
      500,
      `The following environment variables are not set: ${unsetEnvVars.join(
        ", "
      )}`
    );
  }
};

export { validateEnv };
