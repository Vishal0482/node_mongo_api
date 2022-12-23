const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userModel = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            default: null
        },
        mobile: {
            type: Number,
            min: 9,
            max: 11,
            default: null
        },
        address: [
            {
                address_line: {
                    type: String,
                },
                city: {
                    type: String,
                },
                state: {
                    type: String,
                },
                country: {
                    type: String,
                },
                pincode: {
                    type: Number,
                    min: 5,
                    max: 7,
                }
            }
        ],
        pic: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    }
)

userModel.plugin(mongoosePaginate);
const User = mongoose.model("User", userModel);
// User.paginate().then({});
module.exports = User;