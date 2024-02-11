const projectsDisplay = document.querySelector('.projects-display');
const navButtons = Array.from(document.querySelectorAll('.projects .projects-nav label'));
const loadMoreButton = document.querySelector('button.loadMore');
const paramValue = (new URLSearchParams(window.location.search)).get('q');
let tempProjectList;
let displayedProject;


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

const navButtonClick = (ButtonsList,currentButton)=>{
  ButtonsList.map((e)=>e.classList.remove('active'));
  currentButton.classList.add('active');
}




window.onload = async ()=>{
  const projectsList = await fetch('./../data/projects.json').then((e)=>e.json());
  if(!paramValue){
    tempProjectList = projectsList;
    displayedProject = projectsList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
  }else{
    tempProjectList = projectsList.filter((e)=>e.category===paramValue);
    displayedProject = tempProjectList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
  }
  loadMoreButton.innerText = tempProjectList > displayedProject?'Load More':'Loaded';




  createElements(displayedProject).then((e)=>e.map((e)=>projectsDisplay.appendChild(e)));


  navButtons.forEach((e)=>{
    e.onclick = ()=>{
      if(e.classList.contains('active')){
        console.log('this button is clicked') ;
        return null;
      }else{
        if(e.dataset.name==='ALL'){
          navButtonClick(navButtons,e);
          tempProjectList = projectsList;
          displayedProject = projectsList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
          Array.from(projectsDisplay.children).map((e)=>e.classList.add('fadeAway'));
          while(projectsDisplay.firstElementChild){projectsDisplay.removeChild(projectsDisplay.firstElementChild)}
          createElements(displayedProject).then((e)=>e.map((e)=>projectsDisplay.appendChild(e)));
          console.log('All select');
        }else{
          navButtonClick(navButtons,e);
          tempProjectList = projectsList.filter((el)=>el.category===e.dataset.name);
          displayedProject = tempProjectList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
          Array.from(projectsDisplay.children).map((e)=>e.classList.add('fadeAway'));
          while(projectsDisplay.firstElementChild){projectsDisplay.removeChild(projectsDisplay.firstElementChild)}
          createElements(displayedProject).then((e)=>e.map((e)=>projectsDisplay.appendChild(e)));
          console.log(e.dataset.name+" "+'selected');
        }
      }
    }
  })
}
