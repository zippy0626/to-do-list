/**
 * Returns the card template based on chosen type and given object.
 * @param {'cardContainer' | 'projectContainer' | 'relatedTasksContainer'} container 
 * @return string - card as a string
 */

export default function makeCardFor(container, object) {
  //cardContainer, projectContainer, relatedTasksContainer
  //where container is selected container
  //where object is the task/project

  if (container==="cardContainer") {
    const str = `
    <div class="card">
      <div class="card-title-wrapper">
        <div class="card-title">${object.title}</div>
        <div class="card-info-wrapper">
          <div class="card-due-date">Due ${object.dueDate}</div>
          <div class="card-complete-status">
            ${object.isComplete? "Completed":"Not Complete"}
          </div>
          <div class="card-project-link${object.projectTitle? "": " hidden"}">
            ${object.projectTitle? `From ${object.projectTitle}` : ""}
          </div>
          ${
            object.isProject?
            `<div class="card-is-project">Project</div>`:
            ""
          }
        </div>
      </div>
      <div class="card-priority ${object.priority==="Low"? "low" : ""}${object.priority==="Medium"? "medium" : ""}${object.priority==="High"? "high" : ""}${object.priority==="Critical"? "critical" : ""}">
        ${object.priority}
      </div>
    </div>
    `
    return str;
  }
  if (container==="projectContainer") {
    const str = `
    <div class="project-item">
      <div class="project-desc">
        <div class="project-title">${object.title}</div>
        <div class="project-due-date">Due at ${object.dueDate}</div>
      </div>
      <div class="project-priority ${object.priority==="Low"? "low" : ""} ${object.priority==="Medium"? "medium" : ""}${object.priority==="High"? "high" : ""} ${object.priority==="Critical"? "critical" : ""}">
        ${object.priority}
      </div>
    </div>
    `
    return str;
  }

  //this is for projects editor, not tasks
  if (container==="relatedTasksContainer") {
    //need to have no space in CSS class
    let tempName = object.name.replace(/\s+/g, "-");
    const str = `
    <label for="${tempName}" class="checkbox-item">
      <input type="checkbox" id="${tempName}" name="${tempName}">
      ${object.name}
    </label>
    `
    return str;
  }
};