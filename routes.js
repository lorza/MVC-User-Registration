module.exports = function(app, passport) {
    app.get("/", function (req, res) {
        res.render("index")
    });
    
    app.get("/login", function (req, res) {
        res.render("login", {message: req.flash("loginMessage")});
    });
    app.get("/register", function (req, res) {
        res.render("register", {message: req.flash("registerMessage")});
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/", 
        // failureRedirect: "/login",
        failureFlash: true, 
    }))

    function isAuth(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    }
};