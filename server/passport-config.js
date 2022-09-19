const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUser, getUserById)
{
    async function authenticateUser(username, password, done)
    {
        const user = await getUser(username);
        if(user==null)
        {
            console.log("no such user");
            return done(null, false, {message:"No such user"});
        }
      //  console.log(user);
       // console.log(password, user.password);
        if(await bcrypt.compare(password, user.password))
        {
            console.log("user found", user);
            return done(null, user)
        }
        else
        {
            console.log("Incorrect passwrod");
            return done(null, false, {message: "Incorrect password"});
        }
    }
    passport.use(new localStrategy({usernameField:"username"}, authenticateUser));

    passport.serializeUser((user, done)=> {
        console.log(`User serialized ${user.username}`);
        done(null, user._id) })
    passport.deserializeUser((id, done)=> { 
      //  console.log(`User deserialized ${user}`);
        done(null, getUserById(id));
    })
}
module.exports = initialize