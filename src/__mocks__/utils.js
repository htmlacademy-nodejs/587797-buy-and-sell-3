'use strict';

const utils = jest.genMockFromModule(`../utils`);

utils.readContent = jest.fn();

module.exports = utils;
