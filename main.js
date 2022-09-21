module.exports = {
 transpile: function transpile(code) {
  try {
   return require('./src/program')(code)
  } catch(e) {
   throw new (require('./src/errors/TranspileError'))(e.toString())
  }
 },
 transpileFile: function transpileFile(file) {
  return module.exports.transpile(require('fs').readFileSync(file))
 }
}

!function(d){
 for(var i = 0; i < d.length; i++) {
  module.exports[d[i]] = require('./src/scanner/' + d[i])
 }
}(['lexer'])

!function(d){
 for(var i = 0; i < d.length; i++) {
  var p = d[i], k, v
  if(typeof p != 'string') { k = p[0]; v = p[1] } else { k = (v = p) }
  module.exports[k] = require('./src/' + v)
 }
}([['Node', 'node'], ['Transpiler', 'program'], 'parser'])
