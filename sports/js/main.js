let slideIndex = 1;
let slideDisabled = false;
showSlides(slideIndex);

function plusSlides() {
    if(!slideDisabled){
      setSlideAnimUp();
      showSlides(slideIndex += 1);
    }
}

function minusSlides() {
  if(!slideDisabled){
    setSlideAnimDown();
    showSlides(slideIndex -= 1);
    }
  }

function currentSlide(n) {
  if(!slideDisabled && n!=(slideIndex)){
    if (slideIndex>n){
      setSlideAnimDown();
    }
    else{
      setSlideAnimUp();
    }
    showSlides(slideIndex = n);
  }
}

function showSlides(n) {
  if(!slideDisabled){
    slideDisabled = true;
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    slides[slideIndex-1].style.display = "inline-block";
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex-1].className += " active";
    setTimeout(function() {
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[slideIndex-1].style.display = "inline-block";
      } 
      slideDisabled = false;
    }, 750);
  }
  else{
    setTimeout(function() {
    slideDisabled = false;
  }, 1500);}
}

function setSlideAnimUp() {
    let slides = document.getElementsByClassName("slide");
    for (i=0; i < slides.length; i++){
      slides[i].style.animationDuration = "0.75s"; 
      if (i!=slideIndex-1){
        slides[i].style.animationName = "scrollInUp";
      }
      else
      {
        slides[i].style.animationName = "scrollOutUp";
      }
    }
}

function setSlideAnimDown() {
    let slides = document.getElementsByClassName("slide");
    for (i=0; i < slides.length; i++){
      slides[i].style.animationDuration = "0.75s"; 
      if (i!=slideIndex-1){
        slides[i].style.animationName = "scrollInDown";
      }
      else
      {
        slides[i].style.animationName = "scrollOutDown";
      }
    }

}

function keepThingsCentered(){
  //sorry
  let dotsPadding = 20;
  let slideshow = document.getElementsByClassName("slideshow");
  let slides = document.getElementsByClassName("slide"); 
  let dot = document.getElementById("dots");
  let container = document.getElementById("slideshow-container");
  let height = slides[slideIndex-1].clientHeight;
  slideshow[0].style.height = height + "px";
  container.style.height = (height + dotsPadding)+"px";
  dot.style.paddingTop = (height)+"px";
  requestAnimationFrame(keepThingsCentered);
}

keepThingsCentered();

