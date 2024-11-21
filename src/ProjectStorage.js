//This is storage for all Projects
const ProjectStorage = (function() {
  let storage = [];
  const storageMap = new Map();
  //used for fast searching
  //where keys are project titles
  //where values are project objects

  return {
    add(newProject) {
      if (!newProject || !newProject.title) {
        throw new Error("Please provide a valid project");
      };

      if (storageMap.has(newProject.title)) {
        throw new Error("Cannot have duplicate project title");
      } else {
        storage.set(newProject.title, newProject);
        storage.push(newProject);
      };
    },
    remove(project) { //fix this
      if (!project || !project.title) {
        throw new Error("Please provide a valid project");
      };

      storage = storage.filter((eachItem) => eachItem!=project);

      if (storageMap.has(project.title)) {
        const otherDuplicateItems = storageMap.get(project.title)
          .filter((eachItem) => eachItem!=toDoItem);
        
        if (!otherDuplicateItems.length) {
          storageMap.delete(project.title);
        } else {
          storageMap.set(project.title, otherDuplicateItems);
        };
      }
    },
    get(projectTitle) {//case sensitive
      if (storageMap.get(projectTitle)) return storageMap.get(projectTitle);
      throw new Error(`Project "${projectTitle}" could not be found in storage`);
    },
    storage() {
      return storage;
    },
    map() {
      return storageMap;
    },
  };
})

export default ProjectStorage;