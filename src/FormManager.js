import makeCardFor from "./CardMaker";
import getEditorAs from "./Editor";

const FormManager = {
  //task form
  updateTaskEditorForm(task) {
    const editor = document.querySelector('#editor');
    editor.innerHTML = getEditorAs("viewEditTask");

    //update form fields here
    //Get element from form variable
    const form = editor.querySelector("form");
    
    const taskTitleField = form.querySelector("#task-title")
      taskTitleField.value = task.title;
    
    const isComplete = form.querySelector("#task-is-complete");
    const isNotComplete = form.querySelector("#task-is-not-complete");
      task.isComplete ? 
      isComplete.checked = true : 
      isNotComplete.checked = true;
    
    const descriptionField = form.querySelector("#task-desc");
      descriptionField.value = task.description;
    
    const dueDateField = form.querySelector("#task-due-date");
      let [month, day, year] = task.dueDate.split("-");
      dueDateField.value = `${year}-${month}-${day}`;

    const priorityField = form.querySelector(".priority-radio-buttons-wrapper");
      const [low, medium, high, critical] = priorityField.querySelectorAll("input");
      if (task.priority==="Low") {
        low.checked = true;
      }
      if (task.priority==="Medium") {
        medium.checked = true;
      }
      if (task.priority==="High") {
        high.checked = true;
      }
      if (task.priority==="Critical") {
        critical.checked = true;
      }
    
    const checkListField = form.querySelector("#task-checklist");
      const subTasks = task.checkList; //array of dictionaries
      if (subTasks) {
        for (const task of subTasks) {
          checkListField.value += task.name + ", \n"
        }
      }

    const projectLinkField = form.querySelector("#task-link-to-project");
      task.projectTitle ?
      projectLinkField.value = task.projectTitle : 
      projectLinkField.placeholder = "No project linked"
  },
  
  updateProjectEditorForm(project) {
    const editor = document.querySelector('#editor');
    editor.innerHTML = getEditorAs("viewEditProject");
    
    const form = editor.querySelector("form");

    const taskTitleField = form.querySelector("#task-title")
      taskTitleField.value = project.title;
    
    const isComplete = form.querySelector("#task-is-complete");
    const isNotComplete = form.querySelector("#task-is-not-complete");
      project.isComplete ? 
      isComplete.checked = true : 
      isNotComplete.checked = true;
    
    const descriptionField = form.querySelector("#task-desc");
      descriptionField.value = project.description;
    
    const dueDateField = form.querySelector("#task-due-date");
      let [month, day, year] = project.dueDate.split("-");
      dueDateField.value = `${year}-${month}-${day}`;
    
    const priorityField = form.querySelector(".priority-radio-buttons-wrapper");
      const [low, medium, high, critical] = priorityField.querySelectorAll("input");
      if (project.priority==="Low") {
        low.checked = true;
      }
      if (project.priority==="Medium") {
        medium.checked = true;
      }
      if (project.priority==="High") {
        high.checked = true;
      }
      if (project.priority==="Critical") {
        critical.checked = true;
      }

    //handle taskContainer/subtasks/related tasks
    const relatedTasksContainer = form.querySelector(".group-related-tasks-wrapper");
    if (!project.taskContainer.length) {
      relatedTasksContainer.innerHTML = `
      <div class="message-wrapper">
        <div class="message">No subtasks found.</div>
      </div>
      `
    }
    for (const subTask of project.taskContainer) {
      let tempName = subTask.name.replace(/\s+/g, "-");
      
      const card = makeCardFor("relatedTasksContainer", {name: tempName, ...subTask})
      relatedTasksContainer.insertAdjacentHTML("beforeend", card);

      const addedCardCheckBox = relatedTasksContainer.querySelector(`#${tempName}`);
      if (subTask.isComplete) addedCardCheckBox.checked = true;
    }
  },

  handleAddNewTaskorProjectForm(option) {//task or project

  },

  handleEditTaskorProjectForm(option) {//task or project
    
  },
};

export default FormManager;