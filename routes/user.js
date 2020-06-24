const express = require('express');
const router = express.Router();
const User = require('../models/user');




router.get('/dashboard', (req, res) => {
    res.render('./dashboard.ejs', {user: req.session.user})
});





module.exports = router;