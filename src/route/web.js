import express from "express";
import homeController from "../controller/homeController.js";

const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.get('/edit-user/:id', homeController.getEditUser);
    router.get('/upload-image', homeController.getUploadImage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.post('/edit-user', homeController.postEditUser);
    router.post('/upload-single-image', upload.single('profile_pic'), homeController.postUploadImage);
    return app.use('/', router);
}
export default initWebRouter;
