var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var uid = require("crypto-random-string");

var userSchema = mongoose.Schema({
    local: {
        username: String, 
        email: String, 
        password: String,
        uid: {
            type: String, 
            default: uid(30),
        },
        admin: {
            type: Boolean,
            default: false, 
        }
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);