/**
 * Returns the editor template based on the editor type.
 * @param {'default' | 'addNewTask' | 'viewEditTask' | 'addNewProject' | 'viewEditProject' | 'successfulUpdate'} editorType - Type of editor to retrieve.
 * @returns {string} The innerHTML for the editor.
 */

export default function getEditorAs(editorType) {
  
  if (!editorType || typeof editorType!="string") {
    throw new Error("Please provide a valid Editor type");
  };

  if (editorType==="default") {
    const defaultView = `
      <div class="message-wrapper">
        <div class="message">Click a task/project to view or edit it</div>
      </div>
    `
    return defaultView;
  };

  if (editorType==="successfulUpdate") {
    const defaultView = `
      <div class="message-wrapper">
        <div class="message successful-update">Task/Project successfully updated!</div>
      </div>
    `
    return defaultView;
  };

  if (editorType==="addNewTask") {
    const addNewTask = `
      <h1 class="editor-title">Add New Task</h1>
      <form>
        <div>
          <label for="task-title">
            Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden task-error-msg" aria-hidden="true">Task with same name already exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Task" aria-placeholder="My Task"
          required minlength="3" maxlength="35" >
        </div>

        <div>
          <p class="input-label">
            Completed?
            <span aria-label="Required"><strong>*</strong></span>
          </p>
          <div class="radio-buttons-wrapper task-complete-radio-buttons">
            <div>
              <input type="radio" id="task-is-complete" name="isComplete" value="true" required>
              <label for="task-is-complete" class="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="task-is-not-complete" name="isComplete" value="false" required checked>
              <label for="task-is-not-complete" class="no">No</label>
            </div>
          </div>
        </div>

        <div>
          <label for="task-desc">
            Description
          </label>
          <textarea id="task-desc" placeholder="What's this for?" aria-placeholder="What's this for?"
          name="description" maxlength="350"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <p class="input-label">
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </p>

          <div class="priority-radio-buttons-wrapper">
          <div>
            <input type="radio" id="task-priority-low" name="priority" value="Low" required>
            <label for="task-priority-low" class="low">Low</label>
          </div>
          <div>
            <input type="radio" id="task-priority-medium" name="priority" value="Medium">
            <label for="task-priority-medium" class="medium">Medium</label>
          </div>
          <div>
            <input type="radio" id="task-priority-high" name="priority" value="High">
            <label for="task-priority-high" class="high">High</label>
          </div>
          <div>
            <input type="radio" id="task-priority-critical" name="priority" value="Critical">
            <label for="task-priority-critical" class="critical">Critical</label>
          </div>
        </div>
        </div>

        <div>
          <label for="task-subtasks">Subtasks</label>
          <textarea id="task-subtasks" name="checkList" aria-placeholder="Additional Subtasks"
          placeholder="Additional Subtasks. Enter as a comma seperated list." maxlength="500"></textarea>
        </div>

        <div>
          <label for="task-link-to-project">Link to a Project</label>
          <input type="text" id="task-link-to-project" name="projectTitle" placeholder="Project's Title"
          aria-placeholder="Project Title">
          <span class="error-msg hidden project-error-msg" aria-hidden="true">Project "name" does not exist!</span>
        </div>

        <div class="button-wrapper">
          <button type="button" class="submit-button form-button">
            Done
          </button>
          <button type="button" class="delete-button form-button hidden">
            Delete
          </button>
          <button type="button" class="cancel-button form-button">
            Cancel
          </button>
        </div>
      </form>
    `
    return addNewTask;
  };

  if (editorType==="viewEditTask") {
    const viewEditTask = `
      <h1 class="editor-title">View/Edit Task</h1>
      <form>
        <div>
          <label for="task-title">
            Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden task-error-msg" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Task" aria-placeholder="My Task"
          required minlength="3" maxlength="35">
        </div>

        <div>
          <p class="input-label">
            Completed?
            <span aria-label="Required"><strong>*</strong></span>
          </p>
          <div class="radio-buttons-wrapper task-complete-radio-buttons">
            <div>
              <input type="radio" id="task-is-complete" name="isComplete" value="true" required>
              <label for="task-is-complete" class="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="task-is-not-complete" name="isComplete" value="false" required>
              <label for="task-is-not-complete" class="no">No</label>
            </div>
          </div>
        </div>

        <div>
          <label for="task-desc">
            Description
          </label>
          <textarea id="task-desc" placeholder="What's this for?" aria-placeholder="What's this for?"
          name="description" maxlength="350"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <p class="input-label">
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </p>

          <div class="priority-radio-buttons-wrapper">
          <div>
            <input type="radio" id="task-priority-low" name="priority" value="Low" required>
            <label for="task-priority-low" class="low">Low</label>
          </div>
          <div>
            <input type="radio" id="task-priority-medium" name="priority" value="Medium">
            <label for="task-priority-medium" class="medium">Medium</label>
          </div>
          <div>
            <input type="radio" id="task-priority-high" name="priority" value="High">
            <label for="task-priority-high" class="high">High</label>
          </div>
          <div>
            <input type="radio" id="task-priority-critical" name="priority" value="Critical">
            <label for="task-priority-critical" class="critical">Critical</label>
          </div>
        </div>
        </div>

        <div id="subtasks">
          <p class="input-label">
            Subtasks
          </p>
          
          <div class="subtasks-wrapper">

          </div>
          <div class="message-small">A checked task means complete.</div>
        </div>

        <div>
          <label for="task-link-to-project">Link to a Project &nbsp&nbsp<span class="error-msg hidden project-error-msg" aria-hidden="true"></span></label>
          <input type="text" id="task-link-to-project" name="projectTitle" placeholder="Project's Title"
            aria-placeholder="Project Title">
        </div>

        <div class="button-wrapper">
          <button type="button" class="submit-button form-button">
            Done
          </button>
          <button type="button" class="delete-button form-button">
            Delete
          </button>
          <button type="button" class="cancel-button form-button hidden">
            Cancel
          </button>
        </div>
      </form>
    `;
    return viewEditTask;
  }

  if (editorType==="addNewProject") {
    const addNewProject = `
      <h1 class="editor-title">Add New Project</h1>
      <form >
        <div>
          <label for="task-title">
            Project Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden project-error-msg" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Project" aria-placeholder="My Project" required minlength="3" maxlength="35">
        </div>

          <div>
            <p class="input-label">
              Completed?
              <span aria-label="Required"><strong>*</strong></span>
            </p>
            <div class="radio-buttons-wrapper task-complete-radio-buttons">
              <div>
                <input type="radio" id="task-is-complete" name="isComplete" value="true" required>
                <label for="task-is-complete" class="yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="task-is-not-complete" name="isComplete" value="false" required checked>
                <label for="task-is-not-complete" class="no">No</label>
              </div>
            </div>
          </div>

        <div>
          <label for="task-desc">
            Project Description
          </label>
          <textarea id="task-desc" placeholder="What's this for?" aria-placeholder="What's this for?"
            name="description" maxlength="350" ></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <p class="input-label">
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </p>

          <div class="priority-radio-buttons-wrapper">
            <div>
              <input type="radio" id="task-priority-low" name="priority" value="Low" required>
              <label for="task-priority-low" class="low">Low</label>
            </div>
            <div>
              <input type="radio" id="task-priority-medium" name="priority" value="Medium">
              <label for="task-priority-medium" class="medium">Medium</label>
            </div>
            <div>
              <input type="radio" id="task-priority-high" name="priority" value="High">
              <label for="task-priority-high" class="high">High</label>
            </div>
            <div>
              <input type="radio" id="task-priority-critical" name="priority" value="Critical">
              <label for="task-priority-critical" class="critical">Critical</label>
            </div>
          </div>
        </div>

        <div>
          <label for="task-subtasks">Subtasks</label>
          <textarea id="task-subtasks" name="checkList" aria-placeholder="Additional Subtasks"
            placeholder="Additional Subtasks. Enter as a comma seperated list."
            maxlength="500"></textarea>
        </div>

        <div class="button-wrapper">
          <button type="button" class="submit-button form-button">
            Done
          </button>
          <button type="button" class="delete-button form-button hidden">
            Delete
          </button>
          <button type="button" class="cancel-button form-button">
            Cancel
          </button>
        </div>
      </form>
    `;
    return addNewProject;
  }

  if (editorType==="viewEditProject") {
    const viewEditProject = `
      <h1 class="editor-title">View/Edit Project</h1>
      <form >
        <div>
          <label for="task-title">
            Project Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden project-error-msg" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Project" aria-placeholder="My Project"
          required minlength="3" maxlength="35">
        </div>

        <div>
          <p class="input-label">
            Completed?
            <span aria-label="Required"><strong>*</strong></span>
          </p>
          <div class="radio-buttons-wrapper task-complete-radio-buttons">
            <div>
              <input type="radio" id="task-is-complete" name="isComplete" value="true" required>
              <label for="task-is-complete" class="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="task-is-not-complete" name="isComplete" value="false" required>
              <label for="task-is-not-complete" class="no">No</label>
            </div>
          </div>
        </div>

        <div>
          <label for="task-desc">
            Project Description
          </label>
          <textarea id="task-desc" placeholder="What's this for?" aria-placeholder="What's this for?"
          name="description" maxlength="350"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <p class="input-label">
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </p>

          <div class="priority-radio-buttons-wrapper">
            <div>
              <input type="radio" id="task-priority-low" name="priority" value="Low" required>
              <label for="task-priority-low" class="low">Low</label>
            </div>
            <div>
              <input type="radio" id="task-priority-medium" name="priority" value="Medium">
              <label for="task-priority-medium" class="medium">Medium</label>
            </div>
            <div>
              <input type="radio" id="task-priority-high" name="priority" value="High">
              <label for="task-priority-high" class="high">High</label>
            </div>
            <div>
              <input type="radio" id="task-priority-critical" name="priority" value="Critical">
              <label for="task-priority-critical" class="critical">Critical</label>
            </div>
          </div>
        </div>

        <div id="subtasks">
          <p class="input-label">
            Subtasks
          </p>
          
          <div class="subtasks-wrapper">

          </div>
          <div class="message-small">A checked task means complete.</div>
        </div>

        <div class="button-wrapper">
          <button type="button" class="submit-button form-button">
            Done
          </button>
          <button type="button" class="delete-button form-button">
            Delete
          </button>
          <button type="button" class="cancel-button form-button hidden">
            Cancel
          </button>
        </div>
      </form>
    `
    return viewEditProject;
  }
}