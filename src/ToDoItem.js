import { format } from "date-fns";
import { addDays } from "date-fns";

export default class toDoItem {
  //default values
  constructor(
    title = "Untitled",
    description = "No Description",
    dueDate = format(addDays(new Date(), 7), "MM-dd-yyyy"),
    priority = "Medium",
    checkList = [],
    isComplete = false,
    projectTitle = null //not linked to a project
  ) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority; //critical, high, medium, low
    this._checkList = checkList;
    this._isComplete = isComplete;
    this._projectTitle = projectTitle;
  }

  get title() {
    return this._title;
  }
  set title(newTitle) {
    if (typeof newTitle !== "string" || newTitle.trim() === "") {
      throw new Error("Title is invalid");
    }
    this._title = newTitle.trim();
  }

  get description() {
    return this._description;
  }
  set description(newDescription) {
    if (typeof newDescription !== "string" || newDescription.trim() === "") {
      throw new Error("Description is invalid");
    }
    this._description = newDescription;
  }

  get dueDate() {
    return this._dueDate;
  }
  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }

  get priority() {
    return this._priority;
  }
  set priority(newPriority) {
    this._priority = newPriority;
  }

  get checkList() {
    return this._checkList;
  }

  get isComplete() {
    return this._isComplete;
  }
  set isComplete(bool) {
    this._isComplete = bool;
  }

  get projectTitle() {
    return this._projectTitle;
  }
  set projectTitle(newProjectTitle) {
    if (!newProjectTitle) {
      this._projectTitle = null;
      return;
    }
    this._projectTitle = newProjectTitle.trim();
  }
}