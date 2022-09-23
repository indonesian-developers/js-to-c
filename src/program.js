var Lexer = require('./scanner/lexer')
var Parser = require('./parser')

module.exports = function(code) {
  let rand = Math.floor(Math.random() * (900 * 900))
  let temp = `$×[{${rand}_OUTER]

int main() {
  $×[{${rand}_INNER]
}`

temp = temp.replace(('$×[' + rand + '_INNER' + ']'), JSON.stringify(new Lexer().tokenize(code)))

  return temp
}
