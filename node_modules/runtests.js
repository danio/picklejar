function runTests(testFilenames, output) {
  // testFilenames a list of filenames, or to run all tests,
  // the path to a test directory.
  output.clearOutput();
  output.output("Running behave " + testFilenames.join(' '));
  var spawn = require("child_process").spawn;
  var clearNeeded = true;
  testRun = spawn('behave', testFilenames);
  testRun.stdout.on('data', function(data) {
    var str = String(data);
    var lines = str.split(/[\r\n]+/g);
    if (clearNeeded) {
      output.clearOutput();
      clearNeeded = false;
    }
    lines.forEach(function(line) {
      output.output(line);
  	});
  });
  testRun.stderr.on('data', function(data) {
    output.error(`ERR ${data}`);
  });
  testRun.on('close', function(code) {
    output.done();
  });
}

exports.runTests = runTests;
