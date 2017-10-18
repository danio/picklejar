// maintain the most recently used directories
var LRU = require('lru-cache');

module.exports = MruDirCache;

// options - object containing:
// - max: maximum number of entries to store
// storage - storage mechanism with interface matching localStorage
function MruDirCache(options, storage) {
  if (!(this instanceof MruDirCache))
    return new MruDirCache(options, storage);

    this.cache_ = LRU(options);
    this.storage_ = storage;
    this.storageKey_ = 'MRU';
    var storedData = this.storage_.getItem(this.storageKey_);
    if (storedData) {
      this.cache_.load(JSON.parse(storedData));
    }
}

// return the most recent directory
MruDirCache.prototype.latest = function () {
  return this.cache_.keys()[0]
}

MruDirCache.prototype.store = function (dir, value) {
  this.cache_.set(dir, '');
  var d = JSON.stringify(this.cache_.dump());
  this.storage_.setItem(this.storageKey_, d);
}
