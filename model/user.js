var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        default: ''
    },
    email: {
        type: String,
        required: false,
        index: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    faceModel: {
        type: String,
        required: false
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = userSchema;
