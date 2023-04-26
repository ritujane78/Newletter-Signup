const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    let data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields :{
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/6cd0d2d7a4"
    const options = {
        method: "POST",
        auth: "ritu101:6160e75bba7e91d86e1795c86362182f-us17"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/failure.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(data.toString());
            console.log("errors = "+ data.errors);
        })
    })
    app.post("/failure",function(req,res){
        res.redirect("/");
    })
    request.write(jsonData);
    request.end();

    console.log(firstName+lastName+email);
})
app.listen(process.env.PORT || 3000, function(){
    console.log("Server running at port 3000");
})










// API key
//6160e75bba7e91d86e1795c86362182f-us17

//ID
//6cd0d2d7a4