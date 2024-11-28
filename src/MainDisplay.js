/**
 * Generates and returns HTML strings based on the specified display type.
 *
 * @param {"todaysTasks" | "upcomingTasks" | "pastTasksProjects" | "noTodays" | "noUpcoming" | "noPastTasksProjects" } displayType - The type of display to generate. 
 * Possible values:
 * - "todaysTasks": Displays today's tasks with today's date.
 * - "upcomingTasks": Displays upcoming tasks with today's date.
 * - "pastTasksProjects": Displays past tasks/projects with today's date.
 * - "noTodays": Displays a message indicating no tasks found/due for today.
 * - "noUpcoming": Displays a message indicating no upcoming tasks in the future.
 * 
 * @returns {string} - The generated HTML string for the specified display type.
**/

import { format } from "date-fns";

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
  if (displayType==="noTodays") {
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
        <div class="message-wrapper">
          <div class="message">
            No tasks found/due for today.
          </div>
        </div>
      </div>
    </div>
    `
    return str;
  }
  if (displayType==="noUpcoming") {
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
        <div class="message-wrapper">
          <div class="message">
            No upcoming tasks found/due in future.
          </div>
        </div>
      </div>
    </div>
    `;
    return str;
  }
  if (displayType === "noPastTasksProjects") {
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
        <div class="message-wrapper">
          <div class="message">
            No past tasks/projects found.
          </div>
        </div>
      </div>
    </div>
    `;
    return str;
  }
};