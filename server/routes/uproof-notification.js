const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");

const {
    addUproofNoti,
    listUproofNoti,
    updateUproofNoti,
    getoneUproofNoti,
    dltUproofNoti
    
} = require("../controllers/uproofNotification");

 
 
 router.post("/add-uproof_noti",isAuthenticated, addUproofNoti);
 router.get("/list-uproof_noti", isAuthenticated,listUproofNoti);
 router.get("/getone-uproof_noti/:id", isAuthenticated,getoneUproofNoti);
 router.put("/update-uproof_noti/:id", isAuthenticated,updateUproofNoti);
 router.delete("/dlt-uproof_noti/:id", isAuthenticated,dltUproofNoti);



 

module.exports = router;

