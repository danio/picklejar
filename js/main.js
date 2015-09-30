try {
if (nw)
{
  // nw.js 0.13 or later
  cwd = function() { return nw.process.cwd(); }
}
} catch(e) {
  // nw.js 0.12
  cwd = function() { return process.cwd(); }
  nw = {
    require: function(module) { return require(module);}
  };
}

var runtests = nw.require('runtests');
var output = nw.require('outputdocument');


function runTests() {
  runtests.runTests(['features'], output, document);
}

runTests();
