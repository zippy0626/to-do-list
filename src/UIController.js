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
    this.showAllTasks();
    
    //show default editor
    const editor = document.querySelector('#editor');
    editor.innerHTML = getEditorAs("default")

    //show all projects

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

  showAllTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

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

    const mainDisplay = document.querySelector('#main-display');
    mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = "";

    if (!localStorage.length) {
      //handle no tasks or projects
    }

    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskCreateDate = taskObj._createDate;
      const taskDueDate = taskObj._dueDate;

      if (
        taskCreateDate===date
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
    cardContainer.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      
      if (!taskObj._isComplete) {
        const taskCard = makeCardFor("cardContainer", taskObj);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
    };
  },

  showAllProjects() {
    const projectContainer = document.querySelector('.project-container');

  }
}

export default Controller;