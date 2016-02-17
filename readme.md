# xml-stringify [![Build Status](https://travis-ci.org/1000ch/xml-stringify.svg?branch=master)](https://travis-ci.org/1000ch/xml-stringify)

Stringify XML AST built from [segmentio/xml-parser](https://github.com/segmentio/xml-parser).

## Usage

```javascript
const parse = require('xml-parser');
const stringify = require('xml-stringify');

let ast = parse('<foo>Foo!</foo>');
let xml = stringify(ast, 2);

console.log(xml);
```

## License

MIT: http://1000ch.mit-license.org
