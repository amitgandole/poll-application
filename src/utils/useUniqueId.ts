const generateUniqueId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export default generateUniqueId;
