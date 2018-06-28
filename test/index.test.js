const path = require('path')
const fs = require('fs')
const parse = require('../parse')

const buttonDir = path.resolve(__dirname, 'button.js')
const buttonFuncDir = path.resolve(__dirname, 'button.func.js')

describe('parse a component file', () => {
  let buttonDts = ''
  let buttonFuncDts = ''

  test('parse button.js', () => {
    buttonDts = parse({cover: true}, buttonDir)
  })

  test('parse button.func.js', () => {
    buttonFuncDts = parse({cover: true}, buttonFuncDir)
  })

  test('compare button & button.func', () => {
    expect(buttonDts).toEqual(buttonFuncDts)
  })
})

describe('output', () => {

  test('output file', () => {
    parse({output: './test/button.test.d.ts'}, buttonDir)
  })

  test('output file', () => {
    parse({output: './test'}, buttonDir)
  })

})

