function somar(x, y) {
  if (typeof x != "number") {
    return "erro";
  }
  return x + y;
}

exports.somar = somar;
