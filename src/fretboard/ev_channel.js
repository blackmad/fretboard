// Generated by CoffeeScript 1.7.1
(function () {
  var Emitter,
    emitter,
    __slice = [].slice;

  Emitter = function () {
    var callbacks, callbacks_map, pub, sub, unsub;
    callbacks = {};
    sub = function (ev, callback) {
      var evs, name, _i, _len, _results;
      evs = ev.split(" ");
      _results = [];
      for (_i = 0, _len = evs.length; _i < _len; _i++) {
        name = evs[_i];
        callbacks[name] || (callbacks[name] = []);
        _results.push(callbacks[name].push(callback));
      }
      return _results;
    };
    pub = function () {
      var args, callback, ev, _i, _len, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      ev = args.shift();
      if (!callbacks[ev]) {
        return;
      }
      _ref = callbacks[ev];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        if (callback.apply(null, args) === false) {
          break;
        }
      }
      return true;
    };
    unsub = function (ev, callback) {
      var cb, evs, i, list, name, _i, _len, _results;
      evs = ev.split(" ");
      _results = [];
      for (_i = 0, _len = evs.length; _i < _len; _i++) {
        name = evs[_i];
        list = callbacks[name];
        if (!list) {
          continue;
        }
        if (!callback) {
          delete callbacks[name];
          continue;
        }
        _results.push(
          // eslint-disable-next-line no-loop-func
          (function () {
            var _j, _len1, _results1;
            _results1 = [];
            for (i = _j = 0, _len1 = list.length; _j < _len1; i = ++_j) {
              cb = list[i];
              if (!(cb === callback)) {
                continue;
              }
              list = list.slice();
              list.splice(i, 1);
              callbacks[name] = list;
              break;
            }
            return _results1;
          })()
        );
      }
      return _results;
    };
    callbacks_map = function () {
      return callbacks;
    };
    return {
      sub: sub,
      pub: pub,
      unsub: unsub,
      callbacks_map: callbacks_map,
    };
  };

  emitter = new Emitter();

  module.exports = {
    emitter: emitter,
    Emitter: Emitter,
  };
}.call(this));
