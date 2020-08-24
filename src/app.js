
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const port = process.env.PORT || 4000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(__dirname);

// Define paths for express config
const DirectoryName= path.join(__dirname, '../public');
const viewPath = path.join(__dirname, 'templates/views');
const partialPath = path.join(__dirname , 'templates/partials')


// Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


// Setting static directory
app.use(express.static(DirectoryName))


//Send back Html data and send json data
 
app.get('', (req, res) => {

    res.render('index', {
        title : "My Weather App",
        name : "Dhriti Saha",
        salary : "25000",
        people: [
            {name : "Avik Katz"},
            {name :"Alan Johnson"},
            {name : "Charles Jolley"}
          ]
    });

})

app.get('/help', (req, res) => {
    res.render('help', { title:'Help Page!', name: "Dhriti"})
   // res.send({name: "avilk"})
   //console.log(req)

})

app.get('/about', (req, res) => {
    // res.send('This is about our page!')
    //res.send('<head><title>HTML Elements Reference</title></head><body><h1>Hello Dhriti, I love you.</h1></body>')
res.render('about', {
    title: "About me",
    name: "Dhriti",
    image  : './img/IMG-20200510-WA0001.jpg'

})
})

app.get('/weather', (req, res) => {

    //res.send('This displays current weather!')
    // res.send([{
    //     name: 'Dhriti',
    //     age: 56
    // }, {
    //     name: 'Avik'
    // } ])
    console.log(req.query);
    if(!req.query.address){
        return res.send({
            error: "Must provide location."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: "Must provide location."
            })
        }
        
        forecast(latitude, longitude, (error, data) => {
          if(error){
            return res.send({
                error: "Must provide a valid location."
            })
          }
          res.send({
            forecast: data, location,
            
            address: req.query.address
        })
       
     })
  
     
         
     })
  
})

app.get('/products', (req, res) =>{
    console.log(req.query)
    if(!req.query.search){
       return res.send({
            error: "Must provide a search term"
        })
    }
    res.send({
        product:[]
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        error: "Help article not found",
        name: "Dhriti"
    })
})
app.get('*', (req, res)=>{
    res.render( '404',{
        error: "page not found",
        name:"Dhriti"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
});