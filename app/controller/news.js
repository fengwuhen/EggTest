"use strict";

const Controller = require("egg").Controller;

class NewsController extends Controller {
  /**
   * 新增数据
   *
   * @memberof NewsController
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.news.create(body);
  }

  /**
   * 修改数据
   *
   * @memberof NewsController
   */
  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.news.update(body);
  }

  /**
   * 删除数据
   *
   * @memberof NewsController
   */
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.news.destroy(id);
  }

  async destroyMore(){
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.news.destroyMore(body);
  }


  /**
   * 查询数据
   *
   * @memberof NewsController
   */
  async find() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.news.find(id);
  }

  /**
   * 获取数据列表
   *
   * @memberof NewsController
   */
  async list() {
    const { ctx } = this;
    const offset = ctx.params.offset;
    const limit = ctx.params.limit;
    const name = ctx.query.name;
    ctx.body = await ctx.service.news.list({
      offset,
      limit,
      name
    });
  }
}
module.exports = NewsController;
