const createElements = async (arrayList)=>{
  const resultArray = await Promise.all(
    arrayList.map((e)=>{
    const img = document.createElement('img');
    img.setAttribute('src', e.mainImg);
    const p = document.createElement('p');
    p.innerText=e.category;
    p.appendChild(img);
    const h3 = document.createElement('h3');
    h3.innerText = e.name;
    const link = document.createElement('a');
    link.setAttribute('href','./project.html?q='+e.id);
    link.appendChild(p);
    link.appendChild(h3);
    return link;
  }))
  return resultArray
}

let tempProjectList;
let displayedProject;
window.onload = async ()=>{
  const projectsList = await fetch('./../data/projects.json').then((e)=>e.json());
  const paramValue = (new URLSearchParams(window.location.search)).get('q');
  const projectsDisplay = document.querySelector('.projects-display');
  const loadMoreButton = document.querySelector('button.loadMore');
  
  if(!paramValue){
    tempProjectList = projectsList;
    displayedProject = projectsList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
  }else{
    Array.from(document.querySelector('.projects .projects-nav').children).filter((e)=>e.dataset.name===paramValue)[0].click();
    tempProjectList = projectsList.filter((e)=>e.category===paramValue);
    displayedProject = tempProjectList.slice(0,6);
  }
  loadMoreButton.innerText = tempProjectList > displayedProject?'Load More':'Loaded';



  Array.from(document.querySelectorAll('.projects .projects-nav label')).forEach((e)=>{
    e.onclick = ()=>{
      
      console.log(e.firstElementChild.checked)
    }
  })
  createElements(displayedProject).then((e)=>e.map((e)=>projectsDisplay.appendChild(e)));



}