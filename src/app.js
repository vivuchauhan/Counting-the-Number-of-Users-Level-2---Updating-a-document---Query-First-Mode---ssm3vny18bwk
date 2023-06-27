const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users   =require("../models/user.js");

//Router Middlewares
app.use(express.json());

//Type of query (Hint)

/*

1. / --> this means we need to consider all users
2. /?name=swa --> Will return count of all the user name that have prefix swa. We will (Swaraj Jain, Swarak agrawal, etc). 
3. /?name= -->this means we need to consider all users

*/


// Complete this Route which will return the count of Number of Prefixmatch for the name in the query/

app.get("/",async function(req,res){
  try {
    const prefix = req.query.name || ''; // Get the prefix from the query input

    const regex = new RegExp('^' + prefix, 'i'); // Create a case-insensitive regular expression to match the prefix

    const count = await users.countDocuments({ name: regex }); // Count the documents in the users collection that match the prefix

    res.send(JSON.stringify(count));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
