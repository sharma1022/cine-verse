import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName, confirmPassword } = req.body;

    console.log(req.body); // Log the incoming request data

    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      return responseHandler.badrequest(res, "Passwords do not match");
    }

    const checkUser = await userModel.findOne({ username });
    console.log("Check user result:", checkUser); 

    if (checkUser) return responseHandler.badrequest(res, "Username already used");

    // Create a new user
    const user = new userModel({ username, displayName });
    user.setPassword(password); // Ensure password is hashed

    await user.save();

    const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: "24h" });

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id
    });
  } catch (error) {
    console.error("Error in signup:", error); // Log the error
    responseHandler.error(res, "Internal Server Error"); // Send generic error message for security
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select("username password salt id displayName");

    if (!user) return responseHandler.badrequest(res, "User does not exist");

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // Optionally clear sensitive data before sending the response
    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id
    });
  } catch (error) {
    console.error("Error in signin:", error); // Log the error
    responseHandler.error(res, "Internal Server Error"); // Send generic error message for security
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel.findById(req.user.id).select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword
};