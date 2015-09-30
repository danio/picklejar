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
var folder_view = nw.require('folder_view');


function runTests() {
  runtests.runTests(['features'], output, document);
}

var folder = new folder_view.Folder($('#filebrowser'));
folder.open(cwd() + '/features');

runTests();
