const mongoose = require('mongoose');

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
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            default: null
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            default: null
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userModel);
module.exports = User;