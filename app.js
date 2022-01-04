const mainElement = document.querySelector('main')
const content = document.querySelector('.content')
const images = [...document.querySelectorAll('.img')]

images.forEach((image, idx) => {
    image.style.backgroundImage = `url(${idx + 1}.jpg)`
    image.addEventListener('click', () => {
        image.classList.toggle('active')
    })
})

//measure content translate pixel amount 
let current = 0

//current slide number
let slide = 0

//set app height to be window.innerheight because vh works differently on mobile devices 
const doc = document.documentElement; 
const appHeight = () => {
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    current = -slide * window.innerHeight; 
    content.style.transform = `translateX(${current}px)`
}

window.addEventListener('resize', appHeight); 
appHeight(); 


mainElement.addEventListener('touchstart', startTouch, {passive: false} )
mainElement.addEventListener('touchend', endTouch, {passive: false})
mainElement.addEventListener('touchmove', moveTouch, {passive: false}) 

mainElement.addEventListener('mousedown', startMouseDown, {passive: false})
mainElement.addEventListener('mouseup', startMouseUp, {passive: false})
mainElement.addEventListener('wheel', wheelfun), {passive: false}



//mouse grab/ mouse wheel/ track pads 
let canSwipe = true;



function wheelfun(e){
    
    // console.log(e.deltaX)
   
    if(canSwipe){
        //swipe Up
        
        if(e.deltaY > 30 && current !== -(window.innerHeight * 6)){
            canSwipe = false
            current -= window.innerHeight
            slide++
            content.style.transform = `translateY(${current}px)`
            setTimeout(() =>{
                canSwipe = true
            }, 1000)
        }


       //swipe down
        if(e.deltaY < -30 && current !== 0){
            canSwipe = false
            current += window.innerHeight
            slide--
            content.style.transform = `translateY(${current}px)`
            setTimeout(() =>{
                canSwipe = true
            }, 1000)
        }
    }
}


let initialStart = 0; 
let initialEnd = 0; 

let initialY = 0; 
let endY = 0;


function startMouseDown(e){
    initialStart = Date.now()

    initialY = e.clientY
}

function startMouseUp(e){
    initialEnd = Date.now()
    endY = e.clientY
    if(initialEnd - initialStart < 800){
        swipe()
    }
}


//touch screen 
function startTouch(e){
    initialStart = Date.now()
    initialY = e.touches[0].clientY
}

function endTouch(e){
    initialEnd = Date.now()
    endY = e.changedTouches[0].clientY
    if(initialEnd - initialStart < 800){
        swipe()
    }
}
function swipe() {
    //drag up / swipe up
    if(endY - initialY < -30) {
        if(current != -(window.innerHeight * 6)) {
            current -= window.innerHeight
            slide++
        }
        
    }else if(endY - initialY > 30){
        if(current !== 0){
            current += window.innerHeight
            slide--
        }
    }
    content.style.transform = `translateY(${current}px)`
}


function moveTouch(e){
    e.preventDefault()
}

