const storage = global.localStorage;

const exportedObject = {
  get: (key) => storage && storage.getItem(key),
  set: (key, value) => storage && storage.setItem(key, value),
  remove: (key) => storage && storage.removeItem(key),
  clear: () => storage && storage.clear(),
};

export default exportedObject;
