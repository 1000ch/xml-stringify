# xml-stringify [![Build Status](https://travis-ci.org/1000ch/xml-stringify.svg?branch=master)](https://travis-ci.org/1000ch/xml-stringify)

Stringify AST built with [segmentio/xml-parser](https://github.com/segmentio/xml-parser).

## Usage

```javascript
import parse from 'xml-parser';
import stringify from 'xml-stringify';

const ast = parse('<foo>Foo!</foo>');
const xml = stringify(ast);

console.log(xml);
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
