let heroInterval;
window.onload=()=>{
  let heroDiv =1;
  const heroArray = Array.from(document.querySelectorAll('#hero-scroll-container > div'));
  heroInterval = setInterval(() => {
    if(heroDiv<heroArray.length){
      heroArray[heroDiv].style.zIndex=heroDiv;
      heroArray[heroDiv-1].classList.add('prevVisibileDiv');
      heroArray[heroDiv].classList.add('visibleDiv');
      heroDiv++;
    }else{
      heroArray.map((e)=>{
        e.classList.remove('visibleDiv');
        e.classList.remove('prevVisibileDiv');
      })
      heroDiv = 1;
    }
  }, 6000);
  window.onscroll=()=>{
  if(document.querySelector('.siteGlimpse').children.div1.getBoundingClientRect().top<window.innerHeight-100){
    Array.from(document.querySelector('.siteGlimpse').children).map((e)=>e.classList.add('ontoViewDiv'));
  };
}
}
window.onabort=()=>{
  clearInterval(heroInterval)
}

