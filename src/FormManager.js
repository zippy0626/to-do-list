import makeCardFor from "./CardMaker";
import getEditorAs from "./Editor";
import toDoItem from "./ToDoItem";
import Project from "./Project";
import Storage from "./Storage";
import SubtaskManager from "./SubtaskManager";

const FormManager = {
  showTaskInEditor(task) {
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

    //Task's Subtasks
    const subtasksContainer = form.querySelector(".subtasks-wrapper");
    const subtasks = task.checkList; //array of dictionaries
    
    if (!subtasks.length) {
      subtasksContainer.style.height = '50px'
      subtasksContainer.innerHTML = `
      <div class="message-wrapper">
        <div class="message-small">No subtasks found.</div>
      </div>
      `;
      const msgWrapper = subtasksContainer.querySelector(".message-wrapper");
      msgWrapper.style.backgroundColor = "whitesmoke";
      msgWrapper.style.margin = "0";
    };

    if (subtasks.length) {
      let stringSet = new Set(subtasks.map(JSON.stringify));
      let uniqueArray = Array.from(stringSet).map(JSON.parse);

      for (const subtask of uniqueArray) {
        let tempName = subtask.name
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, "-");

        const card = makeCardFor("subtasksWrapper", {name: tempName,...subtask,} );
        subtasksContainer.insertAdjacentHTML("beforeend", card);

        //reselect added card
        const addedCardCheckBox = subtasksContainer.querySelector(`#${tempName}`);
        if (subtask.isComplete) addedCardCheckBox.checked = true;
      };
    };

    const projectLinkField = form.querySelector("#task-link-to-project");
    task.projectTitle
      ? (projectLinkField.value = task.projectTitle)
      : (projectLinkField.placeholder = "No project linked");
  },

  //This is for when user clicks any Project
  showProjectInEditor(project) {
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

    //Project's Subtasks
    const subtasksContainer = form.querySelector(".subtasks-wrapper");
    const subtasks = project.taskContainer; //array of dicts
    
    if (!subtasks.length) {
      subtasksContainer.style.height = '60px'
      subtasksContainer.innerHTML = `
      <div class="message-wrapper">
        <div class="message">No subtasks found.</div>
      </div>
      `;
      const msgWrapper = subtasksContainer.querySelector(".message-wrapper");
      msgWrapper.style.backgroundColor = "whitesmoke";
      msgWrapper.style.margin = "0";
      return;
    };

    if (subtasks.length) {
      let stringSet = new Set(subtasks.map(JSON.stringify));
      let uniqueArray = Array.from(stringSet).map(JSON.parse);
  
      for (const subTask of uniqueArray) {
        let tempName = subTask.name
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, "-");
  
        const card = makeCardFor("subtasksWrapper", {name: tempName,...subTask,} );
        subtasksContainer.insertAdjacentHTML("beforeend", card);
  
        //reselect added card
        const addedCardCheckBox = subtasksContainer.querySelector(`#${tempName}`);
        if (subTask.isComplete) addedCardCheckBox.checked = true;
      };
    };

  },

  addItemFromForm(formTitle, form) {
    
    if (formTitle === "Add New Task") {
      let taskData = this.extractFormData(form);
      taskData = this.processFormData(taskData);

      const newTask = new toDoItem(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.checkList,
        taskData.isComplete,
        taskData.projectTitle
      );

      if (!Storage.getItem(newTask.title)) {
        Storage.set(newTask.title, newTask);
      }

      //Linkage
      SubtaskManager.linkTaskToProject(newTask, newTask.projectTitle)
      return;
    };

    if (formTitle === "Add New Project") {
      let projectData = this.extractFormData(form);
      projectData = this.processFormData(projectData);

      const newProject = new Project(
        projectData.title,
        projectData.description,
        projectData.dueDate,
        projectData.priority,
        projectData.isComplete,
        projectData.checkList //or taskContainer
      );

      //Handle linkage of existing subtasks in comma seperated list
      if (newProject.taskContainer.length) {
        for (const subtask of newProject.taskContainer) {
          if (Object.keys(localStorage).includes(subtask.name)) {
            const existingSubtask = Storage.getItem(subtask.name);
            existingSubtask.projectTitle = newProject.title;

            Storage.set(existingSubtask.title, existingSubtask);
          };
        };
      };
      //

      if (!Storage.getItem(newProject.title)) {
        Storage.set(newProject.title, newProject);
      }
      return;
    }
  },

  updateItem(currentItemTitle, newItemTitle, form) {
    let itemData = this.extractFormData(form);//itemData is an object
    itemData = this.processFormData(itemData);

    //Get Checkboxes and Checked Status
    let checkboxes = Array.from(
      form.querySelectorAll('input[type="checkbox"]')
    );
    checkboxes = checkboxes.map((eachItem) => eachItem.checked);//bool

    //Get Names
    let checklistItems = Array.from(form.querySelectorAll(".checkbox-item"));
    checklistItems = checklistItems.map((eachItem) => eachItem.textContent);

    //Handle Subtasks for Tasks/Projects
    const subtasks = [];
    for (let i = 0; i < checklistItems.length; i++) {
      const pair = {};
      const name = checklistItems[i];
      const isComplete = checkboxes[i];

      pair.name = name;
      pair.isComplete = isComplete;
      subtasks.push(pair);
    };
    //Update subtasks status in system (Only For Projects)
    if (subtasks.length) {
      for (const subtask of subtasks) {
        const selectedTask = Storage.getItem(subtask.name);
        
        if (selectedTask) {//regular task containers "subtasks" aren't in system
          selectedTask.isComplete = subtask.isComplete;
          Storage.set(selectedTask.title, selectedTask);
        };
      };
    };

    if (currentItemTitle !== newItemTitle) {
      Storage.remove(currentItemTitle);
    };

    const formTitle = document.querySelector(".editor-title").textContent;
    if (formTitle.includes("Project")) {
      const item = new Project(
        newItemTitle,
        itemData.description,
        itemData.dueDate,
        itemData.priority,
        itemData.isComplete,
        subtasks
      );
      Storage.set(newItemTitle, item);
    } else {
      const item = new toDoItem(
        newItemTitle,
        itemData.description,
        itemData.dueDate,
        itemData.priority,
        subtasks,
        itemData.isComplete,
        itemData.projectTitle
      );
      Storage.set(newItemTitle, item);
      SubtaskManager.refreshSubtasksForProject(item.projectTitle);
    };
  },

  handleDelete(item) {
    if (!item) throw new Error("Item to delete is not found!");
    Storage.remove(item.title);
    SubtaskManager.refreshAllProjectsSubtasks();
  },

  //helper functions for addItem and updateItem
  extractFormData(form) {
    const formData = new FormData(form);
    const data = {};

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

    if (Object.hasOwn(data, "checkList") && data.checkList) {
      //handle checklist's comma seperated values
      data.checkList
        ? (data.checkList = data.checkList
            .split(",")
            .map((subTask) => subTask.trim())
            .filter((subTask) => subTask !== ""))
        : [];

      data.checkList = data.checkList.map((subtask) => ({
        name: subtask,
        isComplete: false,
      }));
    }

    data.isComplete === "false"
      ? (data.isComplete = false)
      : (data.isComplete = true);

    data.projectTitle ? data.projectTitle.trim() : null;

    return data;
  },
  //

  handleFormValidation(form, formType) {
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    const taskErrorMsg = document.querySelector(".task-error-msg")
      ? document.querySelector(".task-error-msg")
      : document.querySelector(".project-error-msg");

    const projectErrorMsg = document.querySelector(".project-error-msg")
      ? document.querySelector(".project-error-msg")
      : document.querySelector(".task-error-msg");

    //checks for dupe titles.
    function checkDupeTitle() {
      const itemTitle = document.querySelector("#task-title").value;

      let isTaskMsgActive = false;
      if (Object.keys(localStorage).includes(itemTitle)) {
        if (isTaskMsgActive) return;
        isTaskMsgActive = true;

        taskErrorMsg.textContent = `Task/Project "${itemTitle}" already exists!`;
        taskErrorMsg.classList.remove("hidden");

        setTimeout(() => {
          taskErrorMsg.classList.add("hidden");
          isTaskMsgActive = false;
        }, 2000);

        return false;
      }

      return true;
    }

    //checks for no existing project to link to.
    function checkExistingProjectTitle() {
      const projectLinkTitle = document.querySelector(
        "#task-link-to-project"
      ).value;

      let isProjectMsgActive = false;
      if (
        projectLinkTitle &&
        !Object.keys(localStorage).includes(projectLinkTitle)
      ) {
        if (isProjectMsgActive) return;
        isProjectMsgActive = true;

        projectErrorMsg.textContent = `Project "${projectLinkTitle}" does not exist!`;
        projectErrorMsg.classList.remove("hidden");

        setTimeout(() => {
          projectErrorMsg.classList.add("hidden");
          isProjectMsgActive = false;
        }, 2000);
        return false;
      }

      return true;
    }

    if (formType === "Add New Task") {
      const isTitleValid = checkDupeTitle();
      const isProjectTitleValid = checkExistingProjectTitle();

      //if check is false, negate it to true.
      if (!isTitleValid || !isProjectTitleValid) {
        return false;
      }
    }

    if (formType === "Add New Project") {
      const isTitleValid = checkDupeTitle();
      if (!isTitleValid) return false;
    }

    if (formType === "View/Edit Task") {
      const isProjectTitleValid = checkExistingProjectTitle();
      if (!isProjectTitleValid) return false;
    }

    return true;
  },
};

export default FormManager;
