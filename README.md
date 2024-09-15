# tsNES

After cloning the repository and executing `npm i` a dev-server can be started using
```
npm run serve
```

Tests can be ran by executing
```
npm run test
```

Or build a production-ready version: 
```
npm run build
```


## State of development

| Feature                       | State                                      |           |   |   |
|-------------------------------|--------------------------------------------|-----------|---|---|
| **CPU (6502)**                | Finished                                   |           |   |   |
| **General Architecture**      | Refactoring (mostly finished)              |           |   |   |
| **PPU (2C02)**                | Not started                                |           |   |   |
| **PPU (2C03/PlayChoice10)**   | Not started                                |           |   |   |
| **APU**                       | Not started                                |           |   |   |
| **Mapper *XXX***              | [Mapper Support](MAPPER_SUPPORT.md)        |           |   |   |

These features will be implemented in the following order (if they will ever be implemented):
- General Architecture
- PPU (2C02)
- Common mappers
- APU
- PPU (2C03/PlayChoice10)



## Special Thanks

- [javidx9/OneLoneCoder](https://github.com/OneLoneCoder) for inspiring this project and providing a tutorial series explaining the inner workings of the NES architecture
- [nesdev.org](https://www.nesdev.org) for providing detailed information about all aspects of the NES architecture
- [C64-Wiki](https://www.c64-wiki.de/) for providing detailed information about the 6502 processor