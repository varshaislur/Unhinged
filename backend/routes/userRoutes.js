import express from "express"
import path from "path"
import { acceptRequest, changePassword, friendRequest, getFriendRequest, getUser, profileViews, requestPasswordReset, resetPassword, suggestedFriends, updateUser, verifyEmail } from "../controllers/userController.js";
import { resetPasswordLink } from "../utils/sendEmail.js";
import userAuth from "../middleware/authMiddleware.js";

const router= express.Router();
const __dirname=path.resolve(path.dirname(""));

//verify email
router.get("/verify/:userId/:token",verifyEmail);

//reset password
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

//user routes
router.post("/get-user/:id?",userAuth,getUser);
router.put("/update-user",userAuth,updateUser);

//friend request
router.post("/friend-request",userAuth, friendRequest);
router.post("/get-friend-request",userAuth,getFriendRequest)

//accept or deny friend request
router.post("/accept-request",userAuth,acceptRequest)

//view profile
router.post("/profile-view", userAuth, profileViews);

//suggested friends
router.post("/suggested-friends",userAuth,suggestedFriends  )


//verify email send file
router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
  });


//reset password send file
  router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "resetPassword.html"));
  });

  export default router;
