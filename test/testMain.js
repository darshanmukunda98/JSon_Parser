const parser = require('../src/str2')

function arrayEquals (a, b) {
  return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
}

function stringTest (expected, input) {
  const actual = parser.stringParser(input)
  if (arrayEquals(expected, actual)) {
    console.log('Pass: Test for')
    console.log(actual)
  } else {
    console.error('Fail: Test for')
    console.log(actual)
  }
}

(() => {
  console.log('String tests.')
  stringTest(['', ''], '"hello\\\\"')
  stringTest(['', ''], '"Hello\\"')
})()
