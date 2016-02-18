import fs from 'fs';
import test from 'ava';
import parse from 'xml-parser';
import stringify from '../';

test('With declaration', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/1.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/1.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast, 2), expected);
});

test('Without declaration', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/2.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/2.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast), expected);
});

test('Including isolated tag', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/3.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/3.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast, 2), expected);
});

test('Indent with specified length space', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/4.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/4.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast, 3), expected);
});

test('Indent with any specified string', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/5.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/5.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast, '\t'), expected);
});
