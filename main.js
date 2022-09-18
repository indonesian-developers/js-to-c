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
 },
 Node: require('./src/node'),
 Transpiler: require('./src/program')
}
