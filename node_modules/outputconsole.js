module.exports = OutputConsole;

function OutputConsole() {
  if (!(this instanceof OutputConsole))
    return new OutputConsole();
}

OutputConsole.prototype.output = function(text) {
  console.log(`OUT ${text}`);
}

OutputConsole.prototype.error = function(text) {
  console.log(`ERR ${text}`);
}

OutputConsole.prototype.done = function() {
  console.log("EOF");
}

OutputConsole.prototype.clearOutput = function() {
  console.log("CLS");
}
