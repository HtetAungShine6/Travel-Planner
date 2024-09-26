import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    fId : {
        type : String,
        required : true
    },
},
    {
    timestamps : true
    }
)

export const Users =  mongoose.models.User || mongoose.model('User', userSchema);

