function Lexer() {
 this.instance = null
 this.tokens = []
}

Lexer.prototype.getInstance = function getInstance() {
 if(this.instance == null) { this.instance = new Lexer() }
 return this.instance
}

Lexer.prototype.Keywords = ['const', 'let', 'var', 'true', 'false', 'null', 'void', 'if', 'else']
Lexer.prototype.Operators = ['=', '==', '===', '+', '+=', '-', '-=', '*', '*=', '/', '<', '<=', '>', '>=', '!=', '!==', '?', ':']

Lexer.isOperator = function(token) {
 var op = Lexer.prototype.Operators
 for (var i = 0; i < op.length; i++) {
  if (op[i] == token) { return true }
 }
 return false
}

Lexer.isIdentifier = function(token, peek) {
 var r = /[a-zA-Z0-9._$]/
 return r.test(token) && !r.test(peek)
}

Lexer.isKeyword = function(token) {
 var kwd = Lexer.prototype.Keywords
 for (var i = 0; i < kwd.length; i++) {
  if (kwd[i] == token) { return true }
 }
 return false
}

Lexer.prototype.tokenize = function Tokenizer(code) {
 var s = ''
 var self = this
 
 function d(type, value) {
  if(typeof value != 'undefined') {
   self.tokens.push({ type: type, value: value })
  } else {
   self.tokens.push({ type: type })
  }
 }
 
 var i = 0
 
 for(; i < code.length; i++) {
  var token = code[i], peek = code[i+1]
  s = (s + token).trim()
  // console.log({ i, token, peek, tokens: self.tokens, code })

  if ((s.trim().length > 0 && !isNaN(s.trim())) && isNaN(peek)) {
   d('NUMBER', s.trim())
   s = ''
   continue
  }

  if (s.trim() == '(' || s.trim() == ')') {
   if(s.trim() == '(') {
    d('LEFT_PAREN')
   } else { d('RIGHT_PAREN') }
   
   s = ''
   continue
  }

  if (s.trim() == '{') {
   d('LEFT_CURLY')
   s = ''
   continue
  }

  if (s.trim() == "}") {
   d('RIGHT_CURLY')
   s = ''
   continue
  }

  if (s.trim() == '[') {
   d('LEFT_BRACKET')
   s = ''
   continue
  }

  if (s.trim() == "]") {
   d('RIGHT_BRACKET')
   s = ''
   continue
  }

  if (Lexer.isIdentifier(s.trim(), peek)) {
   if (Lexer.isKeyword(s.trim())) {
    d('KEYWORD', s);
   } else { d('IDENTIFIER', s) }
    s = ''
    continue
  }

  if (Lexer.isOperator(s.trim()) && !Lexer.isOperator(peek)) {
   d('OPERATOR', s.trim())
   s = ''
   continue
  }

  if (s == ';' || s == '\n') {
   d('EOL') // End of Line
   s = ''
   continue
  }

  continue
 }
 d('EOF') // End of File
 return this.tokens
}

module.exports = Lexer
