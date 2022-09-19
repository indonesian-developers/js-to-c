function Lexer() {
 this.instance = null
 this.tokens = []
}

Lexer.prototype.getInstance = function getInstance() {
 if(this.instance == null) { this.instance = new Lexer() }
 return this.instance
}

Lexer.prototype.tokenize = function Tokenizer(code) {
 var s = ''
 for(var i = 0; i < code.length; i++) {
  var token = code[i]
  s = (s + token).trim()
}
