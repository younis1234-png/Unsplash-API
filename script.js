// loading animation https://loading.io/
const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray =[]
let ready = false
let imagesLoaded= 0
let totalImages = 0
let initialLoad = true

// Unsplash API
const count = 5
const apiKey = '2B_2odkQWguX4jlREHYAYUzi1JNra4A_r217sa1N0Ls'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`


// Check if all images we loaded
function imageLoaded(){
// console.log(imageLoaded) this is show the number of our images which is 30
imagesLoaded++;
console.log(imagesLoaded)
if(imagesLoaded === totalImages){
    ready = true
    // when the ready = true we want to hid our loader
    loader.hidden = true
    console.log("ready", ready)

    count = 30
}
}

// Helper Function to Set Attribuates on DOM Elements
function setAttributes(element, attributes){
    // assign th key const(key = href/alt/title/src). attributes is gonna contain the key and the value we want to set
    for(const key in attributes){
        // element is <a> or <img> 
        element.setAttribute(key, attributes[key])
    }
}




// Create Element for links & photos, and add to DOM
function displayPhotos(){
    // we want to set our imagesLoaded to 0 evertime we want to run this function
    imagesLoaded= 0
    totalImages = photosArray.length
    console.log("total images", totalImages)

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
        // Create <a> to link to unsplash
        const item = document.createElement("a")
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
    
        // create <img> for photo
        const img = document.createElement("img")
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener("load", imageLoaded)

        // put <img> inside the <a>, then put both inside imageContainer Element
        item.appendChild(img)
        // and put all(both img anf item) that into our imageContainer 
        imageContainer.appendChild(item)
    })
}



// Get photos from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        // console loging ot photo array 
        // console.log(photosArray)
        displayPhotos()

    }catch(error){

    }
}

// Check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", () =>{
    if(window.innerHeight = window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false
        getPhotos()
    }
})
// on load
getPhotos()