import jwt from "jsonwebtoken";
import { findOne } from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js";
// import Headers from './../../../node_modules/node-fetch/src/headers';
// import { hashSync } from 'bcrypt';

export const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (! authorization ) {
            return res.status(400).json({ message: "token not exist" });
        }

        const decoded = jwt.verify(authorization , "shahd123");
        if (!decoded?.id){
 throw new Error("Invalid token", { cause: 400 });
        }
        const user = await findOne({
            model: userModel,
            filter: { _id: decoded.id }
        });

        if (!user) {
            throw new Error("user not exist", { cause: 400 });
        }
        req.user = user;
       return next();
    } catch (error) {
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired, please login again" })
  }
  if (error.name === "JsonWebTokenError" || error.name === "NotBeforeError") {
    return res.status(401).json({ message: "Invalid token" })
  }
  return res.status(error.cause || 500).json({
    message: "Catch error",
    error: error.message
  })
}
};