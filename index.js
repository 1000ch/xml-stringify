function createIndent(depth, indent) {
  const array = [];
  array.length = depth + 1;

  return array.join(indent);
}

function createAttributes(attributes) {
  let html = '';

  for (const key of Object.keys(attributes)) {
    html += ` ${key}="${attributes[key]}"`;
  }

  return html;
}

function createOpenTag({attributes, name}) {
  return `<${name}${createAttributes(attributes)}>`;
}

function createCloseTag({name}) {
  return `</${name}>`;
}

function createIsolateTag({attributes, content, name}) {
  if (content) {
    return `<${name}${createAttributes(attributes)}>${content}</${name}>`;
  }

  return `<${name}${createAttributes(attributes)} />`;
}

function createXML(object, depth, indent) {
  let xml = '';
  const br = indent.length === 0 ? '' : '\n';

  if (object.children.length > 0) {
    xml += `${createIndent(depth, indent)}${createOpenTag(object)}${br}`;

    if (object.content) {
      xml += `${createIndent(depth + 1, indent)}${object.content}${br}`;
    }

    for (const child of object.children) {
      xml += createXML(child, depth + 1, indent);
    }

    xml += `${createIndent(depth, indent)}${createCloseTag(object)}${br}`;
  } else {
    xml += `${createIndent(depth, indent)}${createIsolateTag(object)}${br}`;
  }

  return xml;
}

export default function stringify(ast, arg) {
  let indent = '';

  if (typeof arg === 'number') {
    indent = ' '.repeat(Number.parseInt(arg, 10));
  } else if (typeof arg === 'string') {
    indent = arg;
  }

  let xml = '';
  const br = indent.length === 0 ? '' : '\n';

  if (ast.declaration) {
    xml += `<?xml${createAttributes(ast.declaration.attributes)}?>${br}`;
  }

  xml += createXML(ast.root, 0, indent);

  return xml;
}
