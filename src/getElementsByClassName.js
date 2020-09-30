const getElementsByClassName = (target) => {
  const resultArr = [];
  recursive(document.body, target);
  function recursive(element, target) {
    if (element.className.includes(target)) {
      resultArr.push(element);
    }
    if (element.children) {
      for (const child of element.children) {
        recursive(child, target);
      }
    }
  }
  return resultArr;
};
module.exports = { getElementsByClassName };
