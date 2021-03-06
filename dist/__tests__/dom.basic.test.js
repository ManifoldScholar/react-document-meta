'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _utils = require('../utils');

var _testUtils = require('./test-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var document = global.document;

describe('DocumentMeta - DOM basic', function () {

  var DOC_META = {
    title: 'This is a document title',
    description: 'This meta value is describing the page we are looking at',
    canonical: 'http://domain.tld/path/to/page',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,document,meta,tags'
      }
    },
    link: {
      rel: {
        stylesheet: ['http://domain.tld/css/vendor.css', 'http://domain.tld/css/styles.css']
      }
    }
  };

  beforeEach(function () {
    _2.default.canUseDOM = true;
    (0, _utils.removeDocumentMeta)();
    _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(_2.default, DOC_META));
  });

  it('should render document.title / <title> according to the title-attr', function () {
    _assert2.default.strictEqual(document.title, DOC_META.title);
  });

  it('should render <meta name="description" content="..."> according to the description-attr', function () {
    _assert2.default.strictEqual((0, _testUtils.getAttr)('meta[name=description]', 'content'), DOC_META.description);
  });

  it('should render <link rel="canonical" href="..." according to the canonical-attr', function () {
    _assert2.default.strictEqual((0, _testUtils.getAttr)('link[rel=canonical]', 'href'), DOC_META.canonical);
  });

  it('should render simple meta tags, eg. <meta charset="...">', function () {
    _assert2.default.strictEqual((0, _testUtils.getAttr)('meta[charset]', 'charset'), DOC_META.meta.charset);
  });

  it('should render normal meta tags, eg. <meta name="..." content="...">', function () {
    Object.keys(DOC_META.meta.name).reduce(function (name) {
      _assert2.default.strictEqual((0, _testUtils.getAttr)('meta[name=' + name + ']', 'content'), DOC_META.meta.name[name], '<meta name="' + name + '" ... /> has not been rendered correctly');
    });
  });

  it('should render normal link tags, eg. <link rel="..." href="...">', function () {
    Object.keys(DOC_META.link.rel).reduce(function (rel) {
      var values = Array.isArray(DOC_META.link.rel[rel]) ? DOC_META.link.rel[rel] : [DOC_META.link.rel[rel]];
      var elements = (0, _testUtils.getElements)('link[rel=' + rel + ']');
      elements.forEach(function (element, idx) {
        _assert2.default.strictEqual(element.getAttribute('content'), values[idx], '<link rel="' + rel + '" ... /> has not been rendered correctly');
      });
    });
  });
});
