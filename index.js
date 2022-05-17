const imageActive = document.querySelector(".active img");
const imageNext = document.querySelector(".next img");

const videoImg = document.querySelector(".modal-video img");


const images = [
    {id:0 , image:'images/angele-03.jpg'},
    {id:1 , image:'images/angele-10.jpg'},
    {id:2 , image:'images/angele-11.jpg'},
    {id:3 , image:'images/angele-12.jpg'}
];

window.addEventListener('load',()=>{
    setTimeout(()=>{
        document.querySelector('.before-loading').classList.add('inactive');
        document.querySelector('.main-body').classList.add('active');
    },500);
});


// To Populate the first images on page load
imageActive.src = images[0].image;
imageActive.dataset.id = images[0].id;

imageNext.src = images[1].image;
imageNext.dataset.id = images[1].id;

document.querySelector('.slides .bullet-btn').classList.add('selected');

document.querySelector('.next-btn').addEventListener('click',nextPhoto);

function nextPhoto(){    
    const obj = images.find(element=>(~~imageNext.dataset.id +1) == element.id);

    // bullets
    imageActive.src = imageNext.src;
    imageActive.dataset.id = imageNext.dataset.id;
    document.querySelectorAll('.slides .bullet-btn').forEach(function(bullet){
        bullet.classList.remove('selected');
        if(bullet.dataset.id === imageActive.dataset.id){
            bullet.classList.add('selected');
        };
    });


    if (imageActive.dataset.id == images.length - 1){
        imageNext.src = images[0].image;
        imageNext.dataset.id = images[0].id;  
    }
    else{
        imageNext.src = obj.image;
        imageNext.dataset.id = obj.id;
    }    
}

document.querySelector('.prev-btn').addEventListener('click',prevPhoto);

function prevPhoto(){

    imageNext.src = imageActive.src;
    imageNext.dataset.id = imageActive.dataset.id;  
    
    if (imageActive.dataset.id == 0){
        imageActive.src = images[images.length - 1].image;
        imageActive.dataset.id = images[images.length - 1].id;  
    }
    else{
        const obj = images.find(element=>(~~imageActive.dataset.id - 1) == element.id);
        imageActive.src = obj.image;
        imageActive.dataset.id = obj.id;
    } 

    // bullets
    document.querySelectorAll('.slides .bullet-btn').forEach(function(bullet){
        bullet.classList.remove('selected');
        if(bullet.dataset.id === imageActive.dataset.id){
            bullet.classList.add('selected');
        };
    });
        
}


// Sticky menu 
window.onscroll = function () {

    if (window.pageYOffset >= 90) {
        document.querySelector('.icon-menu').classList.add('sticky');
    } else {
        document.querySelector('.icon-menu').classList.remove('sticky');
    }
}

// menu-modal

document.querySelector('.icon-menu').addEventListener('click',()=>{
    document.querySelector('.icon-menu').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('body').classList.toggle('no-scroll');
});

// video-modal

document.querySelectorAll('.video').forEach(function(video){
    video.addEventListener('click',(event)=>{
        document.querySelector('.modal-video').classList.add('active');
        document.querySelector('body').classList.add('no-scroll');
        videoImg.src = event.currentTarget.dataset.imgSrc ;
    });
});



document.querySelector('.videos .modal-video .wrapper .close-btn').addEventListener('click',()=>{
    document.querySelector('.modal-video').classList.remove('active');
    document.querySelector('body').classList.remove('no-scroll');
});

// Sticky social media icons
document.querySelectorAll('.socials .icons .icon').forEach(function(item){
    item.addEventListener('mouseenter' , (event)=>{
        item.querySelector('svg').classList.add('active');
        item.querySelector('span').classList.add('active');
    });
    item.addEventListener('mouseleave' , (event)=>{
        item.querySelector('svg').classList.remove('active');
        item.querySelector('span').classList.remove('active');
    });
});


// Mobile Slider

imageActive.addEventListener("touchstart", startTouch);
imageActive.addEventListener("touchmove", moveTouch);

function startTouch(e) {
    this.initialX = e.touches[0].clientX;
    this.initialY = e.touches[0].clientY;
}

function moveTouch(e) {
    if (this.initialX === null) return;
    if (this.initialY === null) return;

    let currentX = e.touches[0].clientX,
        currentY = e.touches[0].clientY,
        diffX = this.initialX - currentX,
        diffY = this.initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        (diffX > 0) ? nextPhoto(): prevPhoto();
    }

    this.initialX = null;
    this.initialY = null;

    e.preventDefault();
}