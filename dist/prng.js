function __require__(module) {
  var path = module.split('/');
  var mod = path[path.length - 1].split('.');
  mod = mod.slice(0, mod.length - 1 == 0 ? 1 : mod.length - 1).join('').toLowerCase();
  return this[mod].exports;
}
(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  // Johannes Baagøe <baagoe@baagoe.com>, 2010
  function Mash() {
    var n = 0xefc8249d;

    var mash = function(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };

    mash.version = 'Mash 0.9';
    return mash;
  }
  
  module.exports = Mash;

})(typeof module === 'undefined' ? this['mash'] = {} : module);

var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function Alea() {
    return (function(args) {
      // Johannes Baagøe <baagoe@baagoe.com>, 2010
      var s0 = 0;
      var s1 = 0;
      var s2 = 0;
      var c = 1;

      if (args.length == 0) {
        args = [+new Date];
      }
      var mash = Mash();
      s0 = mash(' ');
      s1 = mash(' ');
      s2 = mash(' ');

      for (var i = 0; i < args.length; i++) {
        s0 -= mash(args[i]);
        if (s0 < 0) {
          s0 += 1;
        }
        s1 -= mash(args[i]);
        if (s1 < 0) {
          s1 += 1;
        }
        s2 -= mash(args[i]);
        if (s2 < 0) {
          s2 += 1;
        }
      }
      mash = null;

      var random = function() {
        var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
      };
      random.uint32 = function() {
        return random() * 0x100000000; // 2^32
      };
      random.fract53 = function() {
        return random() + 
          (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
      };
      random.version = 'Alea 0.9';
      random.args = args;
      return random;

    } (Array.prototype.slice.call(arguments)));
  };
  
  module.exports = Alea;

})(typeof module === 'undefined' ? this['alea'] = {} : module);

var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function KISS07() {
    return (function(args) {
      // George Marsaglia, 2007-06-23
      //http://groups.google.com/group/comp.lang.fortran/msg/6edb8ad6ec5421a5
      var x = 123456789;
      var y = 362436069;
      var z =  21288629;
      var w =  14921776;
      var c = 0;

      if (args.length == 0) {
        args = [+new Date];
      }
      var mash = Mash();
      for (var i = 0; i < args.length; i++) {
        x ^= mash(args[i]) * 0x100000000; // 2^32
        y ^= mash(args[i]) * 0x100000000;
        z ^= mash(args[i]) * 0x100000000;
        w ^= mash(args[i]) * 0x100000000;
      }
      if (y === 0) {
        y = 1;
      }
      c ^= z >>> 31;
      z &= 0x7fffffff;
      if ((z % 7559) === 0) {
        z++;
      }
      w &= 0x7fffffff;
      if ((w % 7559) === 0) {
        w++;
      }
      mash = null;

      var uint32 = function() {
        var t;

        x += 545925293;
        x >>>= 0;

        y ^= y << 13;
        y ^= y >>> 17;
        y ^= y << 5;

        t = z + w + c;
        z = w;
        c = t >>> 31;
        w = t & 0x7fffffff;

        return x + y + w >>> 0;
      };

      var random = function() {
        return uint32() * 2.3283064365386963e-10; // 2^-32
      };
      random.uint32 = uint32;
      random.fract53 = function() {
        return random() +
          (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
      };
      random.args = args;
      random.version = 'KISS07 0.9';

      return random;
    } (Array.prototype.slice.call(arguments)));
  };

  module.exports = KISS07;

})(typeof module === 'undefined' ? this['kiss07'] = {} : module);

var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function Kybos() {
    return (function(args) {
      // Johannes Baagøe <baagoe@baagoe.com>, 2010
      var s0 = 0;
      var s1 = 0;
      var s2 = 0;
      var c = 1;
      var s = [];
      var k = 0;

      var mash = Mash();
      var s0 = mash(' ');
      var s1 = mash(' ');
      var s2 = mash(' ');
      for (var j = 0; j < 8; j++) {
        s[j] = mash(' ');
      }

      if (args.length == 0) {
        args = [+new Date];
      }
      for (var i = 0; i < args.length; i++) {
        s0 -= mash(args[i]);
        if (s0 < 0) {
          s0 += 1;
        }
        s1 -= mash(args[i]);
        if (s1 < 0) {
          s1 += 1;
        }
        s2 -= mash(args[i]);
        if (s2 < 0) {
          s2 += 1;
        }
        for (var j = 0; j < 8; j++) {
          s[j] -= mash(args[i]);
          if (s[j] < 0) {
            s[j] += 1;
          }
        }
      }

      var random = function() {
        var a = 2091639;
        k = s[k] * 8 | 0;
        var r = s[k];
        var t = a * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        s2 = t - (c = t | 0);
        s[k] -= s2;
        if (s[k] < 0) {
          s[k] += 1;
        }
        return r;
      };
      random.uint32 = function() {
        return random() * 0x100000000; // 2^32
      };
      random.fract53 = function() {
        return random() +
          (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
      };
      random.addNoise = function() {
        for (var i = arguments.length - 1; i >= 0; i--) {
          for (j = 0; j < 8; j++) {
            s[j] -= mash(arguments[i]);
            if (s[j] < 0) {
              s[j] += 1;
            }
          }
        }
      };
      random.version = 'Kybos 0.9';
      random.args = args;
      return random;

    } (Array.prototype.slice.call(arguments)));
  };
  
  module.exports = Kybos;

})(typeof module === 'undefined' ? this['kybos'] = {} : module);

var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function LFib() {
    return (function(args) {
      // Johannes Baagøe <baagoe@baagoe.com>, 2010
      var k0 = 255,
          k1 = 52,
          k2 = 0;
      var s = [];

      var mash = Mash();
      if (args.length === 0) {
        args = [+new Date()];
      }
      for (var j = 0; j < 256; j++) {
        s[j] = mash(' ');
        s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21
        if (s[j] < 0) {
          s[j] += 1;
        }
      }
      for (var i = 0; i < args.length; i++) {
        for (var j = 0; j < 256; j++) {
          s[j] -= mash(args[i]);
          s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21
          if (s[j] < 0) {
            s[j] += 1;
          }
        }
      }
      mash = null;

      var random = function() {
        k0 = (k0 + 1) & 255;
        k1 = (k1 + 1) & 255;
        k2 = (k2 + 1) & 255;

        var x = s[k0] - s[k1];
        if (x < 0.0) {
          x += 1.0;
        }
        x -= s[k2];
        if (x < 0.0) {
          x += 1.0;
        }
        return s[k0] = x;
      }

      random.uint32 = function() {
        return random() * 0x100000000 >>> 0; // 2^32
      };
      random.fract53 = random;
      random.version = 'LFib 0.9';
      random.args = args;

      return random;
    } (Array.prototype.slice.call(arguments)));
  };
  
  module.exports = LFib;

})(typeof module === 'undefined' ? this['lfib'] = {} : module);
var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function LFIB4() {
    return(function(args) {
      // George Marsaglia's LFIB4,
      //http://groups.google.com/group/sci.crypt/msg/eb4ddde782b17051
      var k0 = 0,
          k1 = 58,
          k2 = 119,
          k3 = 178;

      var s = [];

      var mash = Mash();
      if (args.length === 0) {
        args = [+new Date()];
      }
      for (var j = 0; j < 256; j++) {
        s[j] = mash(' ');
        s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21
        if (s[j] < 0) {
          s[j] += 1;
        }
      }
      for (var i = 0; i < args.length; i++) {
        for (var j = 0; j < 256; j++) {
          s[j] -= mash(args[i]);
          s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21
          if (s[j] < 0) {
            s[j] += 1;
          }
        }
      }
      mash = null;

      var random = function() {
        var x;

        k0 = (k0 + 1) & 255;
        k1 = (k1 + 1) & 255;
        k2 = (k2 + 1) & 255;
        k3 = (k3 + 1) & 255;

        x = s[k0] - s[k1];
        if (x < 0) {
          x += 1;
        }
        x -= s[k2];
        if (x < 0) {
          x += 1;
        }
        x -= s[k3];
        if (x < 0) {
          x += 1;
        }

        return s[k0] = x;
      }

      random.uint32 = function() {
        return random() * 0x100000000 >>> 0; // 2^32
      };
      random.fract53 = random;
      random.version = 'LFIB4 0.9';
      random.args = args;

      return random;
    } (Array.prototype.slice.call(arguments)));
  };
  
  module.exports = LFIB4;

})(typeof module === 'undefined' ? this['lfib4'] = {} : module);
var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function MRG32k3a() {
    return (function(args) {
      // Copyright (c) 1998, 2002 Pierre L'Ecuyer, DIRO, Université de Montréal.
      // http://www.iro.umontreal.ca/~lecuyer/
      var m1 = 4294967087;
      var m2 = 4294944443;
      var s10 = 12345,
          s11 = 12345,
          s12 = 123,
          s20 = 12345,
          s21 = 12345,
          s22 = 123;

      if (args.length === 0) {
        args = [+new Date()];
      }
      var mash = Mash();
      for (var i = 0; i < args.length; i++) {
        s10 += mash(args[i]) * 0x100000000; // 2 ^ 32
        s11 += mash(args[i]) * 0x100000000;
        s12 += mash(args[i]) * 0x100000000;
        s20 += mash(args[i]) * 0x100000000;
        s21 += mash(args[i]) * 0x100000000;
        s22 += mash(args[i]) * 0x100000000;
      }
      s10 %= m1;
      s11 %= m1;
      s12 %= m1;
      s20 %= m2;
      s21 %= m2;
      s22 %= m2;
      mash = null;

      var uint32 = function() {
        var m1 = 4294967087;
        var m2 = 4294944443;
        var a12 = 1403580;
        var a13n = 810728;
        var a21 = 527612;
        var a23n = 1370589;

        var k, p1, p2;

        /* Component 1 */
        p1 = a12 * s11 - a13n * s10;
        k = p1 / m1 | 0;
        p1 -= k * m1;
        if (p1 < 0) p1 += m1;
        s10 = s11;
        s11 = s12;
        s12 = p1;

        /* Component 2 */
        p2 = a21 * s22 - a23n * s20;
        k = p2 / m2 | 0;
        p2 -= k * m2;
        if (p2 < 0) p2 += m2;
        s20 = s21;
        s21 = s22;
        s22 = p2;

        /* Combination */
        if (p1 <= p2) return p1 - p2 + m1;
        else return p1 - p2;
      };

      var random = function() {
        return uint32() * 2.3283064365386963e-10; // 2^-32
      };
      random.uint32 = uint32;
      random.fract53 = function() {
        return random() +
          (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
      };
      random.version = 'MRG32k3a 0.9';
      random.args = args;

      return random;
    } (Array.prototype.slice.call(arguments)));
  };
  
  module.exports = MRG32k3a;

})(typeof module === 'undefined' ? this['mrg32k3a'] = {} : module);
var Mash = __require__('./Mash');

(function(module) {
  
  // From http://baagoe.com/en/RandomMusings/javascript/
  function Xorshift03() {
    return (function(args) {
      // George Marsaglia, 13 May 2003
      // http://groups.google.com/group/comp.lang.c/msg/e3c4ea1169e463ae
      var x = 123456789,
          y = 362436069,
          z = 521288629,
          w = 88675123,
          v = 886756453;

      if (args.length == 0) {
        args = [+new Date];
      }
      var mash = Mash();
      for (var i = 0; i < args.length; i++) {
        x ^= mash(args[i]) * 0x100000000; // 2^32
        y ^= mash(args[i]) * 0x100000000;
        z ^= mash(args[i]) * 0x100000000;
        v ^= mash(args[i]) * 0x100000000;
        w ^= mash(args[i]) * 0x100000000;
      }
      mash = null;

      var uint32 = function() {
        var t = (x ^ (x >>> 7)) >>> 0;
        x = y;
        y = z;
        z = w;
        w = v;
        v = (v ^ (v << 6)) ^ (t ^ (t << 13)) >>> 0;
        return ((y + y + 1) * v) >>> 0;
      }

      var random = function() {
        return uint32() * 2.3283064365386963e-10; // 2^-32
      };
      random.uint32 = uint32;
      random.fract53 = function() {
        return random() +
          (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
      };
      random.version = 'Xorshift03 0.9';
      random.args = args;
      return random;

    } (Array.prototype.slice.call(arguments)));
  };
  
  module.exports = Xorshift03;

})(typeof module === 'undefined' ? this['xorshift03'] = {} : module);
var Mash = __require__('./support/js/Mash');
var Alea = __require__('./support/js/Alea');
var KISS07 = __require__('./support/js/KISS07');
var Kybos = __require__('./support/js/Kybos');
var LFib = __require__('./support/js/LFib');
var LFib4 = __require__('./support/js/LFIB4');
var MRG32k3a = __require__('./support/js/MRG32k3a');
var Xorshift03 = __require__('./support/js/Xorshift03');


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