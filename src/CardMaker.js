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
        <div class="card-title">${object._title}</div>
        <div class="card-info-wrapper">
          <div class="card-due-date">Due ${object._dueDate}</div>
          <div class="card-complete-status">
            ${object._isComplete? "Completed":"Not Complete"}
          </div>
          <div class="card-project${object._projectTitle? "": "hidden"}">
            ${object._projectTitle? `From ${object._projectTitle}` : ""}
          </div>
        </div>
      </div>
      <div class="card-priority ${object._priority==="Low"? "low" : ""}${object._priority==="Medium"? "medium" : ""}${object._priority==="High"? "high" : ""}${object._priority==="Critical"? "critical" : ""}">
        ${object._priority}
      </div>
    </div>
    `
    return str;
  }
  if (container==="projectContainer") {
    const str = `
    <div class="project-item">
      <div class="project-desc">
        <div class="project-title">${object._title}</div>
        <div class="project-due-date">Due at ${object._dueDate}</div>
      </div>
      <div class="project-priority ${object._priority==="Low"? "low" : ""} ${object._priority==="Medium"? "medium" : ""}${object._priority==="High"? "high" : ""} ${object._priority==="Critical"? "critical" : ""}">
        ${object._priority}
      </div>
    </div>
    `
    return str;
  }
};