const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const userRoute = require("./routes/useRoutes")

const app = express();
require("dotenv").config()

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);

app.get("/", (req, res) => {
    res.send("API do chat on")
})



const port = process.env.PORT || 5000;

app.listen(port, (req,res) =>{
    console.log(`Server running on port...:  ${port}`);
});
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS 

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@chat-app.jtbczn1.mongodb.net/`).then(()=>{
    app.listen(3000)
    console.log("conectou ao banco!")
}).catch((err) => console.log(err))