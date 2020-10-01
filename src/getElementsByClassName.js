const getElementsByClassName = (target) => {
  const resultArr = [];
  classFinder(document.body, target);
  function classFinder(element, target) {
    if (element.className.includes(target)) {
      resultArr.push(element);
    }
    if (element.children) {
      for (const child of element.children) {
        classFinder(child, target);
      }
    }
  }
  return resultArr;
};
module.exports = { getElementsByClassName };
