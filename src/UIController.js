import Storage from "./Storage.js";
import getMainDisplayAs from "./MainDisplay.js";
import getEditorAs from "./Editor.js";
import makeCardFor from "./CardMaker.js";
import FormManager from "./EditorFormManager.js";
import { format } from "date-fns";

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
    });
  },

  handleAddTaskOrProjectOption(callbackFn) {
    //passing in a function to this method
    const taskOrProjectOption = document.querySelector(
      ".task-create-new-options"
    );
    taskOrProjectOption.addEventListener("click", (e) => {
      const textValue = e.target.textContent;
      callbackFn(textValue);
    });
  },

  handleSortByButton() {
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

  handleClickTaskorProject() {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".card") && !e.target.closest(".project-item")) {
        return;
      }

      //Get element, see if it's a card or project
      const ele = e.target.closest(".card")
        ? e.target.closest(".card")
        : e.target.closest(".project-item");

      //Getting card title or project title
      let title;
      ele.classList.value === "card"
        ? (title = ele.querySelector(".card-title").textContent)
        : (title = ele.querySelector(".project-title").textContent);

      //Check if task or project
      const capturedObj = Storage.getItem(title);
      if (!capturedObj._isProject) {
        FormManager.updateTaskEditorForm(capturedObj);
      } else {
        FormManager.updateProjectEditorForm(capturedObj);
      }
    });
  },

  //when to use?
  showAllTasks() {
    const mainDisplay = document.querySelector("#main-display");
    mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";

    if (!localStorage.length) {
      //handle no tasks or projects
    }
    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskCard = makeCardFor("cardContainer", taskObj);
      cardContainer.insertAdjacentHTML("beforeend", taskCard);
    }
  },

  showTodayTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    if (!localStorage.length) {
      //handle main display as well as project display
      const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("noTodays");

      const projectContainer = document.querySelector(".project-container");
      projectContainer.innerHTML = `
      <div class="message-wrapper">
        <div class="message">
          No projects found.
        </div>
      </div>
      `;

      const editor = document.querySelector('#editor');
      editor.innerHTML = getEditorAs("default");
      
      return;
    }

    const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector(".card-container");
      cardContainer.innerHTML = "";
    const editor = document.querySelector("#editor");
      editor.innerHTML = getEditorAs("default");

    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskCreateDate = taskObj._createDate;
      const taskDueDate = taskObj._dueDate;
      const taskIsComplete = taskObj._isComplete;

      if (
        (taskCreateDate === today ||
          taskDueDate === today ||
          (taskDueDate < today && !taskIsComplete) ||
          (taskDueDate > today && !taskIsComplete)) &&
        !taskObj._isProject
      ) {
        const taskCard = makeCardFor("cardContainer", taskObj);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
    }
  },

  showUpcomingTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("upcomingTasks");
    const cardContainer = document.querySelector(".card-container");
      cardContainer.innerHTML = "";
    const editor = document.querySelector("#editor");
      editor.innerHTML = getEditorAs("default");

    for (let i = 0; i < localStorage.length; i++) {
      let taskObj = Storage.getItem(Storage.getKey(i));
      const taskDueDate = taskObj._dueDate;
      const taskCreateDate = taskObj._createDate;

      if (
        (taskCreateDate === today ||
          taskDueDate > today ||
          taskDueDate === today) &&
        !taskObj._isProject
      ) {
        const taskCard = makeCardFor("cardContainer", taskObj);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      }
    }

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noUpcoming");
    }
  },

  //Work on this
  showAllProjects() {
    if (!localStorage.length) {
      return;
    }

    const projectContainer = document.querySelector(".project-container");
    projectContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let project = Storage.getItem(Storage.getKey(i));

      if (project && project._isProject) {
        const projectCard = makeCardFor("projectContainer", project);
        projectContainer.insertAdjacentHTML("beforeend", projectCard);
      }
    }
  },

  //Work on this
  sortAllProjects(sortOption) {
    //lowToHi, highToLow, dateCreated, dateDue
    const projectContainer = document.querySelector(".project-container");
    projectContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      let project = Storage.getItem(Storage.getKey(i));

      if (project && project._isProject) {
      }
    }
  },
};

export default Controller;
