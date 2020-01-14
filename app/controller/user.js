"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  /**
   * 用户登录
   *
   * @memberof UserController
   */
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    const account = body.account;
    const password = body.password;
    ctx.body = await ctx.service.user.login({ account, password });
  }

  /**
   * 新增数据
   *
   * @memberof UserController
   */
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.create(body);
  }

  /**
   * 修改数据
   *
   * @memberof UserController
   */
  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update(body);
  }

  /**
   * 删除数据
   *
   * @memberof UserController
   */
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.destroy(id);
  }


  async destroyMore(){
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.destroyMore(body);
  }

  /**
   * 查询数据
   *
   * @memberof UserController
   */
  async find() {
    const { ctx } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.find(id);
  }

  /**
   * 账号查询数据
   *
   * @memberof UserController
   */
  async findByAccount() {
    const { ctx } = this;
    const account = ctx.params.account;
    ctx.body = await ctx.service.user.findByAccount(account);
  }

  /**
   * 获取数据列表
   *
   * @memberof UserController
   */
  async list() {
    const { ctx } = this;
    const offset = ctx.params.offset;
    const limit = ctx.params.limit;
    const name = ctx.query.name;
    ctx.body = await ctx.service.user.list({
      offset,
      limit,
      name
    });
  }
}

module.exports = UserController;
