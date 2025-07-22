import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localfilepath) => {
  const response = await cloudinary.uploader
    .upload(localfilepath, {
      resource_type: "auto",
    })
        if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }
    return response
    .catch((error) => {
      fs.unlinkSync(localfilepath); //remove the temporary uploaded file as the operation got failed
      return null;
    });
};

export { uploadOnCloudinary };
