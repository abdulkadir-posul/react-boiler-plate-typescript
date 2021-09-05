const storage = global.localStorage;

const exportedObject = {
  get: (key: string) => storage && storage.getItem(key),
  set: (key: string, value: string) => storage && storage.setItem(key, value),
  remove: (key: string) => storage && storage.removeItem(key),
  clear: () => storage && storage.clear(),
};

export default exportedObject;
