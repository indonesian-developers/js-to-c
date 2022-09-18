module.exports = {
 transpile: function transpile() {
  try {
   return require('./src/program')
  } catch(e) {
   throw new (require('./src/errors/TranspileError'))(e.toString())
  }
 },
 transpileFile: function transpileFile(file) {
  return module.exports.transpile(require('fs').readFileSync(file))
 }
}
