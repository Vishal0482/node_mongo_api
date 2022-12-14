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
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        pic: {
            type: String,
        }
    },
    {
        timestamp: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

const User = mongoose.model("User", userModel);
module.exports = User;