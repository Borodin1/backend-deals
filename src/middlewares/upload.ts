import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "deals",
      format: "png",
      public_id: Date.now().toString(),
    };
  },
});

export const upload = multer({ storage });
