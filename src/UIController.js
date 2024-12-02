import Storage from "./Storage.js";
import getMainDisplayAs from "./MainDisplay.js";
import getEditorAs from "./Editor.js";
import makeCardFor from "./CardMaker.js";
import FormManager from "./FormManager.js";
import { format, getDay } from "date-fns";

function getDaysFromMilliSeconds (milliseconds) {
  let seconds = milliseconds / 1000;
  let days = seconds / 86400; //86400 seconds in a day
  return days
}

const Controller = {
  initialize() {
    //for main display, project container, editor, main-title-date-wrapper
    const editor = document.querySelector("#editor");
    editor.innerHTML = getEditorAs("default");

    this.showTodayTasks();
    this.showAllProjects();
    this.handleSearchBarInput();

    this.handleTaskButtons();
    this.handleProjectSortByButton();
    this.handleClickTaskorProject();
  },

  //Handle Searches
  handleSearchBarInput() {
    const searchBar = document.querySelector('#search-bar');
    searchBar.addEventListener('input', (e)=>{
      let query = e.target.value;
      this.handleSearchquery(query);
    });
  },

  handleSearchquery(query) {
    if (!query) {
      this.showTodayTasks();
      return;
    }
    const mainDisplay = document.querySelector('#main-display');
      mainDisplay.innerHTML = getMainDisplayAs("searchTasksProjects");
    
    query = query.trim().toLowerCase();

    let matchedItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      let object = Storage.getItem(Storage.getKey(i));

      if (object.title.trim().toLowerCase().includes(query)) {
        matchedItems.push(object);
      }
    };

    if (!matchedItems.length) {
      const mainDisplay = document.querySelector('#main-display');
        mainDisplay.innerHTML = getMainDisplayAs("noSearchResults");
      return;
    };

    const cardContainer = document.querySelector('.card-container');
      cardContainer.innerHTML = "";

    for (const match of matchedItems) {
      const card = makeCardFor("cardContainer", match);
        cardContainer.insertAdjacentHTML("beforeend", card)
    };
  },

  handleTaskButtons() {
    const taskButtons = document.querySelector(".task-btn-container");
    taskButtons.addEventListener("click", (e) => {
      const targetClassList = e.target.classList.value;

      //handle add new task/project button
      if (targetClassList === "tasks-add-new") {
        const createOptions = document.querySelector(
          ".task-create-new-options"
        );
        createOptions.classList.toggle("hidden");

        //handle differentiate task or project
        //Pass in a Function (Arrow Fn) into this method
        //The function is called inside this method with variable param
        //The variable is processed inside arrow function
        this.handleTaskProjectDropdown((textValue) => {
          const editor = document.querySelector("#editor");

          if (textValue === "Add New Task") {
            createOptions.classList.add("hidden");
            editor.innerHTML = getEditorAs("addNewTask");
            FormManager
          } else if (textValue === "Add New Project") {
            createOptions.classList.add("hidden");
            editor.innerHTML = getEditorAs("addNewProject");
            FormManager
          }
        });
        return;
      }

      //handle upcoming tasks button
      if (targetClassList === "tasks-upcoming") {
        this.showUpcomingTasks();
        return;
      }

      //handle today's tasks button
      if (targetClassList === "tasks-today") {
        this.showTodayTasks();
        return;
      }

      //handle past projects/tasks button
      if (targetClassList === "tasks-past") {
        this.showPastTasksorProjects();
        return;
      }
    });
  },

  handleTaskProjectDropdown(callbackFn) { //passing in a callback into this method
    const taskOrProjectOption = document.querySelector(
      ".task-create-new-options"
    );
    taskOrProjectOption.addEventListener("click", (e) => {
      const textValue = e.target.textContent;
      callbackFn(textValue); //call it here
    });
  },

  handleClickTaskorProject() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".card") && !e.target.closest(".project-item")) {
        return;
      }

      //Get element, see if it's a card or project
      const ele = e.target.closest(".card")? 
        e.target.closest(".card"): 
        e.target.closest(".project-item");

      //Getting card title or project title
      let title;
      ele.classList.value === "card"? 
        (title = ele.querySelector(".card-title").textContent): 
        (title = ele.querySelector(".project-title").textContent);

      //Check if task or project in Storage, then give it to Form Manager
      const object = Storage.getItem(title);
      if (!object.isProject) {
        FormManager.updateTaskEditorForm(object);
      } else {
        FormManager.updateProjectEditorForm(object);
      }
    });
  },

  showTodayTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    //handle if there is tasks
    const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector(".card-container");
      cardContainer.innerHTML = "";
    const editor = document.querySelector("#editor");
      editor.innerHTML = getEditorAs("default");

    //Sort all tasks using Chaining Array Methods
    let allObjects = Object.keys(localStorage)
      .map((key)=>Storage.getItem(key))
      .sort((objectA, objectB)=> new Date(objectA.dueDate) - new Date(objectB.dueDate));

    allObjects
      .filter((object) =>
        (!object.isComplete && !object.isProject) && 
        (getDaysFromMilliSeconds(new Date(object.dueDate) - new Date(today)) < 8) 
      )
      .forEach((object) => {
        const taskCard = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      });
    //

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noTodays");
    };
  },

  showUpcomingTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("upcomingTasks");
    const cardContainer = document.querySelector(".card-container");
      cardContainer.innerHTML = "";
    const editor = document.querySelector("#editor");
      editor.innerHTML = getEditorAs("default");

    //Sort all upcomings using Chaining Array Methods
    let allObjects = Object.keys(localStorage)
      .map((key)=>Storage.getItem(key))
      .sort((objectA, objectB)=> new Date(objectA.dueDate) - new Date(objectB.dueDate));

    allObjects
      .filter((object) =>
        (object.dueDate > today) &&
        (!object.isComplete && !object.isProject)
      )
      .forEach((object) => {
        const taskCard = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      });
    //

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noUpcoming");
    }
  },


  showPastTasksorProjects() {
    const mainDisplay = document.querySelector('#main-display');
      mainDisplay.innerHTML = getMainDisplayAs("pastTasksProjects");
    const cardContainer = document.querySelector('.card-container');
    
    //Sort using Chaining Array Methods
    let allObjects = Object.keys(localStorage)
      .map((key)=>Storage.getItem(key))
      .sort((objectA, objectB)=> new Date(objectA.dueDate) - new Date(objectB.dueDate));

    allObjects
      .filter((object) =>
        object.isComplete
      )
      .forEach((object) => {
        const projectCard = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", projectCard);
      });
    //

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noPastTasksProjects");
    };
  },

  showAllProjects() {
    const noProjectsFound = `
    <div class="message-wrapper">
      <div class="message">No Projects Found.</div>
    </div>
    `;

    if (!localStorage.length) {
      const projectContainer = document.querySelector('.project-container');
      projectContainer.innerHTML = noProjectsFound;
      return;
    }

    const projectContainer = document.querySelector(".project-container");
      projectContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let project = Storage.getItem(Storage.getKey(i));

      if (project && project.isProject) {
        const projectCard = makeCardFor("projectContainer", project);
        projectContainer.insertAdjacentHTML("beforeend", projectCard);
      }
    }

    if (!projectContainer.innerHTML) {
      projectContainer.innerHTML = noProjectsFound;
      return;
    }
  },

  handleProjectSortByButton() {
    const sortByButton = document.querySelector(".sort-by-button");
    const sortOptions = document.querySelector(".sort-options");

    sortByButton.addEventListener("click", () => {
      sortOptions.classList.toggle("hidden");
    });

    sortOptions.addEventListener("click", (e) => {
      let targetText = e.target.textContent;

      if (targetText === "Lowest Priority to Highest Priority") {
      }
      if (targetText === "Highest Priority to Lowest Priority") {
      }
      if (targetText === "Date Created") {
      }
      if (targetText === "Date Due") {
      }
    });
  },

  //Work on this
  sortAllProjects(sortOption) {
    //lowToHi, highToLow, dateCreated, dateDue
    const projectContainer = document.querySelector(".project-container");
    projectContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let project = Storage.getItem(Storage.getKey(i));

      if (project && project.isProject) {
      }
    }
  },

};

export default Controller;
