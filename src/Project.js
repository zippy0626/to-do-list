import { format } from "date-fns";
import { addDays } from "date-fns";

//This stores To Do items
export default class Project {
  constructor(
    title = "My Project",
    description = "No Description",
    dueDate = format(addDays(new Date(), 14), "MM-dd-yyyy"),
    priority = "Medium",
    isComplete = false,
  ) {
    this.title = title;
    this.description = description;
    this.createDate = format(new Date(), "MM-dd-yyyy");
    this.dueDate = dueDate;
    this.priority = priority; //critical, high, medium, low
    this.isComplete = isComplete;
    this.isProject = true;
    this.taskContainer = []; // {name: , isComplete: ,}
  }

  add(task) {
    if (this.taskContainer.includes(task)) {
      throw new Error("Item is already in the container!");
    }
    task.projectTitle = this.title;
    this.taskContainer.push(task);
  }
  remove(task) {
    const index = this.taskContainer.indexOf(task);
    if (index === -1) {
      throw new Error("Item not found in the container!");
    }

    task.projectTitle = null;
    this.itemContainer.splice(index, 1);
  }
}
