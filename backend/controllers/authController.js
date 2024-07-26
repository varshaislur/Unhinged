import Users from "../models/UserModel.js";
import { compareString,createJWT,hashString } from "../utils/index.js";
import { sendVerification } from "../utils/sendEmail.js";


export const register = async (req,res,next)=>{
    const {firstName, lastName, email, password} =req.body

    if(!(firstName || lastName || email || password)){
        next("Provide Required Fields");
        return
    }


    try{
        const userExist=await Users.findOne({email});
        if(userExist){
            next("Email already exists");
            return;

        }
        const hashedPassword = await hashString(password);

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          });

        //send email verification to user
        sendVerification(user, res);
        
    }catch(e){
        console.log(e);
        res.status(404).json({message: e.message});

    }

}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      //validation
      if (!email || !password) {
        next("Please Provide User Credentials");
        return;
      }
  
      // find user by email
      const user = await Users.findOne({ email }).select("+password").populate({
        path: "friends",
        select: "firstName lastName location profileUrl -password",
      });
  
      if (!user) {
        next("Invalid email or password");
        return;
      }
  
      if (!user?.verified) {
        next(
          "User email is not verified. Check your email account and verify your email"
        );
        return;
      }
  
      // compare password
      const isMatch = await compareString(password, user?.password);
  
      if (!isMatch) {
        next("Invalid email or password");
        return;
      }
  
      user.password = undefined;
  
      const token = createJWT(user?._id);
  
      res.status(201).json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };
