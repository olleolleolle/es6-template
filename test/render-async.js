/*!
 * es6-template <https://github.com/tunnckoCore/es6-template>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var test = require('mukla')
var es6template = require('../index')

/* eslint-disable no-template-curly-in-string */

test('async okey: .render(template, locals, callback)', function (done) {
  es6template.render('foo ${name} bar', {
    name: 'charlike'
  }, function (err, str) {
    test.ifError(err)
    test.strictEqual(str, 'foo charlike bar')
    done()
  })
})

test('async fail: .render(): ReferenceError if not in `locals`', function (done) {
  es6template.render('some not existing ${bar} here', {
    qux: 'charlike'
  }, function (err, str) {
    test.ifError(!err)
    test.strictEqual(err.name, 'ReferenceError')
    test.strictEqual(err.message, 'bar is not defined')
    done()
  })
})

test('async fail: .render(123, cb): throws TypeError if `template` not a string', function (done) {
  es6template.render(123, function (err) {
    test.ifError(!err)
    test.strictEqual(err.name, 'TypeError')
    test.ok(/expect `template` to be a string/.test(err.message))
    done()
  })
})

test('async fail: .render(str, 123, cb): throws TypeError if `locals` not an object', function (done) {
  es6template.render('foo bar', 123, function (err) {
    test.ifError(!err)
    test.strictEqual(err.name, 'TypeError')
    test.ok(/expect `locals` to be an object/.test(err.message))
    done()
  })
})
