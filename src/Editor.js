/**
 * Returns the editor template based on the editor type.
 * @param {'default' | 'addNewTask' | 'viewEditTask' | 'addNewProject' | 'viewEditProject'} editorType - Type of editor to retrieve.
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

  if (editorType==="addNewTask") {
    const str = `
      <h1 class="editor-title">Add New Task</h1>
      <form>
        <div>
          <label for="task-title">
            Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Task" aria-placeholder="My Task"
          required>
        </div>

        <div>
          <label>
            Completed?
            <span aria-label="Required"><strong>*</strong></span>
          </label>
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
            name="description"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <label>
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </label>

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
          <label for="task-checklist">Checklist</label>
          <textarea id="task-checklist" name="checkList" aria-placeholder="Additional Subtasks"
            placeholder="Additional Subtasks. Enter as a comma seperated list. "></textarea>
        </div>

        <div>
          <label for="task-link-to-project">Link to a Project</label>
          <input type="text" id="task-link-to-project" name="projectTitle" placeholder="Project's Title"
            aria-placeholder="Project Title">
        </div>

        <button type="submit" class="submit-button form-button">
          Done
        </button>
        <button type="button" class="delete-button form-button hidden">
          Delete
        </button>
        <button type="button" class="cancel-button form-button">
          Cancel
        </button>
      </form>
    `
    return str;
  };

  if (editorType==="viewEditTask") {
    const str = `
      <h1 class="editor-title">View/Edit Task</h1>
      <form>
        <div>
          <label for="task-title">
            Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Task" aria-placeholder="My Task"
          required>
        </div>

        <div>
          <label>
            Completed?
            <span aria-label="Required"><strong>*</strong></span>
          </label>
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
            name="description"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <label>
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </label>

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
          <label for="task-checklist">Checklist</label>
          <textarea id="task-checklist" name="checkList" aria-placeholder="Additional Subtasks"
            placeholder="Additional Subtasks. Enter as a comma seperated list. "></textarea>
        </div>

        <div>
          <label for="task-link-to-project">Link to a Project</label>
          <input type="text" id="task-link-to-project" name="projectTitle" placeholder="Project's Title"
            aria-placeholder="Project Title">
        </div>

        <button type="submit" class="submit-button form-button">
          Done
        </button>
        <button type="button" class="delete-button form-button">
          Delete
        </button>
        <button type="button" class="cancel-button form-button hidden">
          Cancel
        </button>
      </form>
    `;
    return str;
  }

  if (editorType==="addNewProject") {
    const str = `
      <h1 class="editor-title">Add New Project</h1>
      <form>
        <div>
          <label for="task-title">
            Project Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Project" aria-placeholder="My Project"
          required>
        </div>

          <div>
            <label>
              Completed?
              <span aria-label="Required"><strong>*</strong></span>
            </label>
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
            name="description"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <label>
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </label>

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

        <div id="group-related-tasks">
          <label>Group Related Tasks</label>

          <!-- dynamically load all recent tasks here -->
          <div class="group-related-tasks-wrapper">

          </div>
        </div>

        <button type="submit" class="submit-button form-button">
          Done
        </button>
        <button type="button" class="delete-button form-button hidden">
          Delete
        </button>
        <button type="button" class="cancel-button form-button">
          Cancel
        </button>
      </form>
    `;
    return str;
  }

  if (editorType==="viewEditProject") {
    const str = `
      <h1 class="editor-title">View/Edit Project</h1>
      <form>
        <div>
          <label for="task-title">
            Project Title
            <span aria-label="Required"><strong>*</strong></span>
            <span class="error-msg hidden" aria-hidden="true">Task Already Exists!</span>
          </label>
          <input type="text" id="task-title" name="title" placeholder="My Project" aria-placeholder="My Project"
          required>
        </div>

        <div>
          <label>
            Completed?
            <span aria-label="Required"><strong>*</strong></span>
          </label>
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
            name="description"></textarea>
        </div>

        <div>
          <label for="task-due-date">
            Due date
          </label>
          <input type="date" id="task-due-date" name="dueDate">
        </div>

        <div id="priority-radio-buttons">
          <label>
            Priority
            <span aria-label="Required"><strong>*</strong></span>
          </label>

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

        <div id="group-related-tasks">
          <label>Group Related Tasks</label>
          
          <!-- dynamically load all recent tasks here -->
          <div class="group-related-tasks-wrapper">

          </div>
        </div>

        <button type="submit" class="submit-button form-button">
          Done
        </button>
        <button type="button" class="delete-button form-button">
          Delete
        </button>
        <button type="button" class="cancel-button form-button hidden">
          Cancel
        </button>
      </form>
    `
    return str;
  }
}