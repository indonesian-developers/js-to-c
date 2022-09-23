var Lexer = require('./scanner/lexer')
var Parser = require('./parser')

module.exports = function(code) {
  let rand = Math.floor(Math.random() * (900 * 900))
  let temp = new Parser(new Lexer().tokenize(code)).parse()

  return temp
}
