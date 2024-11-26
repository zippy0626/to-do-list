import Storage from "./Storage.js";
import getMainDisplayAs from "./MainDisplay.js";
import getEditorAs from "./Editor.js";
import makeCardFor from "./CardMaker.js";
import { format } from "date-fns";

const Controller = {
  initialize() {
    //locations to load stuff
    //main display, project container, editor, related tasks container, main-title-date-wrapper
    const relatedTasksContainer = document.querySelector('.group-related-tasks-wrapper');

    //show today's tasks
    this.showTodayTasks();
    
    //show default editor
    const editor = document.querySelector('#editor');
    editor.innerHTML = getEditorAs("default")

    //show all projects
    this.showAllProjects();
  },

  handleTaskButtons() {
    const taskButtons = document.querySelector('.task-btn-container');
    taskButtons.addEventListener('click', (e) => {
      const targetClassList = e.target.classList.value;
      
      //handle add new task/project


      //handle upcoming tasks button
      if (targetClassList==="tasks-upcoming") {
        this.showUpcomingTasks();
        return;
      }

      //handle today's tasks button
      if (targetClassList==="tasks-today") {
        this.showTodayTasks();
        return;
      }

      //handle past projects/tasks button

    });
  },

  handleSortByButton() {
    const sortByButton = document.querySelector('.sort-by-button');
    const sortOptions = document.querySelector('.sort-options');
    
    sortByButton.addEventListener('click', () => {
      sortOptions.classList.toggle("hidden")
    });

    sortOptions.addEventListener('click', (e)=>{
      let targetText = e.target.textContent;
      
      if (targetText==="Lowest Priority to Highest Priority") {
        
      }
      if (targetText==="Highest Priority to Lowest Priority") {
        
      }
      if (targetText==="Date Created") {
        
      }
      if (targetText==="Date Due") {
        
      }
    });
  },

  //when to use?
  showAllTasks() {
    const mainDisplay = document.querySelector('#main-display');
    mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = "";

    if (!localStorage.length) {
      //handle no tasks or projects
    }
    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskCard = makeCardFor("cardContainer", taskObj);
      cardContainer.insertAdjacentHTML("beforeend", taskCard);
    };
  },

  showTodayTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    if (!localStorage.length) {
      const mainDisplay = document.querySelector('#main-display');
      mainDisplay.innerHTML = getMainDisplayAs("noTodays");
      return;
    }

    const mainDisplay = document.querySelector('#main-display');
      mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector('.card-container');
      cardContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskCreateDate = taskObj._createDate;
      const taskDueDate = taskObj._dueDate;
      const taskIsComplete = taskObj._isComplete;

      if (
        taskCreateDate===today || 
        taskDueDate===today || 
        (taskDueDate < today && !taskIsComplete) ||
        (taskDueDate > today && !taskIsComplete)
      ) {
        const taskCard = makeCardFor("cardContainer", taskObj);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
    };
  },

  showUpcomingTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    const mainDisplay = document.querySelector('#main-display');
    mainDisplay.innerHTML = getMainDisplayAs("upcomingTasks");
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskDueDate = taskObj._dueDate;
      const taskCreateDate = taskObj._createDate;
      
      if (
        taskCreateDate === today ||
        taskDueDate > today || 
        taskDueDate === today
      ) {
        const taskCard = makeCardFor("cardContainer", taskObj);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
    };

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noUpcoming")
    }
  },

  showAllProjects() {
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let project = Storage.getItem(Storage.getKey(i));

      if (project && project._isProject) {
        const projectCard = makeCardFor("projectContainer", project);
        projectContainer.insertAdjacentHTML("beforeend", projectCard);
      };
    };
  },

  sortAllProjects(sortOption) {
    //lowToHi, highToLow, dateCreated, dateDue
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let project = Storage.getItem(Storage.getKey(i));

      if (project && project._isProject) {
        
      };
    };
  }
}

export default Controller;