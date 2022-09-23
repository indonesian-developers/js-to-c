module.exports = function(message) {
  console.error('TranspileError: ' + message.replace(/^([a-zA-Z0-9_-]+)Error\:/, ''))
  process.exit(0)
}
