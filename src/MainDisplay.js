import { format } from "date-fns";

/**
 * Generates HTML templates for different main display types in the app.
 *
 * @param {"todaysTasks" | "upcomingTasks" | "pastTasksProjects"} displayType - The type of display to render. 
 *   - "todaysTasks": Shows tasks for the current day.
 *   - "upcomingTasks": Shows tasks scheduled for future dates.
 *   - "pastTasksProjects": Displays tasks and projects from the past.
 * @returns {string} A string containing the HTML for the requested display type.
 */

export default function getMainDisplayAs(displayType) {
  // upcomingTasks, todaysTasks, pastTasksProjects
  // also handle if user has NO tasks/project

  let dateToday = format(new Date(), "MM-dd-yyyy");

  if (displayType==="todaysTasks") {
    const str = `
    <div class="main-title-date-wrapper">
      <h1 class="main-title">
        Today's Tasks
      </h1>
      <h2 class="main-date">
        ${dateToday}
      </h2>
    </div>

    <div class="card-container-wrapper">
      <!-- load stuff here -->
      <div class="card-container">

      </div>
    </div>
    `;
    return str;
  }
  if (displayType==="upcomingTasks") {
    const str = `
      <div class="main-title-date-wrapper">
      <h1 class="main-title">
        Upcoming Tasks
      </h1>
      <h2 class="main-date">
        ${dateToday}
      </h2>
    </div>

    <div class="card-container-wrapper">
      <!-- load stuff here -->
      <div class="card-container">

      </div>
    </div>
    `;
    return str;
  }
  if (displayType==="pastTasksProjects") {
    const str = `
      <div class="main-title-date-wrapper">
      <h1 class="main-title">
        Past Tasks/Projects
      </h1>
      <h2 class="main-date">
        ${dateToday}
      </h2>
    </div>

    <div class="card-container-wrapper">
      <!-- load stuff here -->
      <div class="card-container">

      </div>
    </div>
    `;
    return str;
  }
};