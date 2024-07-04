export const compareExact = (template, obj) => {
  let templateKeys = Object.keys(template);

  if (templateKeys.length === Object.keys(obj).length) {
    return templateKeys.every(
      (key) => obj.hasOwnProperty(key) && obj[key] === template[key]
    );
  }
  return false;
};

export const compareSparse = (template, obj) => {
  let templateKeys = Object.keys(template);

  return templateKeys.every(
    (key) => obj.hasOwnProperty(key) && obj[key] === template[key]
  );
};
