import { format } from "date-fns";
import { addDays } from "date-fns";

export default class toDoItem {
  constructor(
    title = "Untitled",
    description = "No Description",
    dueDate = format(addDays(new Date(), 7), "MM-dd-yyyy"),
    priority = "Medium",
    checkList = [],
    isComplete = false,
    projectID = null //not linked to a project
  ) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority; //critical, high, medium, low
    this._checkList = checkList;
    this._isComplete = isComplete;
    this._projectID = projectID;
  }

  get title() {
    return this._title;
  }
  set title(newTitle) {
    if (typeof newTitle !== "string" || newTitle.trim() === "") {
      throw new Error("Title cannot be Empty!");
    }
    this._title = newTitle.trim();
  }

  get description() {
    return this._description;
  }
  set description(newDescription) {
    if (typeof newDescription !== "string" || newDescription.trim() === "") {
      throw new Error("Description cannot be Empty!");
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

  get projectID() {
    return this._projectID;
  }
  set projectID(newProjectID) {
    if (!newProjectID) {
      this._projectID = null;
      return;
    }
    this._projectID = newProjectID.trim();
  }
}