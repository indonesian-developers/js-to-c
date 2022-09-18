

module.exports = function(code) {
  let rand = Math.floor(Math.random() * (900 * 900))
  let temp = `$×[{${rand}_OUTER]

int main() {
  $×[{${rand}_INNER]
}`

  return temp
}
