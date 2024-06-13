export const setItem = (key, value) => {
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (key) => {
  try {
    const parsedValue = JSON.parse(localStorage.getItem(key));
    return parsedValue === null ? undefined : parsedValue;
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
