const app = require("express")();
const PORT = 8080;
const passport = require("passport")
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID = "97152140315-65okp828fk5eqveet6ncnd17rrdngeci.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return cb(JSON.stringify(profile));
    //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   });
    }
  )
);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.send(req.user)
    res.redirect('/');
  });

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
