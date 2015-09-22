function output(text) {
  // console.log(text);
  document.write(text + "<br>");
}

var runtests = require('runtests');
output('running tests')
runtests.runTests(['features'], output);
