import Storage from "./Storage.js";
import getMainDisplayAs from "./MainDisplay.js";
import getEditorAs from "./Editor.js";
import makeCardFor from "./CardMaker.js";
import FormManager from "./FormManager.js";
import { format } from "date-fns";

function getDaysFromMilliSeconds (milliseconds) {
  let seconds = milliseconds / 1000;
  let days = seconds / 86400; //86400 seconds in a day
  return days
}

const Controller = {
  initialize() {
    //for main display, project container, editor, main-title-date-wrapper
    
    //show today's tasks (main display)
    this.showTodayTasks();

    //show default editor
    const editor = document.querySelector("#editor");
    editor.innerHTML = getEditorAs("default");

    //show all projects
    this.showAllProjects();
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
        this.handleAddTaskOrProjectOption((textValue) => {
          const editor = document.querySelector("#editor");

          if (textValue === "Add New Task") {
            createOptions.classList.add("hidden");
            editor.innerHTML = getEditorAs("addNewTask");
          } else if (textValue === "Add New Project") {
            createOptions.classList.add("hidden");
            editor.innerHTML = getEditorAs("addNewProject");
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

  handleAddTaskOrProjectOption(callbackFn) {
    //passing in a function into this method
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

    //handle no tasks
    if (!localStorage.length) {
      const mainDisplay = document.querySelector("#main-display");
        mainDisplay.innerHTML = getMainDisplayAs("noTodays");
      const editor = document.querySelector('#editor');
        editor.innerHTML = getEditorAs("default");
      return;
    };

    //handle if there is tasks
    const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector(".card-container");
      cardContainer.innerHTML = "";
    const editor = document.querySelector("#editor");
      editor.innerHTML = getEditorAs("default");

    //Sort all tasks
    let allTasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      let task = Storage.getItem(Storage.getKey(i));
      allTasks.push(task);
    };
    allTasks = allTasks.sort((taskA, taskB) => {
      let dateA = new Date(taskA.dueDate);
      let dateB = new Date(taskB.dueDate);
      return dateA - dateB
    });

    for (const task of allTasks) {
      if (
        (!task.isProject && !task.isComplete) && 
        //Filters out tasks if it's more than 5 days ahead
        (getDaysFromMilliSeconds(new Date(task.dueDate) - new Date(today)) < 6)
      ) {
        const taskCard = makeCardFor("cardContainer", task);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
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

    // Sort upcoming tasks
    let allTasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      let task = Storage.getItem(Storage.getKey(i));
      allTasks.push(task);
    };
    allTasks = allTasks.sort((taskA, taskB) => {
      let dateA = new Date(taskA.dueDate);
      let dateB = new Date(taskB.dueDate);
      return dateA - dateB
    });

    for (const task of allTasks) {
      if (
        (task.createDate === today && task.dueDate > today) &&
        !task.isComplete && 
        !task.isProject
      ) {
        const taskCard = makeCardFor("cardContainer", task);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
    }

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noUpcoming");
    }
  },

  showPastTasksorProjects() {
    const mainDisplay = document.querySelector('#main-display');
      mainDisplay.innerHTML = getMainDisplayAs("pastTasksProjects");
    const cardContainer = document.querySelector('.card-container');
    
    let allObjects = [];
    for (let i = 0; i < localStorage.length; i++) {
      const object = Storage.getItem(Storage.getKey(i));
      allObjects.push(object);
    };

    allObjects = allObjects.sort((objA, objB) => {
      let dateA = new Date(objA.dueDate);
      let dateB = new Date(objB.dueDate);
      return dateB - dateA
    });

    for (const object of allObjects) {
      if (object.isComplete) {
        const card = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", card);
      };
    };

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noPastTasksProjects");
    };
  },

  //Work on this
  showAllProjects() {
    const noProjectsFound = `
    <div class="message-wrapper">
      <div class="message">No Projects Found.</div>
    </div>
    `
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
