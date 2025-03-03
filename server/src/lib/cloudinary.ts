import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: "dnqet3vq1",
  api_key: "241141791476868",
  api_secret: "vkvZYuioJ-8u-LZOWHyUwbz46HM",
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

