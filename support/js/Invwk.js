import Mash from './Mash';


//Webkit2's crazy invertible mapping generator
//Based on Andy Hyland's implementation: https://bocoup.com/weblog/random-numbers
export default function Invwk() {
    var args = Array.prototype.slice.call(arguments);
    var mash = Mash();
    var max = 0x100000000; // 2 ^ 32

    if (args.length == 0) {
      args = [+new Date];
    }
    
    var seed = (mash(args.join('')) * max) | 0;
    // var seed = (Math.random() * max) | 0;

    var random = function () {
        seed += (seed * seed) | 5;
        // Shift off bits, discarding the sign. Discarding the sign is
        // important because OR w/ 5 can give us + or - numbers.
        return (seed >>> 32) * 2.3283064365386963e-10;
    };

    random.uint32 = function () {
       seed += (seed * seed) | 5;
        // Shift off bits, discarding the sign. Discarding the sign is
        // important because OR w/ 5 can give us + or - numbers.
        return (seed >>> 0);
    };
    random.fract53 = function () {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    random.version = 'Alea 0.9';
    random.args = args;

    return random;
};