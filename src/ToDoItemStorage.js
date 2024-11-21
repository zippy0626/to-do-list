//This is for "global" items not linked with projects
const ToDoItemStorage = (function() {
  let storage = [];
  const storageMap = new Map();
  //used for fast searching
  //where keys are item's titles
  //where values are arrays

  return {
    add(newTodo) {
      const items = Array.isArray(newTodo) ? newTodo : [newTodo];

      for (const item of items) {
        if (!item || !item.title) {
          throw new Error("Please provide a valid item");
        };

        storage.push(item);
  
        if (storageMap.has(item.title)) {
          storageMap.get(item.title).push(item)
        } else {
          storageMap.set(item.title, [item])
        };
      };
    },

    remove(toDoItem) { //fix this
      if (!toDoItem || !toDoItem.title) {
        throw new Error("Please provide a valid item");
      };
      
      storage = storage.filter((eachItem) => eachItem!=toDoItem);

      if (storageMap.has(toDoItem.title)) {
        const otherDuplicateItems = storageMap.get(toDoItem.title)
          .filter((eachItem) => eachItem!=toDoItem);
        
        if (!otherDuplicateItems.length) {
          storageMap.delete(toDoItem.title);
        } else {
          storageMap.set(toDoItem.title, otherDuplicateItems);//set other items
        };
      }
    },
    
    //case sensitive
    getItem(itemTitle) {//fix this
      if (storageMap[itemTitle]) return storageMap[itemTitle.trim()];
      throw new Error(`Item ${itemTitle} could not be found in storage`);
    },

    getStorage() {
      return storage;
    },
  };
})();

export default ToDoItemStorage;