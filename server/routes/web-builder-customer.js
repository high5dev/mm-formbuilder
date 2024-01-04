const router = require("express").Router();
const { create, getCustomerCollect, saveCustomerDataset, uploadImage, getWaitingClients, confirmCustomer } = require("../controllers/webBuilderCustomer");
const { singleUploadControl, singleUploadToServerControl } = require("../middleware/upload");
const isAuthenticated = require("../middleware/auth");

router.post(`/create`, isAuthenticated, create);
router.get('/get/:id', isAuthenticated, getCustomerCollect);
router.post('/save', isAuthenticated, saveCustomerDataset);
router.post('/uploadImage', isAuthenticated, singleUploadControl, uploadImage)
router.get('/waitingClients/get/:id', isAuthenticated, getWaitingClients);
router.post('/confirm/:id', isAuthenticated, confirmCustomer);

module.exports = router;