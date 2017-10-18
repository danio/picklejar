module.exports = OutputDocument;

function OutputDocument(gherkinParser) {
  if (!(this instanceof OutputDocument))
    return new OutputDocument(gherkinParser);

  this.gherkinParser_ = gherkinParser;
}

function output(lineClass, line) {
  $('#output').append(`<span class="${lineClass}">${line}</span><br>`);
}

OutputDocument.prototype.output = function(line) {
  var lineClass = this.gherkinParser_.getClass(line);
  output(lineClass, line);
}

OutputDocument.prototype.error = function(line) {
  output("error", line);
}

OutputDocument.prototype.done = function() {
  $('.error').attr('style', 'color:red');
  $('.assertionFailed').attr('style', 'color:red');
  $('.failingScenariosStart').attr('style', 'color:green');
  $('.summaryError').attr('style', 'color:blue');
}

OutputDocument.prototype.clearOutput = function() {
  $('#output').children().remove()
}
