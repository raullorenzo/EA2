var mongoose = require('mongoose');
var User = mongoose.model('Usuario');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');


module.exports = function(passport)
{
    passport.serializeUser(function(user, done) {done(null, user);});

   passport.deserializeUser(function(obj, done) {done(null, obj);});

    passport.use(new FacebookStrategy(
        {
            clientID: configAuth.facebookAuth.id,
            clientSecret: configAuth.facebookAuth.secret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields : configAuth.facebookAuth.profileFields
        },
        function(accessToken, refreshToken, profile, done)
        {

            User.findOne({provider_id: profile.id}, function(err, user){
                if(err) throw(err);
                if(!err && user!= null) return done(null, user);
                var user = new User(
                    {
                        nombre: profile.name.givenName,
                        apellidos: profile.name.familyName,
                        login: (profile.id +'@facebook'),
                        urlfoto: profile.photos[0].value,
                        provider_id:profile.id
                    });

                user.save(function(err)
                {
                    if(err) throw err;
                    done(null, user);
                });
            });
        }));

};
