module.exports = GherkinParser;

/// Parse the output of gherkin
function GherkinParser() {
  if (!(this instanceof GherkinParser))
    return new GherkinParser();

  this.matchers_ = [
    {name: 'assertionFailed', re: /Assertion Failed/},
    {name: 'summaryError', re: /[1-9]0* failed/},
    {name: 'failingScenariosStart', re: /Failing scenarios:/}
  ]
}

GherkinParser.prototype.getClass = function(line) {
  var lineClass =  'line';
  this.matchers_.forEach( function(x) {
    if (x.re.test(line))
      lineClass = x.name;
  } );
  return lineClass;
}
