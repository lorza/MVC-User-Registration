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
        User.findOne({"username": req.body.username}, function(err, user) {
            if (err) {
                console.log("there was an error some how idk");
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash("signupMessage", "That email has been taken."));
            } else {
                var newUser = new User();
                
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = newUser.generateHash(req.body.password);

                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    console.log("User successfully created");
                    console.log(newUser);
                    return done(null, newUser);
                });
            }
        });
    }
    ));

    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    function (req, email, password, done) {
        User.findOne({"email": email}, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, req.flash("loginMessage", "No user found"));
            }

            if (!user.validPassword(password)) {
                return done(null, false, req.flash("loginMessage", "Wrong password"));
            }

            return done(null, user);
        });
    }
    ))
    
}; // module export