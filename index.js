var Mash = require('./support/js/Mash');
var Alea = require('./support/js/Alea');
var KISS07 = require('./support/js/KISS07');
var Kybos = require('./support/js/Kybos');
var LFib = require('./support/js/LFib');
var LFib4 = require('./support/js/LFIB4');
var MRG32k3a = require('./support/js/MRG32k3a');
var Xorshift03 = require('./support/js/Xorshift03');


(function(module) {
  
  var _seed = +new Date();
  var rand = null;
  
  function random(generator, from, to) {
    if(!rand) rand = generator(_seed);
    
    if (typeof from !== 'undefined' && typeof to === 'undefined') {
      return from * rand() | 0;
    } else if (typeof from !== 'undefined' && typeof to !== 'undefined') {
      return ((to - from) * rand() + from) | 0;
    } else {
      return rand();
    }
  }
  
  function exports() {
    return random.apply(this, [Alea].concat( Array.prototype.slice.call(arguments) ) );
  }
  
  var seed = function(newSeed) {
    _seed = newSeed;
  }
   
  exports.Alea = random.bind(this, Alea);
  exports.KISS07 = random.bind(this, KISS07);
  exports.Kybos = random.bind(this, Kybos);
  exports.LFib = random.bind(this, LFib);
  exports.LFib4 = random.bind(this, LFib4);
  exports.MRG32k3a = random.bind(this, MRG32k3a);
  exports.Xorshift03 = random.bind(this, Xorshift03);
  
  var keys = Object.keys(exports);
  for(var i = 0, l = keys.length; i < l; i++) {
    exports[keys[i]].seed = seed;
  }
  
  exports.seed = seed;
  
  module.exports = exports;
  
})(typeof module === 'undefined' ? this['prng'] = {} : module);