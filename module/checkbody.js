function checkbody(body, keys) {
  let isOkay = true;
  for (let fields of keys) {
    if (!body[fields] || body[fields] === "") {
      isOkay = false;
    }
  }
  return isOkay;
}

module.exports = { checkbody };
