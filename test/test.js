
var assert = require('assert');
const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const options = { contentType: 'text/html' };
var jsdom = require('jsdom');
const { JSDOM } = require('jsdom');
const { TopBar, ImageDetail, ImageGrid, AlbumList } = require('../public/index.js');

var e;

describe('index.html', () => {

    beforeEach(() => {
        return new Promise((resolve) => {
            JSDOM.fromFile('public\\index.html', options).then((dom) => {

                let window = dom.window,
                    document = window.document;
                var $ = require('jquery')(window);

                e = $('#imageGrid');
                resolve();
            });
        });
    });

    it('check that the html contains all required anchorpoints for dynamically added code', () => {
        assert.equal(e.attr('class'), 'container');
    });

    //it('should equal hello world', function() {
    //var iDetail = new ImageDetail();
    //var iGrid = new ImageGrid(iDetail);
    //var aList = new AlbumList(iGrid);
    //var tBar = new TopBar(iGrid, aList);
    //iGrid.initialize();
    //assert.equal(tBar.hello(), 'hello jesper');
    //});


});

