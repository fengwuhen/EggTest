'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    let result = await ctx.app.mysql.get('tb_users', {})
    ctx.body = result;
  }
}

module.exports = HomeController;