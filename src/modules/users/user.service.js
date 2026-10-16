import userModel from "../../DB/models/user.model.js";
import * as dbservice from './../../DB/db.service.js';
import { Decrypt, Encrypt } from "../../commen/security/encrypt.js";
import {hashSync , compareSync} from 'bcrypt'
import { Compare, Hash } from "../../commen/security/hash.js";
import jwt from "jsonwebtoken"
import {OAuth2Client} from 'google-auth-library';
import joi from "joi"


const client = new OAuth2Client();

export const signUp = async (req, res, next) => {



//  const { fName, lName, email, password, age, gender , phone} = req.body;
//  // console.log(req.body);



//  const [user] = await dbservice.create({

//  model : userModel,
// data : { fName, lName, email, password :await Hash(password), age, gender, phone: Encrypt(phone) }
//  } );
 return res.status(201).json({ message: "Done" });
 }

export const signUpWithGmail = async (req, res, next) => {
 try {
 const { idToken } = req.body;

 const decoded = await client.verifyIdToken({
 idToken,
 audience: "829024305836-mgotutbr9g3hp8bsc611vj7jn09j5gg4.apps.googleusercontent.com",
 });

 const { family_name, given_name, picture, email_verified, email } = decoded.getPayload();

 let user = await userModel.findOne({ email: email.toLowerCase() });
 if (!user) {
 user = await userModel.create({
 fName: given_name,
 lName: family_name,
     email,
 profileImage: picture,
 isConfirmed: email_verified,
 provider: ProviderEnum.google
 });
 }

 if (user.provider == ProviderEnum.system) {
     return res.status(400).json({ message: "login with system only" });
}

const access_token = jwt.sign({ id: user._id, email: user.email }, "shahd123", {
 expiresIn: "1h"
 });

 const refresh_token = jwt.sign({ id: user._id, email: user.email }, "mahmoud123", {
expiresIn: "7d" });

return res.status(201).json({ message: "Done", tokens: { access_token, refresh_token } });
 } catch (error) {
 console.error(error);
return res.status(500).json({ message: "Internal Server Error", error: error.message });
 }
};


export const signin = async (req, res, next) => {

const {  email, password } = req.body;
const user = await dbservice .findOne({
model : userModel,
filter:{email: email.toLowerCase(), provider: ProviderEnum.system}
})
if (!user){
throw new Error ('email not exit' , {cause : 404})

}

 if (user?.provider !== "system"){
 throw new Error('please login with google :::::::::😑 ')

 }
if (!await Compare (password , user.password)){


throw new Error (' invalid password :::::::::😑')

}

const access_token = jwt.sign({ id: user._id ,email: user.email }, "shahd123" , {
 expiresIn: "1h",
audience: "http://localhost:4000",
 issuer: "http://localhost:3000",
//  notBefore: 30,
//  noTimestamp: true
})
const refresh_token = jwt.sign({ id: user._id , email: user.email}, "mahmoud123" , { expiresIn: "1h"})


return res.status(201).json({message:"Done" , tokens:{access_token , refresh_token}})




}

// export const getprofile = async (req, res, next) => {

//  const { token } = req.body;

// if(!token){
// return res.status(400).json({ message: "token not exist"})
//  }
// const decoded = jwt.verify(token , "shahd123")

// const user = await dbservice .findOne({
// model : userModel,
// filter:{email: decoded.email.toLowerCase() }
// })
// if (!user){
//  throw new Error ('email not exit' , {cause : 404})

// }

// if (user?.provider !== "system"){
//  throw new Error('please login with google :::::::::😑 ')

// }
// if (!await Compare (password , user.password)){


// throw new Error (' invalid password :::::::::😑')

// }
export const getprofile = async (req, res, next) => {
  return res.status(200).json({ message: "Done", user: req.user });
};


// return res.status(201).json({message:"Done" , })




