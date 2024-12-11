import Storage from "./Storage.js";
import getMainDisplayAs from "./MainDisplay.js";
import getEditorAs from "./Editor.js";
import makeCardFor from "./CardMaker.js";
import FormManager from "./FormManager.js";
import { format } from "date-fns";

function getDaysFromMilliSeconds(milliseconds) {
  let seconds = milliseconds / 1000;
  let days = seconds / 86400; //86400 seconds in a day
  return days;
}

const Controller = {
  initialize() {
    //for main display, project container, editor, main-title-date-wrapper
    const editor = document.querySelector("#editor");
    editor.innerHTML = getEditorAs("default");

    this.showTodayTasks();
    this.showAllProjects();

    //event listeners
    this.handleSearchBarInput();
    this.handleMenuTaskButtons();
    this.handleProjectSortByButton();
    this.handleClickATaskorProject();
    this.handleEditorFormButtons();
    this.handleModalButtons();
  },

  //Handle Searches
  handleSearchBarInput() {
    const searchBar = document.querySelector("#search-bar");
    searchBar.addEventListener("input", (e) => {
      let query = e.target.value;
      this.handleSearchquery(query);
    });
  },

  handleSearchquery(query) {
    if (!query) {
      this.showTodayTasks();
      return;
    }
    const mainDisplay = document.querySelector("#main-display");
    mainDisplay.innerHTML = getMainDisplayAs("searchTasksProjects");

    query = query.trim().toLowerCase();

    let matchedItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      let object = Storage.getItem(Storage.getKey(i));

      if (object.title.trim().toLowerCase().includes(query)) {
        matchedItems.push(object);
      }
    }

    if (!matchedItems.length) {
      const mainDisplay = document.querySelector("#main-display");
      mainDisplay.innerHTML = getMainDisplayAs("noSearchResults");
      return;
    }

    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";

    for (const match of matchedItems) {
      const card = makeCardFor("cardContainer", match);
      cardContainer.insertAdjacentHTML("beforeend", card);
    }
  },

  handleMenuTaskButtons() {
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
        //this callback fn is called inside handleTaskProjectDropdown
        this.handleTaskProjectDropdown((textValue) => {
          const editor = document.querySelector("#editor");
          if (textValue === "Add New Task") {
            createOptions.classList.add("hidden");
            editor.innerHTML = getEditorAs("addNewTask");
            return;
          }
          if (textValue === "Add New Project") {
            createOptions.classList.add("hidden");
            editor.innerHTML = getEditorAs("addNewProject");
            return;
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

  handleTaskProjectDropdown(callbackFn) {
    const taskOrProjectOption = document.querySelector(
      ".task-create-new-options"
    );
    taskOrProjectOption.addEventListener("click", (e) => {
      const textValue = e.target.textContent;
      callbackFn(textValue);
    });
  },

  handleClickATaskorProject() {
    const projectContainer = document.querySelector(".project-container");
    const cardContainer = document.querySelector(".card-container");

    if (!projectContainer.hasEventListener) {
      projectContainer.hasEventListener = true; //custom property

      projectContainer.addEventListener("click", (e) => {
        if (!e.target.closest(".card") && !e.target.closest(".project-item")) {
          return;
        }

        //Get element, see if it's a card item or project item
        const ele = e.target.closest(".card")
          ? e.target.closest(".card")
          : e.target.closest(".project-item");

        //Getting card title or project title
        let title;
        ele.classList.value === "card"
          ? (title = ele.querySelector(".card-title").textContent)
          : (title = ele.querySelector(".project-title").textContent);

        //this is for form validation
        const oldItemTitles = document.querySelectorAll('.clickedItemTitle');
        for (const node of oldItemTitles) {
          node.remove();
        };
        const clickedItemTitle = document.createElement('p');
        clickedItemTitle.classList.add("hidden", "clickedItemTitle");
        clickedItemTitle.textContent = title;
        
        const body = document.querySelector('body');
        body.appendChild(clickedItemTitle);

        const object = Storage.getItem(title);
        FormManager.showProjectInEditor(object);
      });
    }

    if (!cardContainer.hasEventListener) {
      cardContainer.hasEventListener = true;

      cardContainer.addEventListener("click", (e) => {
        if (!e.target.closest(".card") && !e.target.closest(".project-item")) {
          return;
        }

        //Get element, see if it's a card item or project item
        const ele = e.target.closest(".card")
          ? e.target.closest(".card")
          : e.target.closest(".project-item");

        //Getting card title or project title
        let title;
        ele.classList.value === "card"
          ? (title = ele.querySelector(".card-title").textContent)
          : (title = ele.querySelector(".project-title").textContent);

        //this is for form validation
        const oldItemTitles = document.querySelectorAll('.clickedItemTitle');
        for (const node of oldItemTitles) {
          node.remove();
        };
        const clickedItemTitle = document.createElement('p');
        clickedItemTitle.classList.add("hidden", "clickedItemTitle")
        clickedItemTitle.textContent = title;
        
        const body = document.querySelector('body');
        body.appendChild(clickedItemTitle);

        //Check if task or project in Storage, then give it to Form Manager
        const object = Storage.getItem(title);
        FormManager.showTaskInEditor(object);
      });
    }
  },

  showTodayTasks() {
    let today = format(new Date(), "MM-dd-yyyy");

    //prepare screens
    const mainDisplay = document.querySelector("#main-display");
    mainDisplay.innerHTML = getMainDisplayAs("todaysTasks");
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";
    const editor = document.querySelector("#editor");
    editor.innerHTML = getEditorAs("default");

    //chain array method sorting
    let allObjects = Object.keys(localStorage)
      .map((key) => Storage.getItem(key))
      .sort(
        (objectA, objectB) => new Date(objectA.dueDate) - new Date(objectB.dueDate)
      );
    allObjects
      .filter(
        (object) =>
          !object.isComplete &&
          !object.isProject &&
          getDaysFromMilliSeconds(new Date(object.dueDate) - new Date(today)) <= 6
      )
      .forEach((object) => {
        const taskCard = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      });
    //

    //since this method creates a new instance of the displays
    //we need to re initialize the event listeners
    this.handleClickATaskorProject();

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noTodays");
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

    //chain array method sorting
    let allObjects = Object.keys(localStorage)
      .map((key) => Storage.getItem(key))
      .sort(
        (objectA, objectB) =>
          new Date(objectA.dueDate) - new Date(objectB.dueDate)
      );

    allObjects
      .filter(
        (object) =>
          object.dueDate > today &&
          !object.isComplete &&
          !object.isProject &&
          getDaysFromMilliSeconds(new Date(object.dueDate) - new Date(today)) >
            6
      )
      .forEach((object) => {
        const taskCard = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", taskCard);
      });
    //

    //since this method creates a new instance of the Displays
    //we need to re initialize the event listeners
    this.handleClickATaskorProject();

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noUpcoming");
    }
  },

  showPastTasksorProjects() {
    const mainDisplay = document.querySelector("#main-display");
    mainDisplay.innerHTML = getMainDisplayAs("pastTasksProjects");
    const cardContainer = document.querySelector(".card-container");

    //chain array method sorting
    let allObjects = Object.keys(localStorage)
      .map((key) => Storage.getItem(key))
      .sort(
        (objectA, objectB) =>
          new Date(objectA.dueDate) - new Date(objectB.dueDate)
      );

    allObjects
      .filter((object) => object.isComplete)
      .forEach((object) => {
        const projectCard = makeCardFor("cardContainer", object);
        cardContainer.insertAdjacentHTML("beforeend", projectCard);
      });
    //

    //since this method creates a new instance of the Displays
    //we need to re initialize the event listener
    //to correctly capture the new instance of the Displays
    this.handleClickATaskorProject();

    if (!cardContainer.innerHTML) {
      mainDisplay.innerHTML = getMainDisplayAs("noPastTasksProjects");
    }
  },

  showAllProjects() {
    const noProjectsFound = `
    <div class="message-wrapper">
      <div class="message">No Projects Found.</div>
    </div>
    `;

    if (!localStorage.length) {
      const projectContainer = document.querySelector(".project-container");
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

    //since this method creates a new instance of the Displays
    //we need to re initialize the event listener
    this.handleClickATaskorProject();

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

  handleEditorFormButtons() {
    const editor = document.querySelector("#editor");

    if (!editor.hasEventListener) {
      editor.hasEventListener = true; //custom property

      editor.addEventListener("click", (e) => {
        const clickedButton = e.target.classList;

        if (!clickedButton.contains("form-button")) return;

        const editorTitle = document.querySelector(".editor-title").textContent;

        if (clickedButton.contains("cancel-button")) {
          editor.innerHTML = getEditorAs("default");
          return;
        }

        if (clickedButton.contains("delete-button")) {
          const currentItemTitle = document.querySelector("#task-title").value;
          const modalMessage = document.querySelector(".modal-message");
          modalMessage.textContent = `Are you sure you want to delete "${currentItemTitle}"?`;
          this.toggleModalandOverlay();
          return;
        }

        if (
          clickedButton.contains("submit-button") &&
          (editorTitle === "Add New Task" || editorTitle === "Add New Project")
        ) {
          const form = editor.querySelector("form");

          if (!FormManager.handleFormValidation(form, editorTitle)) return;

          FormManager.addItemFromForm(editorTitle, form);
          return;
        }

        if (
          clickedButton.contains("submit-button") &&
          (editorTitle === "View/Edit Task" || editorTitle === "View/Edit Project")
        ) {
          const form = editor.querySelector("form");

          if (!FormManager.handleFormValidation(form, editorTitle)) return;

          //get current title
          const currentItemTitle = document.querySelector('.clickedItemTitle').textContent;
          const newItemTitle = document.querySelector('#task-title').value;
          FormManager.updateItem(currentItemTitle, newItemTitle, form);
          
          editor.innerHTML = getEditorAs("successfulUpdate");
          
          const successMsg = document.querySelector('.successful-update');
          successMsg.style.backgroundColor = "whitesmoke";
          successMsg.style.color = "black";
          successMsg.style.padding = "10px 8px 10px 8px";
          successMsg.style.borderRadius = "5px"

          setTimeout(() => {
            this.showTodayTasks();
            this.showAllProjects();
            successMsg.style.backgroundColor = "white";
            successMsg.style.padding = "0";
          }, 850);
          return;
        };

      });
    }
  },

  toggleModalandOverlay() {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  },

  handleModalButtons() {
    const yesModalBtn = document.querySelector(".modal-yes-button");
    const noModalBtn = document.querySelector(".modal-no-button");
    const overlay = document.querySelector(".overlay");

    noModalBtn.addEventListener("click", () => {
      this.toggleModalandOverlay();
    });
    overlay.addEventListener("click", () => {
      this.toggleModalandOverlay();
    });
    yesModalBtn.addEventListener("click", () => {
      const currentItemTitle = document.querySelector("#task-title").value;
      const currentMainDisplayTitle = document.querySelector(".main-title").textContent;

      const item = Storage.getItem(currentItemTitle);
      FormManager.handleDelete(item);

      this.toggleModalandOverlay();

      //refresh
      if (currentMainDisplayTitle === "Today's Tasks") {
        this.showTodayTasks();
        this.showAllProjects();
        return;
      }
      if (currentMainDisplayTitle === "Upcoming Tasks") {
        this.showUpcomingTasks();
        this.showAllProjects();
        return;
      }
      if (currentMainDisplayTitle === "Past Tasks/Projects") {
        this.showPastTasksorProjects()
        this.showAllProjects();
        return;
      }
    });
  },
};

export default Controller;
