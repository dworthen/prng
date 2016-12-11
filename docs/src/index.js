import * as normalize from '../../node_modules/skeleton-css/css/normalize.css';
import * as skeletoncss from '../../node_modules/skeleton-css/css/skeleton.css';
import * as _ from 'lodash';
import PRNG from '../../support/js/index';
import renderHistogram from './renderHistogram';
import * as d3 from 'd3';

let seed = +new Date;
let numSamples = 100000;

function renderAlg(alg) {
    let data = _.times(numSamples, PRNG[alg](seed).bind(this, undefined, undefined))
    renderHistogram(`#${alg}`, data);
}

renderAlg('Alea');
renderAlg('KISS07');
renderAlg('Kybos');
renderAlg('LFib');
renderAlg('LFib4');
renderAlg('MRG32k3a');
renderAlg('Xorshift03');
renderAlg('Invwk');

// let AleaData = _.times(numSamples, PRNG.Alea(seed).bind(this, undefined, undefined));
