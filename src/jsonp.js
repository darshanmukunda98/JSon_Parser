#!/usr/bin/env node
const input = process.argv[2]

const nullParser = input => {
  input = input.trim()
  if (!input.startsWith('null')) {
    console.log('*' + input)
    return null
  }
  return [null, input.slice(4)]
}
const booleanParser = input => {
  input = input.trim()
  if (input.startsWith('true')) return [true, input.slice(4)]
  if (input.startsWith('false')) return [false, input.slice(5)]
  console.log('*' + input); return null
}

function numParser (input) {
  regex = /(-?)(([0]|[1-9]\d*)(\.\d+)?([eE][-+]?\d+)?)/
  input = input.trim()

  str = input.match(regex)
  return [str[0], input.slice(str[0].length)]
}
function stringParser (input) {
  // json_str=''
  input = input.trim()

  if (input.startsWith('"')) {
    input = input.slice(1, input.slice(1).indexOf('"') + 1)
    return [input, null]
  }

  return [null, input]
}

// console.log(nullParser(input));
// console.log(booleanParser(input))
console.log(numParser(input))
// console.log(stringParser(input))
