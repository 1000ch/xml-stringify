import fs from 'node:fs';
import test from 'ava';
import parse from 'xml-parser';
import stringify from '../index.js';

const {readFile} = fs.promises;

test('With declaration', async t => {
  const fixture = await readFile(new URL('fixtures/1.xml', import.meta.url));
  const expected = await readFile(new URL('expected/1.xml', import.meta.url));
  const ast = parse(fixture.toString());

  t.is(stringify(ast, 2), expected.toString());
});

test('Without declaration', async t => {
  const fixture = await readFile(new URL('fixtures/2.xml', import.meta.url));
  const expected = await readFile(new URL('expected/2.xml', import.meta.url));
  const ast = parse(fixture.toString());

  t.is(stringify(ast), expected.toString());
});

test('Including isolated tag', async t => {
  const fixture = await readFile(new URL('fixtures/3.xml', import.meta.url));
  const expected = await readFile(new URL('expected/3.xml', import.meta.url));
  const ast = parse(fixture.toString());

  t.is(stringify(ast, 2), expected.toString());
});

test('Indent with specified length space', async t => {
  const fixture = await readFile(new URL('fixtures/4.xml', import.meta.url));
  const expected = await readFile(new URL('expected/4.xml', import.meta.url));
  const ast = parse(fixture.toString());

  t.is(stringify(ast, 3), expected.toString());
});

test('Indent with any specified string', async t => {
  const fixture = await readFile(new URL('fixtures/5.xml', import.meta.url));
  const expected = await readFile(new URL('expected/5.xml', import.meta.url));
  const ast = parse(fixture.toString());

  t.is(stringify(ast, '\t'), expected.toString());
});
