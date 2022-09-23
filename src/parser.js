function Parser(lexer) {
 this.tokens = lexer
 this.expr = []
 this.i = 0
 this.instance = this
 this.brackets = lexer.filter(function(v) {
  return /((BRACKET)|(CURLY)|(PAREN))$/.test(v.type)
 })
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
 return this.tokens[this.i + 1]
}

Parser.prototype.current = function getCurrent() {
 return this.tokens[this.i]
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
  } else if(c.value == 'function') {
   // UNIMPLEMENTED
   // return this.declareFunction()
  } else if(c.value == 'var') {
   return this.declareVariable()
  } else if(c.value == 'const') {
   return this.declareVariable()
  } else if(c.value == 'let') {
   return this.declareVariable()
  } else if(c.value == 'function') {
   // UNIMPLEMENTED
   // return this.declareFunction()
  }
 } else {
  this.advance()
  return c
 }
 return null
}

Parser.prototype.blockStatement = function (type) {
 this.advance();
 let statements = [];
 while (
  this.current().type != 'RIGHT_' + (type || 'CURLY').toUpperCase() &&
  this.peek().type != 'EOF'
 ) {
  statements.push(this.statements());
  this.advance();
 }
 this.advance();
 return [statements];
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
 this.advance()
 return { type: 'variableDeclare', value: r }
}

module.exports = Parser
