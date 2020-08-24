console.log("Client side JavaScript file is loaded successfully.")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1= document.querySelector('#msg-1')
const msg2= document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;
    msg1.textContent = "Please wait while I load."
    msg2.textContent = ""

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