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
    const addNewTaskForm = `
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
              <input type="radio" id="task-priority-low" name="priority" required>
              <label for="task-priority-low" class="low">Low</label>
            </div>
            <div>
              <input type="radio" id="task-priority-medium" name="priority">
              <label for="task-priority-medium" class="medium">Medium</label>
            </div>
            <div>
              <input type="radio" id="task-priority-high" name="priority">
              <label for="task-priority-high" class="high">High</label>
            </div>
            <div>
              <input type="radio" id="task-priority-critical" name="priority">
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

        <button type="submit" class="submit-button">
          Done
        </button>
      </form>
    `
    return addNewTaskForm;
  };

  if (editorType==="viewEditTask") {
    const viewEditForm = `
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
              <input type="radio" id="task-priority-low" name="priority" required>
              <label for="task-priority-low" class="low">Low</label>
            </div>
            <div>
              <input type="radio" id="task-priority-medium" name="priority">
              <label for="task-priority-medium" class="medium">Medium</label>
            </div>
            <div>
              <input type="radio" id="task-priority-high" name="priority">
              <label for="task-priority-high" class="high">High</label>
            </div>
            <div>
              <input type="radio" id="task-priority-critical" name="priority">
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

        <button type="submit" class="submit-button">
          Done
        </button>
      </form>
    `;
    return viewEditForm;
  }

  if (editorType==="addNewProject") {
    const addNewProjectForm = `
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
            <input type="radio" id="task-priority-low" name="priority" required>
            <label for="task-priority-low" class="low">Low</label>
          </div>
          <div>
            <input type="radio" id="task-priority-medium" name="priority">
            <label for="task-priority-medium" class="medium">Medium</label>
          </div>
          <div>
            <input type="radio" id="task-priority-high" name="priority">
            <label for="task-priority-high" class="high">High</label>
          </div>
          <div>
            <input type="radio" id="task-priority-critical" name="priority">
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

      <button type="submit" class="submit-button">
        Done
      </button>
    </form>
    `;
    return addNewProjectForm;
  }

  if (editorType==="viewEditProject") {
    const viewEditProject = `
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
            <input type="radio" id="task-priority-low" name="priority" required>
            <label for="task-priority-low" class="low">Low</label>
          </div>
          <div>
            <input type="radio" id="task-priority-medium" name="priority">
            <label for="task-priority-medium" class="medium">Medium</label>
          </div>
          <div>
            <input type="radio" id="task-priority-high" name="priority">
            <label for="task-priority-high" class="high">High</label>
          </div>
          <div>
            <input type="radio" id="task-priority-critical" name="priority">
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

      <button type="submit" class="submit-button">
        Done
      </button>
    </form>
    `
    return viewEditProject;
  }
}