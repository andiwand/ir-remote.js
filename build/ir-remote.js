var ir = ir || {};

ir.interface = ir.interface || {};

$.extend(ir.interface, {
  load: undefined,  // TODO: void load(callback); void callback(config);
  save: undefined   // TODO: void save(config)
});

var ir = ir || {};

ir.remote = ir.remote || {};

$.extend(ir.remote, {
  _ready: false,
  _observers: [],
  settings: {},
  remotes: [],
  devices: [],

  init: function() {
    if (ir.interface.load) {
      ir.interface.load(ir.remote._onLoaded);
    } else {
      ir.remote._onLoaded(null);
    }
  },
  isReady: function() {
    return ir.remote._ready;
  },
  _fire: function() {
    for(var i = 0; i < ir.remote._observers.length; i++) {
      ir.remote._observers[i]();
    }
  },
  addObserver: function(observer) {
    if (ir.remote._ready) observer();
    ir.remote._observers.push(observer);
  },
  _verify: function(config) {
    // TODO: implement
    return true;
  },
  _load: function(config) {
    if (!config) return;

    // TODO: deep copy
    ir.remote.settings = config.settings;
    ir.remote.remotes = config.remotes;
  },
  _onLoaded: function(config) {
    ir.remote._verify(config);
    ir.remote._load(config);

    ir.remote._ready = true;
    ir.remote._fire();
  },
  save: function() {
    var config = {};

    // TODO: deep copy
    config.settings = ir.remote.settings;
    config.remotes = ir.remote.remotes;

    if (ir.interface.save) {
      ir.interface.save(config);
    } else {
      console.error("could not save config");
      console.error(config);
    }
  }
});
