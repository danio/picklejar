global.$ = $; // seems to be needed so modules (e.g. folder_view) can use jquery

var path = nw.require('path');
var runtests = nw.require('runtests');
var GherkinParser = require('gherkinparser');
var OutputDocument = nw.require('outputdocument');
var folder_view = nw.require('folder_view');
var MruDirCache = nw.require("mru-dir-cache");

function runTests(testPaths, output) {
  runtests.runTests(testPaths, output);
}

function setDirListFromCache(cache) {
    $('#dirlist').children().remove();
    cache.cache_.keys().forEach( function(x) { $('#dirlist').append('<option>' + x + '</option>'); });
}

function newFolderOpened(filepath, folder, cache) {
  if (filepath) {
    var dir = path.dirname(filepath);
    cache.store(dir, '');
    folder.open(dir);
    setDirListFromCache(cache);
  }
}

$(document).ready(function() {
  var cache = MruDirCache({ max: 10 }, localStorage);
  var gherkinParser = GherkinParser();
  var output = OutputDocument(gherkinParser);
  var folder = new folder_view.Folder($('#filebrowser'));

  $('#runAllTests').on('click', function() { runTests([folder.dir], output); });
  // The file browse button is pressed
  $('#openFile').on('click', function() { $('#folderName').trigger('click'); });
  // The file browse action is completed
  $('#folderName').on('change', function() { newFolderOpened($('#folderName').val(), folder, cache); });
  // dirlist (the folder drop-down list) is clicked on
  $('#dirlist').on('change', function(e) {
    dir = e.target.selectedOptions[0].text;
    cache.store(dir, '');
    folder.open(dir);
  });

  // callback from folder_view when a file is double clicked on
  folder.on('navigate', function(path, mime) {
    if (mime.type === 'folder') {
      folder.open(path);
    } else {
      runTests([path], output);
    }
  });

  var latest = cache.latest();
  if (latest) {
    folder.open(latest);
    setDirListFromCache(cache);
    runTests([folder.dir], output);
  }
  else {
    // first time app has been run
    $('#folderName').trigger('click'); // open file browser
  }
});
