// creation of a const to store multer
const multer = require('multer');

// all the extensions that we handle
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const originalName = file.originalname;
        // get the file extension
        const extension = originalName.split('.').pop();
        if (extension === MIME_TYPES[file.mimetype]) {
            // remove extension from file name
            const filename = originalName.replace(`.${extension}`, '');
            callback(null, filename + "-" + Date.now() + '.' + extension);
        }
    }
});

module.exports = multer({ storage: storage }).single('image');