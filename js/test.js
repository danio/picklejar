var output = require('outputconsole');

var runtests = require('runtests');
var document;
runtests.runTests(['features'], output, document);
