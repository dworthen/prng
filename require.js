function require(module) {
  var path = module.split('/');
  var mod = path[path.length - 1].split('.');
  mod = mod.slice(0, mod.length - 1 == 0 ? 1 : mod.length - 1).join('').toLowerCase();
  return this[mod];
}