const projectsDisplay = document.querySelector('.projects-display');
const navButtons = Array.from(document.querySelectorAll('.projects .projects-nav label'));
const loadMoreButton = document.querySelector('button.loadMore');
const paramValue = (new URLSearchParams(window.location.search)).get('q');
let tempProjectList;
let displayedProject;

// function to create elements that will be displayed as projects as we use static html site 
const createElements = async (arrayList)=>{
  const resultArray = await Promise.all(
    arrayList.map((e)=>{
    const img = document.createElement('img');
    img.setAttribute('src', e.mainImg);
    const span = document.createElement('span');
    span.innerText = e.category;
    const p = document.createElement('p');
    p.appendChild(img);
    p.appendChild(span)
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

// function to change  nav butons focus when clicked 
const navButtonClick = (ButtonsList,currentButton)=>{
  ButtonsList.map((e)=>e.classList.remove('active'));
  currentButton.classList.add('active');
}




window.onload = async ()=>{
  const projectsList = await fetch('./../data/projects.json').then((e)=>e.json());
  //decide projects that will be displayed during the initial load based on search param
  if(!paramValue){
    tempProjectList = projectsList;
    displayedProject = projectsList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
  }else{
    tempProjectList = projectsList.filter((e)=>e.category===paramValue);
    displayedProject = tempProjectList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
  }

  loadMoreButton.innerText = tempProjectList > displayedProject?'Load More':'Loaded';



//function to create and append projects in initial load
  createElements(displayedProject).then((e)=>e.map((e)=>{
    e.classList.add('fadeIn');
    projectsDisplay.appendChild(e)}));

// function to change projects display when nav clicked 
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
          Array.from(projectsDisplay.children).map((e)=>e.classList.remove('fadeIn'));
          setTimeout(()=>{
            while(projectsDisplay.firstElementChild){projectsDisplay.removeChild(projectsDisplay.firstElementChild)};
            createElements(displayedProject).then((e)=>e.map((e)=>{projectsDisplay.appendChild(e)}));
          },500);
          setTimeout(()=>Array.from(projectsDisplay.children).map((e)=>e.classList.add('fadeIn')),530);
        }else{
          navButtonClick(navButtons,e);
          tempProjectList = projectsList.filter((el)=>el.category===e.dataset.name);
          displayedProject = tempProjectList.sort((a,b)=>{return b.id - a.id}).slice(0,6);
          Array.from(projectsDisplay.children).map((e)=>e.classList.remove('fadeIn'));
          setTimeout(()=>{
            while(projectsDisplay.firstElementChild){projectsDisplay.removeChild(projectsDisplay.firstElementChild)}
            createElements(displayedProject).then((e)=>e.map((e)=>projectsDisplay.appendChild(e)));
          },500);
          setTimeout(()=>Array.from(projectsDisplay.children).map((e)=>e.classList.add('fadeIn')),530);
        }
      }
    }
  })
}
