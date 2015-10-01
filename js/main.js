// Make some globals to access nw.js functions in a cross-version way
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

var path = nw.require('path');
var runtests = nw.require('runtests');
var output = nw.require('outputdocument');
var folder_view = nw.require('folder_view');

function runTests() {
  runtests.runTests(['features'], output, document);
}

function fileChanged(filepath) {
  var dir = path.win32.dirname(filepath); // todo make work cross-platform
  folder.open(dir);
}

$('#runTests').on('click', runTests);
$('#openFile').on('click', function() { $('#folderName').trigger('click'); } );
$('#folderName').on('change', function() { fileChanged($('#folderName').val()); });

var folder = new folder_view.Folder($('#filebrowser'));
folder.open(cwd() + '/features');

runTests();
