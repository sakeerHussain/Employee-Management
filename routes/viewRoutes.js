const express =  require("express");
const router = express.Router();
// const app = express();



router.get('/home', (req,res) =>{
    res.render('pages/index' , {title: "Home"});
});

router.get("/viewDetails", (req, res) =>{
    res.render('pages/viewDetails');
});

router.get("/signUp", (req, res) =>{
    res.render('pages/signUp');
});
router.get("/logIn", (req, res) =>{
    res.render('pages/logIn');
});

router.get("/verifyOTP", (req, res) =>{
    res.render('pages/verifyOTP');
})
// router.get("/logIn" , (req, res) =>{
//      res.render('pages/logIn);
//});

// router.get("/verify-otp", (req,res) =>{
//     res.render("pages/verifyotp");
// });

module.exports = router;