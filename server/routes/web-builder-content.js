const router = require("express").Router();
const { create, getContentCollect, getContentCollectByCol, saveContentCollect, uploadImage, confirmCustomer, getImageUrls } = require("../controllers/webBuilderContent");
const { singleUploadControl, singleUploadToServerControl } = require("../middleware/upload");
const isAuthenticated = require("../middleware/auth");

router.post(`/create`, isAuthenticated, create);
router.get('/get/:id', isAuthenticated, getContentCollect);
router.get('/getImages/:id', isAuthenticated, getImageUrls);
router.post('/getByCol', isAuthenticated, getContentCollectByCol);
router.post('/save/:id', isAuthenticated, saveContentCollect);
router.post('/uploadImage/:id', isAuthenticated, singleUploadControl, uploadImage);
router.post('/confirm/:id', isAuthenticated, confirmCustomer);

module.exports = router;