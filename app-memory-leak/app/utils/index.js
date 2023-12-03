const delay = (ms) => {
    const start = Date.now();
    while (Date.now() - start < ms) {}
};
  

module.exports = {delay};