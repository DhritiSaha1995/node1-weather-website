console.log("Client side JavaScript file is loaded successfully.")




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1= document.querySelector('#msg-1')
const msg2= document.querySelector('#msg-2')
const $findLocationButton = document.querySelector('#find-loc')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;
    msg1.textContent = "Please wait while I load."
    msg2.textContent = ""
    console.log(location)
    fetch('/weather?address=' +location).then((response)=>{
        
  
     response.json().then((data)=>{
         console.log(data)
        
      
        if(data.error){
            // console.log(data.errror)
            msg1.textContent = data.error
        }
        else{
            // console.log(data.forecast);
            // console.log(data.location)
            msg1.textContent= data.forecast
            msg2.textContent=data.location
        }
     })
})
  
})
$findLocationButton.addEventListener('click', ()=>{

    if(!navigator.geolocation){
        alert('Your browser does not support geolocation')
    }
    
    $findLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
    
    const params = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    console.log(params.latitude)
    console.log(params.longitude)
     
    axios.get('/weather', params).then((response)=>{
        console.log(response)
    }).catch((e)=>{
        console.log('The error is ' +e)
    })

      
       
       })
      
    
           
            $findLocationButton.removeAttribute('disabled')
        })
