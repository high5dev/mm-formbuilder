import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

export const handleImageCompress = async (image) => {
    const file = image;
    const options = {
        maxSizeMB:0.08, 
    };
    try {
        const compressedImage = await imageCompression(file, options)
        return compressedImage
    } catch (error) {
        toast.error("Image Compression Failed")
        return image
    }
};
