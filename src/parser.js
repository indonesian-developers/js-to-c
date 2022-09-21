function Parser(lexer) {
 this.tokens = lexer
 this.expr = []
 this.i = 0
 this.instance = this
 this.brackets = []
}

Parser.getInstance = function getInstance(parser) {
 if(!(parser.instance instanceof Parser)) {
  parser.instance = new Parser(parser.tokens)
 }
 return parser.instance
}

Parser.prototype.addBracket(bracket) {
 this.brackets.push(bracket)
}

Parser.prototype.getBrackets() {
 var b = [], j = 0, k = 0
 // Checking missing brackets
 for(var i=0; i<this.brackets.length;i++) {
  var br = this.brackets[i]
  if(/LEFT_/.test(br.type)) {
   b.push({ id: j, value: br })
   j++
  } else {
   b.push({ id: j - k, value: br })
   k++
  }
  i++
  continue
 }
 return b
}

Parser.prototype.advance() {
 this.i++;
}

Parser.prototype.peep() {
 return this.tokens(this.i + 1);
}

Parser.prototype.current() {
 return this.tokens[this.i];
}

Parser.prototype.parse() {
 while (this.current().type == 'EOF') {
  this.expr.push(this.statements());
 }
 return this.expr;
}

Parser.prototype.statements() {
 var   = this.current();
 if (c.type == 'KEYWORDS') {
  if(c.value == 'class') {
   // UNIMPLEMENTED
   // return this.declareClass()
  } else if(c.value == 'function') {
   // UNIMPLEMENTED
   // return this.declareFunction()
  } else if(c.value == 'var') {
   // UNIMPLEMENTED
   // return this.declareVariable()
  } else if(c.value == 'const') {
   // UNIMPLEMENTED
   // return this.declareVariable()
  } else if(c.value == 'let') {
   // UNIMPLEMENTED
   // return this.declareVariable()
  } else if(c.value == 'function') {
   // UNIMPLEMENTED
   // return this.declareFunction()
  }
 } else if(c.type == 'NUMBER') {
  return 
}
