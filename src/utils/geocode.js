const request= require("request");

const geocode = (address, callback)=>{
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiZGhyaXRpc2FoYSIsImEiOiJja2Rsc2NoMTcxMTBqMnNyb2Z2bnZrZHAyIn0.kE1xo4f_BPfg1ChixJR4ug"
    request({url: geoURL, json:true}, (error, response)=>{
       if(error){
          callback("Unable to connect")
       }
       else if(response.body.features.length === 0){
          callback("can't find search results")
       }
       else{
          callback(undefined, {
             latitude: response.body.features[0].center[0],
             longitude: response.body.features[0].center[1],
             location: response.body.features[0].place_name
 
          })
       }
    })
   
 }



 module.exports = geocode;