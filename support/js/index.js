import Mash from './Mash';
import Invwk from './Invwk';
import Alea from './Alea';
import KISS07 from './KISS07';
import Kybos from './Kybos';
import LFib from './LFib';
import LFib4 from './LFIB4';
import MRG32k3a from './MRG32k3a';
import Xorshift03 from './Xorshift03';

function random(generator) {
  var rand = null;
  return function () {
    var args = Array.prototype.slice.call(arguments);
    rand = args.length
      ? generator.apply(this, args)
      : generator();

    function range(from, to) {
      if (typeof from !== 'undefined' && typeof to === 'undefined') {
        return from * rand() | 0;
      } else if (typeof from !== 'undefined' && typeof to !== 'undefined') {
        return ((to - from) * rand() + from) | 0;
      } else {
        return rand();
      }
    }

    return Object.assign(range, rand);
  }
}

let rand = random(Alea);
rand.Invwk = random(Invwk);
rand.Mash = Mash;
rand.Alea = random(Alea);
rand.KISS07 = random(KISS07);
rand.Kybos = random(Kybos);
rand.LFib = random(LFib);
rand.LFib4 = random(LFib4);
rand.MRG32k3a = random(MRG32k3a);
rand.Xorshift03 = random(Xorshift03);

module.exports = rand;