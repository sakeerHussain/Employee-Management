// const express = require("express");
// const {
//      registreUser, 
//      loginUser, 
//      currentUser 
//     } = require("../controllers/userController");
// // const validationToken = require("../middleware/validateTokenHandler");


// const router = express.Router();

// // router.post ("/signup" , signupU);

// // router.post("/login" , loginUser );

// // router.get("/current" , validationToken, currentUser );
// router.route('/signUp').post( registreUser);
// router.route('/signUp').post( loginUser );

const express = require("express");
const router = express.Router();

const{ signupUser, loginUser, verifyOTP  } = require("../controllers/userController");

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/verifyOTP").post(verifyOTP);




module.exports = router;