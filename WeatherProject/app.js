const express = require('express');

const app = express();

const https = require('https');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, () => {
    console.log("Application is running on port 3000");
});

app.get("/", (req, res) => {
   res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){

    var city = req.body.cityName;
    const key = "e3c10542fa6864e052d29cf4718f4511";
    const unit = "metric";

    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",India&appid="+key+"&units="+unit;

    console.log(""+url);

    https.get(url, (response) => {
        

        response.on("data", (data) => {
            var whetherData = JSON.parse(data);
            var temp =  whetherData.main.temp;
            var desc = whetherData.weather[0].description;
           


            res.write("<h1> The temparature in "+city+" is "+temp+" degree celcius </h1> ");
            res.write("<h3> The Whether is currently "+desc+"</h3>");

            var iconCode = whetherData.weather[0].icon;

            var iconUrl = "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";

            res.write("<img src="+iconUrl+" alt='cloud.png'>");
           
           res.send();
        });

      
    });
});



//http://openweathermap.org/img/wn/10d@2x.png


 