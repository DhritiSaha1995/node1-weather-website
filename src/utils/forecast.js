const request=require('request');

const forecast= (lat, long, callback)=>{
    var url = "http://api.weatherstack.com/current?access_key=32efbb37b23baf2730fb8673872dd8eb&query=" + lat + ","+long;
    console.log(url)
    request({url:url, json:true}, (error,response)=>{
        if(error){
                  callback("Unable to connect.");
               }
               else if(response.body.error){
                   
                 callback("Please specify correct input.")
               }
               else{
                      var temp = response.body.current.temperature;
                      var precip = response.body.current.precip;
                     
                      callback(undefined, response.body.current.weather_descriptions[0]+" . It is currently "+temp+" degrees out. There is a "+precip+"% chance of rain.");
            }
    
        })
    }


module.exports = forecast;