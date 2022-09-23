module.exports = function(message) {
  console.error('TranspileError: ' + message)
  process.exit(0)
}
