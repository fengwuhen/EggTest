"use strict";

const Controller = require("egg").Controller;

class DictionaryController extends Controller {
  /**
   * 新增数据
   *
   * @memberof DictionaryController
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    console.log(body);
    ctx.body = await ctx.service.dictionary.create(body);
  }

  /**
   * 修改数据
   *
   * @memberof DictionaryController
   */
  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.dictionary.update(body);
  }

  /**
   * 删除数据
   *
   * @memberof DictionaryController
   */
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.dictionary.destroy(id);
  }

  async destroyMore() {
    const { ctx } = this;
    const body = ctx.request.body;
    console.log(body);
    ctx.body = await ctx.service.dictionary.destroyMore(body);
  }

  /**
   * 查询数据
   *
   * @memberof DictionaryController
   */
  async find() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.dictionary.find(id);
  }

  async lazy() {
    const { ctx } = this;
    const name = ctx.query.name;
    const parentid = ctx.query.parentid;
    console.log(ctx.query);
    ctx.body = await ctx.service.dictionary.lazy({
      name,
      parentid
    });
  }

  /**
   * 获取数据列表
   *
   * @memberof DictionaryController
   */
  async list() {
    const { ctx } = this;
    const offset = ctx.params.offset;
    const limit = ctx.params.limit;
    const name = ctx.query.name;
    const parentid = ctx.query.parentid;
    ctx.body = await ctx.service.dictionary.list({
      offset,
      limit,
      name,
      parentid
    });
  }
}

module.exports = DictionaryController;
