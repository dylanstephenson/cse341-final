const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/welcome', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Welcome to the game store');
});
router.use('/games', require('./games'));
router.use('/consoles', require('./consoles'))
router.use('/accessories', require('./accessories'))
router.use('/merchandise', require('./merchandise'))

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {return next(err); }
    res.redirect('/');
  })
})

module.exports = router;