let timer;
let deletee;




async  function start(){
try{
    
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
const data = await response.json();
createBrealist(data.message)
}
catch (e){
    console.log("problem occured");


}
}

start();

function createBrealist(breadList){
  

    // Object.keys() will return you the keys in the form of a array
// map method runs a callback fucntion to all the elements of the array 
// and returns a array with the result of the callback function to all the elements of array


// join method combines all the elements of array seperated by comma and returns a string 
    document.getElementById("breed").innerHTML= `
    <select  onchange="loadByBreed(this.value)" >

    <option> choose the dog breed</option>
${Object.keys(breadList).map((breed) => {
    return `<option> ${breed} </option>`
}).join('')};
</select>
`
} 

async function loadByBreed(breed){
    if(breed != "choose the dog breed"){
const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
const data = await response.json();
creatSlideshow(data.message);

    }
}

function creatSlideshow(images){
    let currentposition=0;
    clearInterval(timer);
    clearTimeout(deletee);
    if(images.length > 1){
        document.getElementById("slideshow").innerHTML=
    ` <div class="slide" style="background-image:url('${images[0]}')" > </div>
    <div class="slide" style="background-image:url('${images[1]}')" > </div>`
    }
    else{
        document.getElementById("slideshow").innerHTML=
    ` <div class="slide" style="background-image:url('${images[0]}')" > </div>
    <div class="slide"> </div>`
    }
currentposition += 2;
if( images.length == 2) currentposition=0;
timer =setInterval(nextSlide , 3000);

function nextSlide(){
  document.getElementById("slideshow").insertAdjacentHTML("beforeend" , `<div class="slide" style="background-image:url('${images[currentposition]}')" > </div>`)  
 deletee= setTimeout(() => {
      document.querySelector(".slide").remove();
  }  ,1000)

  if(currentposition + 1 >= images.length){
      currentposition=0;

  }
  else{
currentposition++;
  }

}

}


