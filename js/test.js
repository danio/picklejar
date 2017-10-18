var OutputConsole = require('../output/outputconsole');
var runtests = require('../testrunner/runtests');

var output = OutputConsole();
runtests.runTests(['features'], output);
