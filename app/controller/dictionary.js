'use strict';

const Controller = require('egg').Controller;

class DictionaryController extends Controller {
/**
     * 新增数据
     *
     * @memberof DictionaryController
     */
    async create() {
        const {
            ctx
        } = this;
        const body = ctx.request.body;
        const file = ctx.request.files;
        ctx.body = await ctx.service.dictionary.create(body);
    }

    /**
     * 修改数据
     *
     * @memberof DictionaryController
     */
    async update() {
        const {
            ctx
        } = this;
        const id = ctx.params.id;
        const body = ctx.request.body;
        ctx.body = await ctx.service.dictionary.update({
            id,
            body
        });
    }

    /**
     * 删除数据
     *
     * @memberof DictionaryController
     */
    async destroy() {
        const {
            ctx
        } = this;
        const id = ctx.params.id;
        ctx.body = await ctx.service.dictionary.destroy(id);
    }

    /**
     * 查询数据
     *
     * @memberof DictionaryController
     */
    async find() {
        const {
            ctx
        } = this;
        console.log(ctx.params);
        const id = ctx.params.id;
        ctx.body = await ctx.service.dictionary.find(id);
    }

    /**
     * 获取数据列表
     *
     * @memberof DictionaryController
     */
    async list() {
        const {
            ctx
        } = this;
        console.log(ctx.params);
        const offset = ctx.params.offset;
        const limit = ctx.params.limit;
        ctx.body = await ctx.service.dictionary.list({
            offset,
            limit
        });
    }
}

module.exports = DictionaryController;