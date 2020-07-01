const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 30,
        minlength: 3,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 8
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['blogger', 'admin'],
        default: 'blogger'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    avatar: {
        type: String
    }
});

// UserShema.pre('findOneAndUpdate', function(next) {
    // if (this._update.avatar) {
    //     User.findById({_id: this._update._id}, (err, user) => {
    //         if (err) next(err);

    //         fs.remove(`public/${user.avatar}`);
    //         next()
    //     })
    // }
// });

module.exports = mongoose.model('User', UserShema);
