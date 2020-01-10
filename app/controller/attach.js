"use strict";

const Controller = require("egg").Controller;

class AttachController extends Controller {
  /**
   * 新增数据
   *
   * @memberof AttachController
   */
  async create() {
    const { ctx } = this;
    const linkId = ctx.request.body.linkId;
    const files = ctx.request.files[0];
    ctx.body = await ctx.service.attach.create(linkId, files);
  }

  /**
   * 修改数据
   *
   * @memberof AttachController
   */
  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.attach.update({
      id,
      body
    });
  }

  /**
   * 删除数据
   *
   * @memberof AttachController
   */
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.attach.destroy(id);
  }

  /**
   * 查询数据
   *
   * @memberof AttachController
   */
  async find() {
    const { ctx } = this;
    console.log(ctx.params);
    const id = ctx.params.id;
    ctx.body = await ctx.service.attach.find(id);
  }

  /**
   * 获取数据列表
   *
   * @memberof AttachController
   */
  async list() {
    const { ctx } = this;
    console.log(ctx.params);
    const offset = ctx.params.offset;
    const limit = ctx.params.limit;
    ctx.body = await ctx.service.attach.list({
      offset,
      limit
    });
  }
}

module.exports = AttachController;
