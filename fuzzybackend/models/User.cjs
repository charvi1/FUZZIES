
// // Hash password before saving the user
// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uuid:{ type: String,
        default: uuidv4, // Automatically assign UUID when a new user is created
        unique: true},
    cart:{
        type:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product'
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }
        ],
        default:[]
    }
});

// Remove the password hashing logic
// Comment out or delete the pre-save hook

module.exports = mongoose.model('User', UserSchema);
