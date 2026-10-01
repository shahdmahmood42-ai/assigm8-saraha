import userModel from "../../DB/models/user.model.js";
import * as dbservice from './../../DB/db.service.js';
import { Decrypt, Encrypt } from "../../commen/security/encrypt.js";
import {hashSync , compareSync} from 'bcrypt'
import { Compare, Hash } from "../../commen/security/hash.js";


export const signUp = async (req, res, next) => {
    
        const { fName, lName, email, password, age, gender , phone} = req.body;
        const emailExist = await userModel.findOne({ email: email.toLowerCase() });
        if (emailExist)
        {throw new Error ('email already exist')}
       
       
        const [user] = await dbservice.create({

              model : userModel,
           data : { fName, lName, email, password :await Hash(password), age, gender, phone: Encrypt(phone) }
        } );
        return res.status(201).json({ message: "Done", user });
    }




export const signin = async (req, res, next) => {
    
        const {  email, password } = req.body;
 const user = await dbservice .findOne({
     model : userModel,
   filter:{email: email.toLowerCase(), provider: "system"}
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
return res.status(201).json({message:"Done" ,user:{... user._doc , phone: Decrypt(user.phone)}})




}