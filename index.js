var Alea = require('./support/js/Alea');
var KISS07 = require('./support/js/KISS07');
var Kybos = require('./support/js/Kybos');
var LFib = require('./support/js/LFib');
var LFib4 = require('./support/js/LFIB4');
var MRG32k3a = require('./support/js/MRG32k3a');
var Xorshift03 = require('./support/js/Xorshift03');


(function() {  
  
  function random(generator) {
    var rand = null;
    return function(seed) {
      var args = Array.prototype.slice.call(arguments);
      rand = args.length
        ? generator.apply(this, args)
        : generator();
      
      function prng(from, to) {        
        if (typeof from !== 'undefined' && typeof to === 'undefined') {
          return from * rand() | 0;
        } else if (typeof from !== 'undefined' && typeof to !== 'undefined') {
          return ((to - from) * rand() + from) | 0;
        } else {
          return rand();
        }
      }
      
      return Object.assign(prng, rand);
    }
  }
  
  var exports = {
    Alea: random(Alea),
    KISS07: random(KISS07),
    Kybos: random(Kybos),
    LFib: random(LFib),
    LFib4: random(LFib4),
    MRG32k3a: random(MRG32k3a),
    Xorshift03: random(Xorshift03)
  };
  
  if (typeof module === 'undefined') {
    this['prng'] = exports;
  } else {
    module.exports = exports;
  }
  
})();