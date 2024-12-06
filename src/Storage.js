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
    if (localStorage.getItem(key)) {
      throw new Error("Key already exists in storage");
    };
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

  updateItem(key, newObj) {
    if (!this.getItem(key)) {
      throw new Error("Please provide a valid existing key");
    }
    localStorage.setItem(key, JSON.stringify(newObj))
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
