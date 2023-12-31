const UserModel = require("../models/user")
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken")

const createToken = (_id) =>{
    const jwtkey = process.env.SECRET;
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"})
     
};

const registerUser = async (req,res) =>{

    try{
   const {name, email, password} = req.body

   let user = await UserModel.findOne({email})

   if(user) return res.status(400).json("Já existe usuário com o e-mail fornecido...")

   if(!name || !email || !password) return res.status(400).json("Todos os campos são necessários...")

   if(!validator.isEmail(email))
   return res.status(400).json("O e-mail deve ser um e-mail válido...")

   if(!validator.isStrongPassword(password))
   return res.status(400).json("A senha deve conter uma letra maiuscula um caracter especial e um numero...")

   user = new UserModel({name, email, password})

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();

    const token = createToken(user._id)

    res.status(200).json({_id: user._id, name, email, token})
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};

const loginUser = async (req,res) =>{
    const {email, password} = req.body;

    try{
        let user = await UserModel.findOne({email})

        if(!user) return res.status(400).json("Email ou Senha invalidos")
      
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) return res.status(400).json("Email ou Senha invalidos");

        const token = createToken(user._id)

        res.status(200).json({_id: user._id, name: user.name, email, token})

    }catch(error){ 
        console.log(error)
        res.status(500).json(error)
    }
};

const findUser = async (req, res) =>{
    const userId = req.params.userId;
    try{
        const user = await UserModel.findById(userId)

        res.status(200).json(user)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    } 
};

const getUser = async (req, res) =>{
        
    try{
        const users = await UserModel.find();

        res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    } 
};

module.exports = {registerUser, loginUser, findUser, getUser};