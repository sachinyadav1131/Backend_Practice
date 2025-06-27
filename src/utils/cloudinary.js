import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();


// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "chai-app", // Optional: keeps uploads organized
    });

    // ✅ Delete file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("✅ File uploaded to Cloudinary:", response.url);
    return response;

  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message || error);
    
    // Safely delete file even if upload fails
    try {
      fs.unlinkSync(localFilePath);
    } catch (fsError) {
      console.warn("⚠️ Failed to delete temp file:", fsError.message);
    }

    return null;
  }
 
};

export { uploadOnCloudinary };
