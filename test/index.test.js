const path = require('path')
const fs = require('fs')
const parse = require('../parse')

describe('parse a component file', () => {
  const buttonDir = path.resolve(__dirname, './button.js')
  const buttonFuncDir = path.resolve(__dirname, './button.func.js')
  let buttonDts = ''
  let buttonFuncDts = ''

  test('parse button.js', () => {
    buttonDts = parse(buttonDir)
  })

  test('parse button.func.js', () => {
    buttonFuncDts = parse(buttonFuncDir)
  })

  test('compare button & button.func', () => {
    expect(buttonDts).toEqual(buttonFuncDts)
  })
})
