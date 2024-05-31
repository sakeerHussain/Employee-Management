const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter, sendOTP } = require("../config/emailConfig");


function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6_digit_OTP
    const otpExpiration = Date.now() + 2 * 60 * 1000; //2minutes
    return { otp, otpExpiration };
}

// @desc Register/signUp a user
// @routes POST /api/user/register
//@access public

const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
       return res.status(400).json({message: "All fields are mandatory"});
    }

    // checking if the user is already registerd
    const userAvailable = await User.findOne({ email });    // Checking for pre registerd users
    if (userAvailable) {
    //    return res.render('signUp' , { alredyExists: "User already exists. Please choose a different email."});
    return res.status(400).json({message:"User already exists.Please choose a diffrent email."});
    } 
        // password hashing.........
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const { otp, otpExpiration } = generateOTP();

    // save OTP and Session
    req.session.signUpData = { username , email , password: hashedPassword , generateOTP: otp, otpExpiration };
    console.log("Genetated OTP:" , otp);
    console.log("Session data:",req.session.signUpData);

    // send oTP to the user
    sendOTP(email, otp);
    return res.redirect("/verifyOTP");
    
});


// @desc verify OTP
const verifyOTP = asyncHandler(async(req,res) =>{
    // req.session.signUpData = { username , email , password: hashedPassword , generateOTP: otp, otpExpiration };
    console.log("session data at verification:" , req.session.signUpData);

    if(!req.session.signUpData) {
         res.render("verifyOTP", { error: "Sign data not found. Please try again."});
    }

    const { otp } = req.body;
    const { username , email, password, generatedOTP, otpExpiration } = req.session.signUpData;

    if(Date.now() > otpExpiration){
        delete req.session.signUpData;
        console.log("problem2");
        return res.render('verifyOTP',{ otpMismatch: "OTP has expired. Please request a new one." });
    }

    if(otp === generatedOTP){
        //user verified, add the user into the database
        console.log("saved");
        const userdata = await User.create({
            username,
            email,
            password,
        });
        userdata.save();


        delete  req.session.signUpData;

        console.log(userdata);
        res.status(200).json({ message:"register successfully", redirect:'/login' });
    } else {
        return res.render('verifyOTP', {error:"Incorrect OTP.Please try again."});
    }
});




// @desc Login a user
// @routes POST /api/userd/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    try{

        const user = await User.findOne({ email });

        if (!user) {
                   return res.status(404).render("logIn",{emailNotFound: "User not found"});
                   }
                   const isPasswordMatch = await bcrypt.compare(password, user.password);
    
                   if(isPasswordMatch){
    
                    req.session.isAuth =true;
                    return res.redirect("/")
                   } else {
                    return res.status(400).render('logIn' , {wrongPassword: "Wrong password"});
                   }
    } catch(error){
        console.error(error);
        return res.send("Error during login")
    }
   


    // compare password with hashedpassword
    // if (user && (await bcrypt.compare(password, user.password))) {
    //     const accessToken = jwt.sign(
    //         {
    //             user: {
    //                 username: user.username,
    //                 email: user.email,
    //                 id: user.id
    //             },
    //         },
    //         process.env.ACCESS_TOKEN_SECERT,
    //         { expiresIn: "15m" }

    //     );
    //     res.status(200).json({ accessToken });
    // } else {
    //     res.status(401)
    //     throw new Error("Email or password is not valid");
    // }
});







// @desc  Get Current user info
// @routes GET /api/userd/current
//@access private

// const currentUser = asyncHandler(async (req, res) => {
//     res.json(req.user);
// });



module.exports = { signupUser, loginUser, verifyOTP }