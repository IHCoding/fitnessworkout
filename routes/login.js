var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
const CtrlUsers = require('../controllers/login');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy({
    usernameField: 'email'
  },
    async function(username, password, done) {
      console.log('user creds ' , username,password);
      
      await User.findOne({ email: username }, function(err, user){
          console.log('user was ' , user);
          if (err) { return done(err); }
              if (!user) {
              return done(null, false, {
              message: 'Incorrect username.'
              });}  

              User.comparePassword(password, user.password, function(err, isMatch){
                console.log(password, User.password);
                  if(err) throw err;
                  if(isMatch){
                      return done(null, user);
                  } else {
                      return done(null, false, {message: 'Wrong password'})
                  }
              })
                
              
        }
        
        )
/*         console.log(password, User.password, user.password);
         */
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

/* GET home page. */
router.get('/', CtrlUsers.index);

//router.post('/submit',passport.authenticate('local'), CtrlUsers.submit);

router.post('/', (req, res, next) => passport.authenticate('local', { successRedirect: '/program', failureRedirect: '/login', })(req, res, next));

router.post('/logout',
  function(req, res) {
    req.logout(),
    res.redirect('/');
  })

module.exports = router;
