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
    return JSON.parse(localStorage.getItem(key))
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
