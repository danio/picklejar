function output(text) {
  console.log(text);
}

var runtests = require('runtests');
output('running tests')
runtests.runTests(['features'], output);
