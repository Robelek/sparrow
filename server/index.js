const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const {MongoClient} = require("mongodb")
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const e = require("express");
initializePassport(passport, async username=>
{
    return await databaseCheckUsername(username);
},
async id => {
    return await getUserById(id);
}
);

const url = "mongodb+srv://Khazitel:Michalekxd1@sparrowdb.ki2oens.mongodb.net/?retryWrites=true&w=majority"
const app = express();
let dev = true;
let rel ="";

function checkIfAuthenticated(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
async function databaseCheckUsername(username)
{
    let db = await MongoClient.connect(url);
    let dbo = await db.db();
    
    let result = await dbo.collection("users").findOne({
        "username": username
    });
    console.table(result);
    //console.log(result.length);
    return  result;
    
    
}
async function getUserById(id)
{
    let db = await MongoClient.connect(url);
    let dbo = await db.db();
    
    let result = await dbo.collection("users").findOne({
        "_id": id
    });
    console.table(result);
    return result;
    
}
async function addUser(username, password)
{
    let db = await MongoClient.connect(url);
    let dbo = await db.db();
    let data = {
        "username": username,
        "password": password
    }
    let result = await dbo.collection("users").insertOne(data, (err, res)=>
    {
        if(err) throw err;
        console.log("inserted user");
        db.close();
    })
    
}

if(dev)
{
    rel=express.static(path.join(__dirname, "../client/public"));
}
else
{
    rel=express.static(path.join(__dirname, "../client/build"));
}

app.use(rel);
app.use(flash());
app.use(session(
    {
        secret: "69696",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.post("/registeruser", async (req, res)=>
{
   // console.log(`${req.body.login}, ${req.body.password}`);
    let username =  await req.body.username;
    let check = await databaseCheckUsername(username);
    console.log(`${check}, ${typeof check}`);
    if(check===null)
    {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        addUser(username, hashedPassword);
        res.redirect("/login");
    }
    else
    {
        console.log()
        console.log("username taken");
        res.redirect(`/register?message=${encodeURIComponent("Error: username already taken")}`);
       // res.json({success:false, message:"Username already exists"});
    }
    
})
/*
app.post("/auth", async(req, res)=>
{
    console.table(req.body);
    let username = req.body.login;
    let password = bcrypt(req.body.password, 10);
    let thisData = new userData(username, password);
    if(await databaseCheck(thisData))
    {
        //indexJS.userData = await thisData;
        thisUser = thisData;
        res.redirect("../dashboard");
    }
    else
    {
        res.redirect("back");
    }

})
*/
app.post("/loginuser", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: `/login`,
    failureFlash: true
})
)

app.get("/getuser", async (req, res)=>
{
    console.log(`GETUSER User is ${await req.user}`);
    if(req.user==null)
    {
        res.send(null);
    }
    else
    {
        res.json(req.user);
     //  res.json({username: "Jack", password: "XD"});
    }
   
})
app.get("/login", checkIfAuthenticated, (req, res)=>
{
    console.log(req.session);
    console.log(req.user);
    res.redirect("/dashboard");
});
app.get("/", checkIfAuthenticated, (req, res)=>
{
    console.log(req.session);
    console.log(req.user);
    res.redirect("/dashboard");
})
app.get("/errormessage", (req, res)=>
{
    res.send(`User name: ${req.user.name} ${messages.error}`);
   //res.send("kurwatest");
    
} 
)
app.get("/logout", (req, res)=>
{
    req.logOut((err)=>
    {
        if(err) throw err;
    });
    res.redirect("/login");
})

app.get("*", checkIfAuthenticated);
app.get("*", (req, res)=>
{
    //console.log(`The name ${req.user.name}`);

    res.sendFile(express.static(path.join(__dirname, "../client/public","index.html")));
    

})


app.listen( process.env.PORT || 3001);