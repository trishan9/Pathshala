import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: "dvrm0w6ox",
  api_key: "231233948562838",
  api_secret: "8Amhu7ykQ7lZE31QkwVl9_vVfww",
});

const uploadToCloudinary = async (
  localFilePath: string,
): Promise<UploadApiResponse | Error> => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    return err as Error;
  }
};

export default uploadToCloudinary;

