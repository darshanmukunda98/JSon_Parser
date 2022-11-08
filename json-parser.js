#!/usr/bin/env node
function objectParser (input) {
  if (!input[0] === '{') return null
  const obj = {}
  let strBuff // rename to key
  let valBuff // rename to value

  // if (input.length > 1)
  input = input.slice(1).trim()
  if (input[0] === '}') return [obj, input.slice(1).trim()]
  do {
    strBuff = stringParser(input)
    // if (strBuff === null) return null
    if (!strBuff) return null
    input = strBuff[1]
    if (input[0] === ':') {
      input = input.slice(1).trim()
    } else {
      return null // add to beginning of the cond
    }
    valBuff = valueParser(input)
    // if (valBuff === null) return null
    if (!valBuff) return null // add instead ' === null'
    input = valBuff[1]
    obj[strBuff[0]] = valBuff[0]
    if (input[0] === '}') { return [obj, input.slice(1).trim()] }
    if (input[0] === ',') {
      input = input.slice(1).trim()
      // if (input[0] === '}') { return null }
    }
  } while (input !== '' /* && input[0] !== '}' */)
  // if (input[0] === '}') return [obj, input.slice(1).trim()]
  return null
}
function arrayParser (input) {
  if (!input[0] === '[') return null
  const array = []
  let buffer // rename to result

  if (input.length > 1)input = input.slice(1).trim()
  if (input[0] === ']') return [array, input.slice(1).trim()]
  do {
    buffer = valueParser(input)
    if (buffer === null) return null
    input = buffer[1]
    array.push(buffer[0])
    if (input[0] === ']') { return [array, input.slice(1).trim()] }
    if (input[0] === ',') {
      input = input.slice(1).trim()
    }
  } while (input !== ''/* && input[0] !== ']' */)

  // if (input[0] === ']') { return }
  return null
}
const nullParser = input => {
  input = input.trim()
  if (!input.startsWith('null')) {
    return null
  }
  return [null, input.slice(4).trim()]
}
const booleanParser = input => {
  input = input.trim()
  if (input.startsWith('true')) return [true, input.slice(4).trim()]
  if (input.startsWith('false')) return [false, input.slice(5).trim()]
  return null
}

function numParser (input) {
  // if (input.startsWith('00')) return null
  const regex = /(-?)(([0]|[1-9]\d*)(\.\d+)?([eE][-+]?\d+)?)/
  // input = input.trim()

  const str = input.match(regex)
  if (!str) return null
  return [Number(str[0]), input.slice(str[0].length).trim()]
}
function stringParser (str) {
  const escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'

  }
  let i = 0
  if (str[i] === '"') {
    i++
    let result = ''

    while (i < str.length && str[i] !== '"') {
      if (str[i] === '\\') {
        const char = str[i + 1]
        // if (str[i] === '"') break
        i += 2
        if (escapee[char]) {
          result += escapee[char]
          // i += 2
        } else if (char === 'u') {
          // i += 2
          const hexDigits = str.slice((i), (i + 4))

          if (isHex(hexDigits)) {
            result += String.fromCharCode('0x' + hexDigits)
            i += 4
          }
        } else {
          return null // add null case in the beginning of the condition
        }
      } else {
        if (str[i + 1] === '\n' || str[i + 1] === '\t') break
        result += str[i++]
      }
    }
    if (!str[i] === '"') return null
    return [result, str.slice(i + 1).trim()]
  }
}

function isHex (s) {
  return /[0-9a-fA-F]{4}/.test(s)
}
function valueParser (input) {
  const ch = input[0]

  switch (ch) {
    case '{':
      return objectParser(input)
    case '[':
      return arrayParser(input)
    case '"':
      return stringParser(input)
    case 't':
      return booleanParser(input)
    case 'f':
      return booleanParser(input)
    case 'n':
      return nullParser(input)
    default:
      if (ch === '-' || (ch && ch >= 0 && ch <= 9)) {
        return numParser(input)
      } else {
        return null
      }
  }
}

// console.log(valueParser(process.argv[2]))
(() => {
  const fs = require('fs')
  const files = ['pass1', 'pass2', 'pass3', 'fail1', 'fail2', 'fail3', 'fail4', 'fail5', 'fail6', 'fail7', 'fail8', 'fail9', 'fail10',
    'fail11', 'fail12', 'fail13', 'fail14', 'fail15', 'fail16', 'fail17', 'fail18', 'fail19', 'fail20', 'fail21',
    'fail22', 'fail23', 'fail24', 'fail25', 'fail26', 'fail27', 'fail28', 'fail29', 'fail30', 'fail31', 'fail32', 'fail33']
  // const fileName = process.argv[2]
  files.forEach(fileName =>
    fs.readFile('./test/' + fileName + '.json', 'utf8', (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      let buffer = null
      if (data.startsWith('[') || data.startsWith('{')) { buffer = valueParser(data) }
      // if (typeof (data) === 'string') buffer = null
      if (buffer) { if (buffer[1] === '') { /* console.log(buffer); */ console.log(fileName + '====> PASS' + '\n'); return } }
      console.log(fileName + '====> FAIL ')
      // console.log(buffer)
      console.log()
    }))
})()
