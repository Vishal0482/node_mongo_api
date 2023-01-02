const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Joi = require('joi');
const { DIGIT_ONLY_REGEX, PICODE_REGEX } = require('../shared/constants');


const addressObj = Joi.object().keys({
    address_line: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    pincode: Joi.string().length(6).message("Pincode length must be 6 Digits long.").pattern(PICODE_REGEX).message("Invalid pincode."),
})

const userValidateSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    type: Joi.string(),
    name: Joi.string(),
    mobile: Joi.string().length(10).message("Mobile length must be 10 Digits long.").pattern(DIGIT_ONLY_REGEX).message("Mobile must be in Digits."),
    address: Joi.array().items(addressObj),
    pic: Joi.string()
});

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
module.exports = { User, userValidateSchema };