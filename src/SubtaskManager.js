import Storage from "./Storage";

const SubtaskManager = {
  linkTaskToProject(taskObject, projectTitle) {
    if (
      projectTitle &&
      Object.keys(localStorage).includes(projectTitle)
    ) {
      const project = Storage.getItem(projectTitle);
      const projectSubtaskNames = project.taskContainer.map(
        (subtask)=>subtask.name
      );

      if (!projectSubtaskNames.includes(taskObject.title)) {
        project.taskContainer.push(
          {name: taskObject.title, isComplete: taskObject.isComplete}
        );
      };

      //update project
      Storage.set(project.title, project);
    };
  },

  refreshSubtasksForProject(projectTitle) {
    if (!projectTitle) return;

    const allTasks = Object.keys(localStorage)
    .map((key)=>Storage.getItem(key))
    .filter((task) => !task.isProject );
    
    const project = Storage.getItem(projectTitle);
    project.taskContainer = [];
    
    for (const task of allTasks) {
      if (task.projectTitle === projectTitle) {
        project.taskContainer.push(
          {name: task.title, isComplete:task.isComplete}
        );
      }
    }

    Storage.set(project.title, project);
  },

  refreshAllProjectsSubtasks() {
    const allProjects = Object.keys(localStorage)
    .map((key)=>Storage.getItem(key))
    .filter((item)=>item.isProject)
    .map((project) => project.title );

    for (const name of allProjects) {
      this.refreshSubtasksForProject(name);
    };
  },
}

export default SubtaskManager;