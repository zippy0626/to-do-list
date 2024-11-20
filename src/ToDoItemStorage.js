//IIFE module, needs return statement
//create read update delete - CRUD

//This is for "global" items not linked with projects
const ToDoItemStorage = (function() {
  let storage = [];
  const storageMap = new Map();
  //used for fast searching
  //where keys are item's titles
  //where values are arrays

  return {
    addItem(newItem) {
      const items = Array.isArray(newItem) ? newItem : [newItem];

      for (const item of items) {
        if (!item || !item.title) {
          throw new Error("Please provide a valid item");
        };

        storage.push(item);
  
        if (storageMap.has(item.title)) {
          storageMap.get(item.title).push(item)
        } else {
          storageMap.set(item.title, [item]) //initiate new array in map
        };
      };
    },

    removeItem(Item) {
      if (!Item || !Item.title) {
        throw new Error("Please provide a valid item");
      };
      
      storage = storage.filter((eachItem) => eachItem!=Item);

      if (storageMap.has(Item.title)) {
        const otherDuplicateItems = storageMap.get(Item.title)
          .filter((eachItem) => eachItem!=Item);
        
        if (!otherDuplicateItems.length) {
          storageMap.delete(Item.title);
        } else {
          storageMap.set(Item.title, otherDuplicateItems);//set new items
        };
      }
    },
    
    getItem(itemTitle) {//case sensitive
      if (!itemTitle || typeof itemTitle !== "string") {
        throw new Error("Please provide a valid item title");
      }
      return storageMap.get(itemTitle.trim())
    },

    getStorage() {
      return storage;
    },
  };
})();

export default ToDoItemStorage;