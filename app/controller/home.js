'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    ctx.body = "后台数据接口";
  }
}

module.exports = HomeController;