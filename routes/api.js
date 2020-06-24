const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userRouter = require('./user')


const checkSession = function(req, res, next) {
    if (!req.session.user) return res.redirect('/api/signin')

    next();
};


router.use('/user', checkSession, userRouter);
router.use('/article', checkSession, userRouter);
router.use('/comment', checkSession, userRouter);





const isLogin = function(req, res, next) {
    if (req.session.user) return res.redirect('/api/dashboard')

    next();
};

router.get("/signin",isLogin, function (req, res) {
    res.render('./signin.ejs', {
        message: 'Please insert your information to signin.',
        color: 'primary'
    })
});

router.get("/signup",isLogin, function (req, res) {
    res.render('./signup.ejs', {
        message: 'Please insert your information to signup.',
        color: 'primary'
    })
});

router.post("/signin",isLogin, async function (req, res) {
    try {
        if (!req.body.userName || !req.body.password) {
            throw new Error('You have an empty input.')
        };

        const blogger = await User.findOne({
            userName: req.body.userName,
            password: req.body.password
        });

        if (!blogger) {
            throw new Error(`user does not exist.`)
        };

        // if (!blogger) {
        //     throw new Error(`${req.body.userName} user does not exist.`)
        // }

        // if (blogger.password !== req.body.password) {
        //     throw new Error(`The password is incorrect.`)
        // }

        req.session.user = blogger;

        // (
        //     res.cookie("user_sid", "asdfasdfasdfasdf");
        //     session ---> save
        // )

        res.redirect('/api/user/dashboard')
    } catch (error) {
        res.render('./signin.ejs', {
            message: error.message,
            color: 'danger'
        })
    }
});

router.post("/signup",isLogin, async function (req, res) {
    try {
        if (!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.sex || !req.body.mobile) {
            throw new Error('You have an empty input.')
        };

        if (req.body.password.length < 8 || req.body.password.length > 30) {
            throw new Error(`pass len`);
        };

        const blogger = await User.findOne({
            userName: req.body.userName.trim().toLowerCase()
        })

        if (blogger) {
            throw new Error(`${req.body.userName} already exist.`)
        }

        const newBlogger = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            sex: req.body.sex,
            mobile: req.body.mobile
        });

        await newBlogger.save();

        res.render('./signup.ejs', {
            message: 'Signup was successfully.',
            color: 'success'
        })
    } catch (error) {
        res.render('./signup.ejs', {
            message: error.message,
            color: 'danger'
        })
    }
});













module.exports = router;