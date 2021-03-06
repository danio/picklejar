// Based on folder_view.js from nw.js file explorer sample app
var events = require('events');
var fs = require('fs');
var path = require('path');
var jade = require('jade');
var util = require('util');
var mime = require('./mime');

// Template engine
var gen_files_view = jade.compile([
    '- each file in files',
    '  .file(data-path="#{file.path}")',
    '    .icon',
    '      img(src="icons/#{file.type}.png")',
    '    .name #{file.name}',
].join('\n'));

// Our type
function Folder(jquery_element) {
  events.EventEmitter.call(this);
  this.element = jquery_element;

  var self = this;
  // Click on blank
  this.element.parent().on('click', function() {
    self.element.children('.focus').removeClass('focus');
  });
  // Click on file
  this.element.delegate('.file', 'click', function(e) {
    self.element.children('.focus').removeClass('focus');
    $(this).addClass('focus');
    e.stopPropagation();
  });
  // Double click on file
  this.element.delegate('.file', 'dblclick', function() {
    var file_path = $(this).attr('data-path');
    self.emit('navigate', file_path, mime.stat(file_path));
  });
}

util.inherits(Folder, events.EventEmitter);

Folder.prototype.open = function(dir, showFolders) {
  var self = this;
  self.dir = dir;
  fs.readdir(dir, function(error, files) {
    if (error) {
      console.log(error);
      window.alert(error);
      return;
    }

    files = files.map(function(x) { return mime.stat(path.join(dir, x)); });
    if (showFolders) {
      var parentDirFile = mime.stat(path.join(dir, '..'));
      parentDirFile.name = '..';
      files = [parentDirFile].concat(files);
    }
    else {
      files = files.filter(function(x) { return x.type != 'folder'; });
    }

    self.element.html(gen_files_view({ files: files }));
    // styling to set the icon image size - should be in style.css but not yet worked out how to give jade generated images a class
    $('.file .icon').children().attr('height', 20)
  });
}

exports.Folder = Folder;
