'use strict';

function createIndent(depth, indent) {
  return Array(depth + 1).join(indent);
}

function createAttributes(attributes) {
  let html = '';
  Object.keys(attributes).forEach(key => {
    html += ` ${key}="${attributes[key]}"`;
  });
  return html;
}

function createOpenTag(object) {
  return `<${object.name}${createAttributes(object.attributes)}>`;
}

function createCloseTag(object) {
  return `</${object.name}>`;
}

function createIsolateTag(object) {
  let xml = '';
  if (object.content) {
    xml += `<${object.name}${createAttributes(object.attributes)}>${object.content}</${object.name}>`;
  } else {
    xml += `<${object.name}${createAttributes(object.attributes)} />`;
  }
  return xml;
}

function createXML(object, depth, indent) {
  let xml = '';
  if (object.children.length) {
    xml += `${createIndent(depth, indent)}${createOpenTag(object)}\n`;
    if (object.content) {
      xml += `${createIndent(depth + 1, indent)}${object.content}\n`;
    }
    object.children.forEach(child => {
      xml += createXML(child, depth + 1, indent);
    });
    xml += `${createIndent(depth, indent)}${createCloseTag(object)}\n`;
  } else {
    xml += `${createIndent(depth, indent)}${createIsolateTag(object)}\n`;
  }
  return xml;
}

function stringify(ast, indent) {
  if (typeof indent !== 'string') {
    indent = '  ';
  }

  let xml = '';
  if (ast.declaration) {
    xml += `<?xml${createAttributes(ast.declaration.attributes)}?>\n`;
  }
  xml += createXML(ast.root, 0, indent);

  return xml;
}

module.exports = stringify;
