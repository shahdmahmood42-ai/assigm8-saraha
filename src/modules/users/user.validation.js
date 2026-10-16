import joi from 'joi'; 

 export const signUpSchema = {
    body: joi.object( 
    {
      fName:joi.string().alphanum().min(2).max(10).required(), 
      lName:joi.string().required(),
      email:joi.string().email().required(),
      password:joi.string().required(),
      age: joi.number().required(),
      date : joi.date().less( "now")
      
    }
).required() ,
  

 }

  export const signInSchema = {
    body: joi.object( 
    {
      email:joi.string().email().required(),
      password:joi.string().required()
     
      
    }
).required() ,
  

 }