const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/api", (req, res)=>
{
    res.json("Hello there!");
})

app.get("*", (req, res)=>
{
    res.sendFile(express.static(path.join(__dirname, "../client/public","index.html")));
})

app.listen(3001 || process.env.PORT);