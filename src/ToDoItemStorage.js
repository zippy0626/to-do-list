//IIFE module, needs return statement
//create read update delete - CRUD

const ToDoItemStorage = (function() {
  let storage = [];
  const storageMap = new Map();
  //used for fast searching
  //where keys are item's titles
  //where values are arrays

  return {
    addItem(item) {
      const items = Array.isArray(item) ? item : [item];

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

    removeItem(item) {
      if (!item || !item.title) {
        throw new Error("Please provide a valid item");
      };
      
      storage = storage.filter((eachItem) => eachItem!=item);

      if (storageMap.has(item.title)) {
        const otherDuplicateItems = storageMap.get(item.title)
          .filter((eachItem) => eachItem!=item);
        
        if (!otherDuplicateItems.length) {
          storageMap.delete(item.title);
        } else {
          storageMap.set(item.title, otherDuplicateItems);
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