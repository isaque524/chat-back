const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlenght: 3, maxlenght: 30},
    email: {type: String, required: true, minlenght: 3, maxlenght: 250, unique: true},
    password: {type: String, required: true, minlenght: 3, maxlenght: 3000,}
},{
    timestamps:true,
}
);

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel