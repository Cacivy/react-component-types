# react-component-types

用于为react组件生成typescript声明文件

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
- [ ] travis
