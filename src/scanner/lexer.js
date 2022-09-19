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
  console.log({ i, token, peek, tokens: self.tokens, code })

  if (!isNaN(s.trim()) && !isNum(peek)) {
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
   d('LEFT_BRACKET')
   s = ''
   continue
  }

  if (s.trim() == "}") {
   d('RIGHT_BRACKET')
   s = ''
   continue
  }

  if (/[a-zA-Z]/.test(s.trim()) && !/[a-zA-Z]/.test(peek)) {
   if (['const'].includes(s.trim())) {
    d('KEYWORD', s);
   } else { d('IDENTIFIER', s) }
    s = ''
    continue
  }

  if (['='].includes(s.trim()) && !['='].includes(peek)) {
   d('OP', s.trim())
   s = ''
   continue
  }

  if (s == ";" || s == "\n") {
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
