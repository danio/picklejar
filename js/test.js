var OutputConsole = require('outputconsole');
var runtests = require('runtests');

var output = OutputConsole();
runtests.runTests(['features'], output);
