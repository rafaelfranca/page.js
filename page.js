;(function() {
  var root = this;
  var capitalize = function(word) {
    return word.charAt(0).toUpperCase()+word.slice(1);
  };

  var Page = function() {
    this.registry = {};
  };

  Page.prototype.recognize = function(options) {
    var parts = options.page.split("#"),
        prefix = parts[0],
        action = parts[1],
        registered = this.registry[options.page];

    this.callAction(capitalize(prefix) + "Page", action);
    if(registered) {
      for (var i = 0; i < registered.length; i++) {
        this.callAction(registered[i], action);
      };
    }
  };

  Page.prototype.at = function(scope, constant) {
    this.registry[scope] = this.registry[scope] || [];
    this.registry[scope].push(constant);
  };

  Page.prototype.materialize = function(name) {
    if(root[name]) {
      return new root[name]();
    }
  };

  Page.prototype.callAction = function(klass, action) {
    var o = this.materialize(klass);
    if(o && o[action]) o[action]();
  }

  root.page = new Page;
})();