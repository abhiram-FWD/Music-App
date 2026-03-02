import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        console.log("Configuring Cloudinary...");
        console.log("Cloud Name exists:", !!process.env.CLOUDINARY_CLOUD_NAME);
        console.log("API Key exists:", !!process.env.CLOUDINARY_API_KEY);
        console.log("API Secret exists:", !!process.env.CLOUDINARY_API_SECRET);

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Cloudinary Connected");
    } catch (error) {
        console.log("Cloudinary Connection Error:", error);
    }
}

export default connectCloudinary;
