var User = require("./models/User");
var axios = require("axios");

module.exports = function(app, passport) {
    app.get("/", function (req, res) {
        res.render("index", {
            user: req.user
        })
    });
    
    app.get("/login", function (req, res) {
        res.render("login", {message: req.flash("loginMessage")});
    });

    app.get("/register", function (req, res) {
        res.render("register", {message: req.flash("signupMessage")});
    });

    app.get("/profile", isLoggedIn, function(req, res) {
        res.render("profile", {
            user: req.user, 
        })
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // ADMIN
    app.get("/admin", isAdmin, function (req, res) {

        res.render("admin/admin.dashboard.ejs", {
            user: req.user,
        });
    });
            app.get("/admin/customers", isAdmin, function (req, res) {
                
                var userCollection;
                
                User.find({}, function(err, users) {
                    if (err) {
                        return err;
                    }
                    
                    console.log(users);
                    res.render("admin/admin.customers.ejs", {
                        user: req.user, 
                        users: users,
                    })
                });
                
                // res.render("admin/admin.customers.ejs", {
                //     user: req.user,
                // })
            });
    // =============

    // STATS
    app.get("/stats/users", function (req, res) {
        User.find({}, function(err, users) {
            res.send(users);
        })
    })

    // ================================================================
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/login", 
        failureRedirect: "/register",
        failureFlash: true, 
    }))

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    }

    function isAdmin(req, res, next) {
        
        if (typeof req.user == "undefined") {
            return res.redirect("/");
        }

        if (req.user.admin == true) {
            return next();
        }
        return res.send("You don't have permissions to view this page");
        // redirect("/");
    }
};