var runtests = require('runtests');
var output = require('outputdocument');

function runTests() {
  runtests.runTests(['features'], output, document);
}

runTests();
