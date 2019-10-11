var User = require('../models/user.js');

module.exports.index  = function (req, res) {
    res.render('signup/index' , { title: 'FitneesWorkout' });
}

module.exports.submit  = function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var favoriteBook = req.body.favoriteBook;
    var password = req.body.password;
    var passsword2 = req.body.confirmPassword;

    //check fejl her
    if(name.length < 1){console.log('Fejl i navn')
    res.redirect('/signup');}

    else{
        var newUser = new User({
            name: name,
            email: email,
            password: password,
            favoritbook: favoriteBook,
        });
        User.createUser(newUser, function(err, user){
            if(err) throw err;
        });
        res.redirect('/login');
       
       
    }
}
