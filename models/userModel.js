const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);

userModel.addUser = (newUser, result) => {
    userModel.create(newUser, (err, user) => {
        if (err) {
            result('User could not be created', null);
            throw err;
        }
        result(null, user);
    });

}

userModel.getDetails = (user, result) => {
    userModel.findOne({
        _id: user._id
    }).then(account => {
        console.log(account);
        result(null, account);
    });
}

//userModel.getUser - (user)

module.exports = userModel;