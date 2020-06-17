const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get('/signup', (req, res) => {
    res.render('pages/signup', {err: null});
});


router.post('/signup', async (req, res) => {
    try {
        if (!req.body.userName || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.sex || !req.body.mobile) {
            return res.render('pages/signup', {err: 'Empty fields!'});
        };
    
        //TODO
        // password length
    
        // username unique
    
        // check sex value
    
        let newUser = new User({
            userName: req.body.userName.trim(),
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            password: req.body.password,
            sex: req.body.sex,
            mobile: req.body.mobile
        });
    
        await newUser.save();

        res.render('pages/login');
    } catch (err) {
        return res.render('pages/signup', {err: 'Something bad happened'});
    };
});


module.exports = router;