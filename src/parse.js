const fs = require('fs')
const readlineSync = require('readline-sync');
const reactDocs = require('react-docgen');

module.exports = (dir) => {
  const buffer = fs.readFileSync(dir)
  const fileName = dir.substring(0, dir.lastIndexOf('.'))
  const text = buffer.toString('utf-8')
  const componentInfo = reactDocs.parse(text);
  const {
    displayName,
    props
  } = componentInfo

  const DEFAULT = {
    IMPORT: 'import React from \'react\'',
  }

  const LINE = '\r'

  const dTS = []

  dTS.push(DEFAULT.IMPORT)
  dTS.push(`interface ${displayName}Props {`)

  const transformObj = {
    bool: 'boolean',
    func: 'Function',
    array: 'Array<any>'
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
    } else {
      propType = typeName
    }
    return propType
  }

  Object.keys(props).forEach(key => {
    const obj = props[key]
    const propName = key
    const propType = transform(obj.type.name, obj.type.value)
    const typeStr = `${propName}: ${propType}`
    dTS.push('  ' + typeStr)
  })

  dTS.push(`}`)
  dTS.push(`export class ${displayName} extends React.Component<${displayName}Props> {}`)

  const outPath = `${fileName}.d.ts`

  const exists = fs.existsSync(outPath)

  if (exists) {


    if (!readlineSync.keyInYN(`${outPath}已存在? 是否覆盖`)) {
      return
    }
  }
  const result = dTS.join(LINE)
  fs.writeFile(outPath, result)
  return result
}