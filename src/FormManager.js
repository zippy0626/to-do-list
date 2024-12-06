import makeCardFor from "./CardMaker";
import getEditorAs from "./Editor";
import toDoItem from "./ToDoItem";
import Project from "./Project";
import Storage from "./Storage";
import Controller from "./UIController";

const FormManager = {
  showTaskAsForm(task) {
    const editor = document.querySelector("#editor");
    editor.innerHTML = getEditorAs("viewEditTask");

    const form = editor.querySelector("form");

    //Updating form fields based on task item properties
    const taskTitleField = form.querySelector("#task-title");
    taskTitleField.value = task.title;

    const isComplete = form.querySelector("#task-is-complete");
    const isNotComplete = form.querySelector("#task-is-not-complete");
    task.isComplete
      ? (isComplete.checked = true)
      : (isNotComplete.checked = true);

    const descriptionField = form.querySelector("#task-desc");
    descriptionField.value = task.description;

    const dueDateField = form.querySelector("#task-due-date");
    let [month, day, year] = task.dueDate.split("-");
    dueDateField.value = `${year}-${month}-${day}`;

    const priorityField = form.querySelector(".priority-radio-buttons-wrapper");
    const [low, medium, high, critical] =
      priorityField.querySelectorAll("input");
    if (task.priority === "Low") {
      low.checked = true;
    }
    if (task.priority === "Medium") {
      medium.checked = true;
    }
    if (task.priority === "High") {
      high.checked = true;
    }
    if (task.priority === "Critical") {
      critical.checked = true;
    }

    //related subtasks
    const subtasksContainer = form.querySelector(".subtasks-wrapper");
    const subtasks = task.checkList; //array of dictionaries
    if (!subtasks.length) {
      subtasksContainer.innerHTML = `
      <div class="message-wrapper">
        <div class="message-small">No subtasks found.</div>
      </div>
      `;
      const msgWrapper = subtasksContainer.querySelector(".message-wrapper");
      msgWrapper.style.backgroundColor = "whitesmoke";
      msgWrapper.style.margin = "0";
      return;
    }
    
    //prevent dupe values
    //can pass an iterable into Set constructor
    let stringSet = new Set(subtasks.map(JSON.stringify));
    let uniqueArray = Array.from(stringSet).map(JSON.parse);

    for (const subtask of uniqueArray) {
      let tempName = subtask.name.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-");

      const card = makeCardFor("subtasksWrapper", {
        name: tempName,
        ...subtask,
      });
      subtasksContainer.insertAdjacentHTML("beforeend", card);

      //reselect added card
      const addedCardCheckBox = subtasksContainer.querySelector(`#${tempName}`);
      if (subtask.isComplete) addedCardCheckBox.checked = true;
    }

    const projectLinkField = form.querySelector("#task-link-to-project");
    task.projectTitle
      ? (projectLinkField.value = task.projectTitle)
      : (projectLinkField.placeholder = "No project linked");
  },

  //This is for when user clicks any Project
  showProjectAsForm(project) {
    const editor = document.querySelector("#editor");
    editor.innerHTML = getEditorAs("viewEditProject");

    const form = editor.querySelector("form");

    const taskTitleField = form.querySelector("#task-title");
    taskTitleField.value = project.title;

    const isComplete = form.querySelector("#task-is-complete");
    const isNotComplete = form.querySelector("#task-is-not-complete");
    project.isComplete
      ? (isComplete.checked = true)
      : (isNotComplete.checked = true);

    const descriptionField = form.querySelector("#task-desc");
    descriptionField.value = project.description;

    const dueDateField = form.querySelector("#task-due-date");
    let [month, day, year] = project.dueDate.split("-");
    dueDateField.value = `${year}-${month}-${day}`;

    const priorityField = form.querySelector(".priority-radio-buttons-wrapper");
    const [low, medium, high, critical] =
      priorityField.querySelectorAll("input");
    if (project.priority === "Low") {
      low.checked = true;
    }
    if (project.priority === "Medium") {
      medium.checked = true;
    }
    if (project.priority === "High") {
      high.checked = true;
    }
    if (project.priority === "Critical") {
      critical.checked = true;
    }

    //handle taskContainer/subtasks/related tasks
    const subtasksContainer = form.querySelector(".subtasks-wrapper");
    const subtasks = project.taskContainer; //array of dicts
    if (!subtasks.length) {
      subtasksContainer.innerHTML = `
      <div class="message-wrapper">
        <div class="message">No subtasks found.</div>
      </div>
      `;
      const msgWrapper = subtasksContainer.querySelector(".message-wrapper");
      msgWrapper.style.backgroundColor = "whitesmoke";
      msgWrapper.style.margin = "0";
      return;
    }

    let stringSet = new Set(subtasks.map(JSON.stringify));
    let uniqueArray = Array.from(stringSet).map(JSON.parse);

    for (const subTask of uniqueArray) {
      let tempName = subTask.name.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "-");

      const card = makeCardFor("subtasksWrapper", {
        name: tempName,
        ...subTask,
      });
      subtasksContainer.insertAdjacentHTML("beforeend", card);

      //reselect added card
      const addedCardCheckBox = subtasksContainer.querySelector(`#${tempName}`);
      if (subTask.isComplete) addedCardCheckBox.checked = true;
    }
  },

  addItemBasedOnForm(formTitle, form) {
    //Differentiate between task/project

    if (formTitle === "Add New Task") {
      //use helper fns
      let taskData = this.extractFormData(form);
      taskData = this.processFormData(taskData);

      const item = new toDoItem(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.checkList,
        taskData.isComplete,
        taskData.projectTitle
      );

      if (!Storage.getItem(item.title)) {
        Storage.set(item.title, item);
      }

      // Refresh views
      Controller.showTodayTasks();
      Controller.showAllProjects();
      return;
    }

    if (formTitle === "Add New Project") {
      let projectData = this.extractFormData(form);
      projectData = this.processFormData(projectData);

      const item = new Project(
        projectData.title,
        projectData.description,
        projectData.dueDate,
        projectData.priority,
        projectData.isComplete,
        projectData.checkList,//or taskContainer
      );

      if (!Storage.getItem(item.title)) {
        Storage.set(item.title, item);
      }

      // Refresh views
      Controller.showTodayTasks();
      Controller.showAllProjects();
      return;
    }
  },

  updateItem(itemTitle, form) {
    //itemData is an object
    let itemData = this.extractFormData(form);
    itemData = this.processFormData(itemData);

    //handle checkbox items
    let checkboxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
      checkboxes = checkboxes.map((eachItem) => eachItem.checked );
    let checklistItems = Array.from(form.querySelectorAll('.checkbox-item'));
      checklistItems = checklistItems.map((eachItem) => eachItem.textContent );

    const subtasks = [];
    for (let i = 0; i < checklistItems.length; i++) {
      const pair = {};
      const name = checklistItems[i];
      const isComplete = checkboxes[i];

      pair.name = name;
      pair.isComplete = isComplete;
      subtasks.push(pair);
    };

    if (Object.hasOwn(Storage.getItem(itemTitle), "isProject")) {//fix this for its task container
      const item = new Project(
        itemTitle,
        itemData.description,
        itemData.dueDate,
        itemData.priority,
        itemData.isComplete,
        subtasks,
      )
      Storage.updateItem(itemTitle, item);

    } else {
      const item = new toDoItem(
        itemTitle,
        itemData.description,
        itemData.dueDate,
        itemData.priority,
        subtasks,
        itemData.isComplete,
        itemData.projectTitle
      )
      Storage.updateItem(itemTitle, item);
    }
  },

  handleDelete(item) {
    if (!item) throw new Error("Item to delete is not found!");
    Storage.remove(item.title);
  },

  //helper functions for addItem and updateItem
  extractFormData(form) {
    const formData = new FormData(form);
    const data = {}

    for (const [key, value] of formData) {
      data[key] = value;
    }

    return data;
  },

  processFormData(data) {
    data.title = data.title.trim();

    data.description = data.description.trim();

    if (data.dueDate) {
      let [year, month, day] = data.dueDate.split("-");
      data.dueDate = `${month}-${day}-${year}`;
    } else {
      data.dueDate = undefined;
    }

    if (Object.hasOwn(data, "checkList")) {
      
      //handle checklist's comma seperated values
      data.checkList
      ? (data.checkList = data.checkList
          .split(",")
          .map((subTask) => subTask.trim())
          .filter((subTask) => subTask !== ""))
      : [];

      data.checkList = data.checkList.map((subtask)=>
        ({name:subtask, isComplete:false})
      ); 
    }

    data.isComplete === "false"
      ? (data.isComplete = false)
      : (data.isComplete = true);

    data.projectTitle ? data.projectTitle : null;

    return data;
  },
  //

};

export default FormManager;
