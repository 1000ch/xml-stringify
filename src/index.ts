interface Element {
  name: string;
  attributes: Record<string, string>;
  children: Element[];
  content: string;
}

interface AbstractSyntaxTree {
  declaration: {
    attributes: Record<string, string>;
  };
  root: Element;
}

function createIndent(depth: number, indent: string) {
  const array: string[] = [];
  array.length = depth + 1;

  return array.join(indent);
}

function createAttributes(attributes: Record<string, string>) {
  let html = '';

  for (const key of Object.keys(attributes)) {
    html += ` ${key}="${attributes[key]}"`;
  }

  return html;
}

function createOpenTag({attributes, name}: Element) {
  return `<${name}${createAttributes(attributes)}>`;
}

function createCloseTag({name}: Element) {
  return `</${name}>`;
}

function createIsolateTag({attributes, content, name}: Element) {
  if (content) {
    return `<${name}${createAttributes(attributes)}>${content}</${name}>`;
  }

  return `<${name}${createAttributes(attributes)} />`;
}

function createXml(object: Element, depth: number, indent: string) {
  let xml = '';
  const br = indent.length === 0 ? '' : '\n';

  if (object.children.length > 0) {
    xml += `${createIndent(depth, indent)}${createOpenTag(object)}${br}`;

    if (object.content) {
      xml += `${createIndent(depth + 1, indent)}${object.content}${br}`;
    }

    for (const child of object.children) {
      xml += createXml(child, depth + 1, indent);
    }

    xml += `${createIndent(depth, indent)}${createCloseTag(object)}${br}`;
  } else {
    xml += `${createIndent(depth, indent)}${createIsolateTag(object)}${br}`;
  }

  return xml;
}

export default function stringify(ast: AbstractSyntaxTree, arg: number | string) {
  let indent = '';

  if (typeof arg === 'number') {
    indent = ' '.repeat(arg);
  } else if (typeof arg === 'string') {
    indent = arg;
  }

  let xml = '';
  const br = indent.length === 0 ? '' : '\n';

  if (ast.declaration) {
    xml += `<?xml${createAttributes(ast.declaration.attributes)}?>${br}`;
  }

  xml += createXml(ast.root, 0, indent);

  return xml;
}
