global.$ = $; // seems to be needed so modules (e.g. folder_view) can use jquery

var path = nw.require('path');
var runtests = nw.require('runtests');
var OutputDocument = nw.require('outputdocument');
var folder_view = nw.require('folder_view');
var MruDirCache = nw.require("mru-dir-cache");

var output = OutputDocument(document);

function runTests(testPaths) {
  runtests.runTests(testPaths, output);
}

function fileChanged(filepath) {
  if (filepath) {
    var dir = path.dirname(filepath);
    cache.store(dir, '');
    folder.open(dir);
  }
}

$('#runAllTests').on('click', function() { runTests([folder.dir]); });
$('#openFile').on('click', function() { $('#folderName').trigger('click'); });
$('#folderName').on('change', function() { fileChanged($('#folderName').val()); });

var folder = new folder_view.Folder($('#filebrowser'));

folder.on('navigate', function(path, mime) {
  if (mime.type === 'folder') {
    folder.open(path);
  } else {
    runTests([path]);
  }
});

var cache = MruDirCache({ max: 10 }, localStorage);
var latest = cache.latest();
if (latest) {
  folder.open(latest);
  runTests([folder.dir]);
}
else {
  // first time app has been run
  $('#folderName').trigger('click'); // open file browser
}
