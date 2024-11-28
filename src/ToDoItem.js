import { format } from "date-fns";
import { addDays } from "date-fns";

export default class toDoItem {
  constructor(
    title = "Untitled",
    description = "No Description",
    dueDate = format(addDays(new Date(), 7), "MM-dd-yyyy"), //default 7 days
    priority = "Medium",
    checkList = [], // {name: , isComplete: ,}
    isComplete = false,
    projectTitleLink = null //not linked to a project
  ) {
    this.title = title;
    this.description = description;
    this.createDate = format(new Date(), "MM-dd-yyyy");
    this.dueDate = dueDate;
    this.priority = priority; //critical, high, medium, low
    this.checkList = checkList;
    this.isComplete = isComplete;
    this.projectTitleLink = projectTitleLink;
  }
}