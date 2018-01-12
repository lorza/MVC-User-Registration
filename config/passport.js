var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/User");

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            done(err, user);
        })
    });

    // SIGNUP
    passport.use("local-signup", new LocalStrategy({
        passReqToCallback: true,
    },
    function (req, username, password, done) {
        User.findOne({"username": username}, function(err, user) {
            if (err) {
                console.log("there was an error some how idk");
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash("signupMessage", "That email is taken.. peak times"));
            } else {
                var newUser = new User();
                
                newUser.local.username = username;
                newUser.local.email = req.params.email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err) {
                        console.log("peak there was an error");
                        throw err;
                    }

                    console.log("User successfully created");
                    console.log(newUser);
                    return done(null, newUser);
                })
            }
        });
    }
    ));
};