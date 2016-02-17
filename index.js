'use strict';

const createIndent = depth => Array(depth * 2 + 1).join(' ');

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

const createXML = (object, depth) => {
  let xml = '';
  if (object.children.length) {
    xml += `${createIndent(depth)}${createOpenTag(object)}\n`;
    if (object.content) {
      xml += `${createIndent(depth + 1)}${object.content}\n`;
    }
    object.children.forEach(child => {
      xml += createXML(child, depth + 1);
    });
    xml += `${createIndent(depth)}${createCloseTag(object)}\n`;
  } else {
    xml += `${createIndent(depth)}${createIsolateTag(object)}\n`;
  }
  return xml;
};

const stringify = (ast, depth) => {
  let xml = '';
  try {
    if (ast.declaration) {
      xml += `<?xml${createAttributes(ast.declaration.attributes)}?>\n`;
    }
    xml += createXML(ast.root, depth);
  } catch (e) {
    return xml;
  }
  return xml;
};

module.exports = stringify;
