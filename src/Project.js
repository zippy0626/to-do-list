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
    itemContainer = []
  ) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority; //critical, high, medium, low
    this._isComplete = isComplete;
    this._itemContainer = itemContainer;
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
    this._description = newDescription.trim();
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

  get isComplete() {
    return this._isComplete;
  }
  set isComplete(bool) {
    this._isComplete = bool;
  }

  get itemContainer() {
    return this._itemContainer;
  }

  add(Item) {
    Item.projectID = this._title;
    this._itemContainer.push(Item);
  }
  remove(Item) {
    Item.projectID = null;
    this._itemContainer = this._itemContainer.filter(
      (eachItem) => eachItem !== Item
    );
  }
}
