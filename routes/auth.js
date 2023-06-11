const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const { register, login, changePassword} = require('../controllers/users');
const auth = require('../middleware/auth');
const validation = require('../middleware/validate');

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/api-docs');
});

router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/api-docs");
  });
});

router.post('/register', validation.emailValidation, validation.passwordValidation, register);
router.post('/login', validation.emailValidation, validation.passwordValidation, login);
router.put('/changePassword', auth, validation.passwordValidation, changePassword);

module.exports = router;
