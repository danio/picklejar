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
