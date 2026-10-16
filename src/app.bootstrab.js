import express from "express"
import ConnectionDB from "./DB/connectionDB.js"
import userRouter from "./modules/users/user.controller.js"
import cors from "cors"
const app = express()
const port = 3000

const bootstrab = async( ) => {
  app.use(cors({origin:"*"}))
    app.use(express.json())

  await ConnectionDB()
app.get("/", (req , res) => res.status(200).json({mass:"welcom saraha 😊"}))

app.use("/users" , userRouter)


app.use("{/*demo}" , (req , res , next)=>{
         throw new Error (`Url:${req.originalUrl} With Method:${req.method} Not Found ` , {cause: 404})
})


app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.cause || 500).json({ message: err.err , stack: err.stack });
});


app.listen(port , () => console.log (`example app ${port}`))




}
export default  bootstrab