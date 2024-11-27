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
      taskTitleField.value = task._title;
    
    const isComplete = form.querySelector("#task-is-complete");
    const isNotComplete = form.querySelector("#task-is-not-complete");
      task._isComplete ? 
        isComplete.checked = true : 
        isNotComplete.checked = true;
    
    const descriptionField = form.querySelector("#task-desc");
      descriptionField.value = task._description;
    
    const dueDateField = form.querySelector("#task-due-date");
      let [month, day, year] = task._dueDate.split("-");
      dueDateField.value = `${year}-${month}-${day}`;

    const priorityField = form.querySelector(".priority-radio-buttons-wrapper");
      const [low, medium, high, critical] = priorityField.querySelectorAll("input");
      if (task._priority==="Low") {
        low.checked = true;
      }
      if (task._priority==="Medium") {
        medium.checked = true;
      }
      if (task._priority==="High") {
        high.checked = true;
      }
      if (task._priority==="Critical") {
        critical.checked = true;
      }
    
    const checkListField = form.querySelector("#task-checklist");
      const subTasks = task.checkList; //array of dictionaries
      if (subTasks) {
        for (const task of subTasks) {
          checkListField.value += task.description + ", "
        }
      }

    const projectLinkField = form.querySelector("#task-link-to-project");
      task._projectTitle ?
      projectLinkField.value = task._projectTitle : 
      projectLinkField.placeholder = "No project linked"
  },
  
  updateProjectEditorForm(project) {
    const editor = document.querySelector('#editor');
    editor.innerHTML = getEditorAs("viewEditProject");
    
    const form = editor.querySelector("form");
  }
};

export default FormManager;