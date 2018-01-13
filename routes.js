module.exports = function(app, passport) {
    app.get("/", function (req, res) {
        res.render("index", {
            message: "hello world",
        })
    });
    
    app.get("/login", function (req, res) {
        res.render("login", {message: req.flash("loginMessage")});
    });
    app.get("/register", function (req, res) {
        res.render("register", {message: req.flash("signupMessage")});
    });

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

    function isAuth(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    }
};