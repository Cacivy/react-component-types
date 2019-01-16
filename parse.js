const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync');
const reactDocs = require('react-docgen');

module.exports = (config={}, dir) => {
  const { output, cover } = config
  const buffer = fs.readFileSync(dir)
  const fileName = dir.substring(0, dir.lastIndexOf('.'))
  const text = buffer.toString('utf-8')
  let componentInfo = {}
  try {
    componentInfo = reactDocs.parse(text);
  } catch (error) {
    console.error(`path: ${dir}; err: ${error}`)
    return
  }
  const {
    displayName,
    props
  } = componentInfo

  const LINE = '\r\n'

  const DEFAULT = {
    IMPORT: 'import React from \'react\'' + LINE,
  }

  const dTS = []

  dTS.push(DEFAULT.IMPORT)
  dTS.push(`interface ${displayName}Props {`)

  const transformObj = {
    bool: 'boolean',
    func: 'Function',
    array: 'Array<any>',
    node: 'string | number | Array<any> | Element',
    element: 'Element',
    custom: 'any'
  }

  const transform = (typeName, value) => {
    let propType
    const transformName = transformObj[typeName]
    if (transformName) {
      propType = transformName
    } else if (typeName === 'union') {
      propType = value.map(({
        name
      }) => transform(name)).join(' | ')
    } else if (typeName === 'enum') {
      propType = value.map(({
        value
      }) => value).join(' | ')
    } else if (typeName === 'arrayOf') {
      propType = `${value.name}[]`
    } else {
      propType = typeName
    }
    return propType
  }

  if (!props) {
    return
  }

  Object.keys(props).forEach(key => {
    const obj = props[key]
    const propName = key
    const propType = transform(obj.type.name, obj.type.value)
    const typeStr = `${propName}: ${propType}`
    dTS.push('  ' + typeStr)
  })

  dTS.push(`}`)
  dTS.push(LINE + `export default class ${displayName} extends React.Component<${displayName}Props> {}`)

  let outPath = `${fileName}.d.ts`
  if (output) {
    console.log('dirname', __dirname);
    if (output.lastIndexOf('.d.ts') === (output.length - 5)) {
      outPath = output
    } else {
      outPath = path.resolve(output, outPath.substring(outPath.lastIndexOf('/') + 1))
    }
  }


  const exists = fs.existsSync(outPath)

  if (!cover && exists && !readlineSync.keyInYN(`${outPath}已存在? 是否覆盖`)) {
    return
  }

  const result = dTS.join(LINE)
  fs.writeFileSync(outPath, result)
  return result
}
