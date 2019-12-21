'use strict';

const Controller = require('egg').Controller;

class DictionaryController extends Controller {
    async index() {
        const {
            ctx
        } = this;
        ctx.body = '字典列表';
    }
}

module.exports = DictionaryController;