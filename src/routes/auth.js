const express = require("express")
const router = express.Router();
const {loginController,registerController} = require("../controller/authController")




router.post("/register" , loginController)

router.post("/login" , registerController)

module.exports = router;