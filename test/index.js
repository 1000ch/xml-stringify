import fs from 'fs';
import test from 'ava';
import parse from 'xml-parser';
import stringify from '../';

test('Format xml with declaration', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/1.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/1.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast), expected);
});

test('Format xml without declaration', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/2.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/2.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast), expected);
});

test('Format xml including isolated tag', t => {
  t.plan(1);

  let fixtures = fs.readFileSync(`${__dirname}/fixtures/3.xml`, 'utf8');
  let expected = fs.readFileSync(`${__dirname}/expected/3.xml`, 'utf8');
  let ast = parse(fixtures.toString());

  t.same(stringify(ast), expected);
});
