import mongoose from "mongoose";

const UserSchema =  new mongoose.Schema({
    username :{type:String, required: true},
    email: {type : String, required: true},
    authentication: {
        password: {type: String, required: true , select : false},
        salt: {type: String, required: false},
        sessionToken :{type: String, required: false}
    }
});

export const UserModel = mongoose.model("User",UserSchema)

export const getAllUser = () => UserModel.find();
export const getUserFromEmail= (email : string) => UserModel.findOne({email});
export const getUserFromSession = (sessionToken : string ) => UserModel.find({
    'authentication.sessionToken': sessionToken,
})

export const createUser = (values: Record<string,any>) => new UserModel(values).save().then((user)=> user.toObject())
export const deleteUserFromEmail = (email : string) => UserModel.findOneAndDelete({email: email})
export const updateUserFromEmail = (id:string, values: Record<string,any>) => UserModel.findByIdAndUpdate(id, values)