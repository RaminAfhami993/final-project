const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const uploadAvatar = multer({ storage: storage });


router.post('/uploadAvatar', (req, res) => {
  const upload = uploadAvatar.single('avatar');

  upload(req, res, function(err) {
    if (err) return res.status(400).send('err');



    User.findByIdAndUpdate(req.session.user._id, {avatar: req.file.filename}, {new: true}, (err, user) => {
      if (err) return res.status(400).send('err 1');

      if (req.session.user.avatar) {
        fs.unlinkSync(`public/${req.session.user.avatar}`)
      };

      req.session.user.avatar = req.file.filename;
      
      res.json(user)
    })
  })
})



router.get('/dashboard', (req, res) => {
  res.render('./dashboard.ejs', {user: req.session.user})
});




module.exports = router;