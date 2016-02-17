'use strict';

const createIndent = (depth, indent) => Array(depth + 1).join(indent);

const createAttributes = attributes => {
  let html = '';
  Object.keys(attributes).forEach(key => {
    html += ` ${key}="${attributes[key]}"`;
  });
  return html;
};

const createOpenTag = object => `<${object.name}${createAttributes(object.attributes)}>`;

const createCloseTag = object => `</${object.name}>`;

const createIsolateTag = object => {
  let xml = '';
  if (object.content) {
    xml += `<${object.name}${createAttributes(object.attributes)}>${object.content}</${object.name}>`;
  } else {
    xml += `<${object.name}${createAttributes(object.attributes)} />`;
  }
  return xml;
};

const createXML = (object, depth, indent) => {
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
};

const stringify = (ast, indent) => {
  if (typeof indent !== 'string') {
    indent = '  ';
  }

  let xml = '';
  try {
    if (ast.declaration) {
      xml += `<?xml${createAttributes(ast.declaration.attributes)}?>\n`;
    }
    xml += createXML(ast.root, 0, indent);
  } catch (e) {
    return xml;
  }
  return xml;
};

module.exports = stringify;
