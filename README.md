# react-component-types

![Node.js CI](https://github.com/Cacivy/react-component-types/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/Cacivy/react-component-types/branch/master/graph/badge.svg)](https://codecov.io/gh/Cacivy/react-component-types)

用于为react组件生成typescript声明文件

### Usage

```
// single
rct ./src/header/index.js

// many folder
rct -d ./src
```

### CLI

```
  npm i -g react-component-types

  Usage: rct [options] [command]

  Options:

    -o, --output     output path
    -c, --cover      Whether to cover it when it exists
    -d, --directory  parse child directory
    -h, --help       output usage information

  Commands:

    parse <dir>      A component or directory
    help [cmd]       display help for [cmd]
```

### TODO

- [x] 支持根据目录查找生成
- [x] Jest
- [ ] 逻辑拆分
- [ ] 完善测试
- [ ] 提取注释
- [ ] travis
