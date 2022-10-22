function stringParser (str) {
  let i = 0
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

  if (str[i] === '"') {
    i++
    let result = ''

    while (i < str.length && str[i] !== '"') {
      if (str[i] === '\\') {
        const char = str[i + 1]

        if (escapee[char]) {
          result += escapee[char]
          i += 2
        } else if (char === 'u') {
          const hexDigits = str.slice((i + 2), (i + 6))
          console.log(hexDigits)
          if (isHex(hexDigits)) {
            result += String.fromCharCode('0x' + hexDigits)
            i += 6
          }
        } else { result += ''; i++ }

        if (str[i] === '"') break
      } else if (str[i] === '"') break
      // console.log(str[i + 1] + (i + 1))
      result += str[i++]
    }
    return [result, str.slice(i + 1)]
  }
}

function isHex (s) {
  return /[0-9a-fA-F]{4}/.test(s)
}
console.log(stringParser(process.argv[2]))
