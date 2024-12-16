const Storage = {
  //where key is a task title/project title
  //where object is an object
  set(key, object) {
    if (!key) {
      throw new Error("Please provide a valid key");
    };
    if (!object) {
      throw new Error("Please provide valid data");
    };
    //allow updating
    localStorage.setItem(key, JSON.stringify(object));
  },

  getItem(key) {
    if (!key) {
      throw new Error("Please provide a valid key");
    };
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Invalid JSON for key "${key}". Returning raw value.`);
      return item;
    }
  },

  getKey(index) {
    if (typeof index === "string") {
      throw new Error("Please provide a valid index");
    }
    return localStorage.key(index);
  },

  remove(key){
    if (!key) {
      throw new Error("Please provide a valid key");
    };
    localStorage.removeItem(key);
  },

  clearAll() {
    localStorage.clear();
  },
  
};

export default Storage;
