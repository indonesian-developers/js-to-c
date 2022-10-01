function Parser(lexer) {
 this.tokens = lexer
 this.expr = []
 this.i = 0
 this.instance = this
 this.brackets = lexer.filter(function(v) {
  return /((BRACKET)|(CURLY)|(PAREN))$/.test(v.type)
 })
}

Parser.wrapToken = function wrapToken(token, pos) {
 function WrappedToken(t, pos) {
  this.token = t
  this.position = pos || 'in'
 }

 return new WrappedToken(token, pos)
}

Parser.getInstance = function getInstance(d) {
 if(d instanceof (require('./scanner/lexer.js'))) {
  d.instance = new Parser(d)
 } else if(!(d.instance instanceof Parser)) {
  d.instance = new Parser(d.tokens)
 }
 return d.instance
}

Parser.prototype.addBracket = function addBracket(bracket) {
 this.brackets.push(bracket)
}

Parser.prototype.getBrackets = function getBrackets() {
 var brackets = this.brackets, b = [], i=0, typef = {
   BRACKET: '[]',
   PAREN: '()',
   CURLY: '{}'
 }
 // Checking missing brackets
 for(; i<brackets.length;i++) {
  var br = brackets[i]
  var type = br.type.replace(/^((RIGHT)|(LEFT))_/, '')
  var direction = [(br.type.match(/LEFT/g) || ['RIGHT'])[0], 0]
  if(direction[0] == 'RIGHT') { direction[1] = 1 }
  var nbr = { direction: direction[0], type: type, value: typef[type][direction[1]] }
  b.push(nbr)
 }

 var h = []
 for(var i2 = 0; i2 < b.length; i2++) {
  var tok = b[i2]
   if(tok.direction == 'LEFT') {
    h.push(tok)
   } else {
    if(tok.type == h[h.length - 1].type) {
     h.pop()
    } else {
     throw new Error('Unexpected token: ' + tok.value)
    }
  }
}
  
 if(h.length > 0) { 
   throw new Error('Unexpected token')
 }
  
 return b
}

Parser.prototype.advance = function advance() {
 this.i++
 return this.current()
}

Parser.prototype.peek = function peek() {
 return this.tokens[this.i + 1] || {type:'EOF'}
}

Parser.prototype.current = function getCurrent() {
 return this.tokens[this.i] || {type:'EOF'}
}

Parser.prototype.parse = function parse() {
 this.getBrackets()
 while (this.current().type != 'EOF') {
  this.expr.push(this.statements())
 }
 return this.expr
}

Parser.prototype.statements = function () {
 var c = this.current();
 if (c.type == 'KEYWORD') {
  if(c.value == 'class') {
   // UNIMPLEMENTED
   // return this.declareClass()
  } else if(c.value == 'for') {
   // UNIMPLEMENTED
   // return this.declareForLoop()
  } else if(c.value == 'while') {
   // UNIMPLEMENTED
   // return this.declareWhileLoop()
  } else if(c.value == 'var') {
   return this.declareVariable()
  } else if(c.value == 'const') {
   return this.declareVariable()
  } else if(c.value == 'let') {
   return this.declareVariable()
  } else if(c.value == 'function') {
   return this.declareFunction()
  } else if(c.value == 'return') {
   return Parser.wrapToken({ type: 'return', value: this.advance() })
  }
 } else {
  this.advance()
  if(c.type == 'LEFT_CURLY') {
   console.log(c)
   return Parser.wrapToken({ type: 'object', value: this.blockStatement('curly') })
  } else if(c.type == 'LEFT_BEACKET') {
   console.log(c)
   return Parser.wrapToken({ type: 'array', value: this.blockStatement('bracket') })
  } else if(c.type == 'LEFT_PAREN') {
   console.log(c)
   return Parser.wrapToken({ type: 'object_array', value: this.blockStatement('paren') })
  }
  else {
   return Parser.wrapToken(c)
  }
 }
 throw new Error('Unsupported feature: ' + c.value + ' [' + c.type + ']')
}

Parser.prototype.blockStatement = function (type) {
 this.advance();
 let statements = [];
 while (
  (this.current() && this.current().token.type != 'RIGHT_' + (type || 'CURLY').toUpperCase()) &&
  (this.peek() && this.peek().token.type != 'EOF')
 ) {
 console.log({ e: this.statements(), statements, cur: this.current() })
  statements.push(this.statements());
  this.advance();
 }
 this.advance();
 return statements;
}

// DECLARATOR
Parser.prototype.declareVariable = function () {
 var t = this.current().value
 var r = t;
 r = r + ' ' + this.advance().value
 this.advance()
 var val = this.advance()
 if (val.type == 'STRING') { val.value = '"' + val.value + '"' }
 r = r + ' ' + val.value
 // console.log({ r, val, v: this.current() })
 return this.advance(), Parser.wrapToken({ type: 'variableDeclaration', value: r })
}

Parser.prototype.declareFunction = function () {
 var t = this.advance()
 this.advance()
 var attrs = this.blockStatement('PAREN')
 var inside = this.blockStatement('CURLY')
 console.log(JSON.stringify({t, attrs, inside}, null, '  '))
 return Parser.wrapToken({ type: 'fn', value: [t, attrs, inside] })
}

module.exports = Parser
