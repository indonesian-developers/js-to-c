module.exports = {
 getNode: function get(data) {
  return module.exports.TYPE_ANONYMOUS
 },
 TYPE_ANONYMOUS: -1,
 TYPE_UNDEFINED: 0,
 TYPE_NULL: 1,
 
 TYPE_STRING: 2 << 1,
 TYPE_NUMBER: 2 << 2,
 TYPE_OPERATOR: 2 << 3,
 TYPE_BRACKET: 2 << 4
}
