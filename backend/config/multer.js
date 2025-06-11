import multer from 'multer';

// Multer storage in memory (for Cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
