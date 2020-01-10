"use strict";

const Service = require("egg").Service;
const {
  ERROR,
  SUCCESS,
  ODD,
  LIST_ERROR,
  LIST_SUCCESS,
  LIST_ODD
} = require("../util/result");
const uuid = require("uuid/v4");

/**
 * NewsService
 *
 * @class NewsService
 * @extends {Service}
 */
class NewsService extends Service {
  /**
   * create
   *
   * @param {*} item
   * @returns
   * @memberof NewsService
   */
  async create(item) {
    const { ctx } = this;
    try {
      // 设置接口状态
      ctx.status = 200;
      item.id = uuid();
      item.createtime = new Date();
      item.updatetime = new Date();
      let result = await ctx.app.mysql.insert("tb_news", item);
      if (result != null) {
        return SUCCESS("新增成功！", result);
      } else {
        return ERROR("新增失败！", result);
      }
    } catch (error) {
      ctx.status = 500;
      console.log(error);
      return ODD(error.sqlMessage);
    }
  }

  /**
   * update
   *
   * @param {*} body
   * @returns
   * @memberof NewsService
   */
  async update(body) {
    const { ctx } = this;
    try {
      let result = await this.find(body.id);
      if (result.code == 0) {
        body.updatetime = new Date();
        result = await ctx.app.mysql.update("tb_news", body);
        ctx.status = 200;
        if (result != null) {
          return SUCCESS("更新成功！", result);
        } else {
          return ERROR("更新失败！", {});
        }
      } else {
        return ERROR("数据已不存在！", {});
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error);
    }
  }

  /**
   *
   *
   * @param {*} body
   * @returns
   * @memberof NewsService
   */
  async destroyMore(body) {
    const { ctx } = this;
    try {
      let ids = `'${body.ids.replace(",", "','")}'`;
      if (ids != "") {
        let result = await ctx.app.mysql.query(
          `delete from tb_news where id in (${ids})`
        );
        ctx.status = 200;
        if (result != null) {
          return SUCCESS("删除成功！", result);
        } else {
          return ERROR("删除失败！", {});
        }
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error);
    }
  }

  /**
   * delete
   *
   * @param {*} id
   * @returns
   * @memberof NewsService
   */
  async destroy(id) {
    const { ctx } = this;
    try {
      let result = await this.find(id);
      if (result.code == 0) {
        let result = await ctx.app.mysql.delete("tb_news", {
          id: id
        });
        ctx.status = 200;
        if (result != null) {
          return SUCCESS("删除成功！", result);
        } else {
          return ERROR("删除失败！", {});
        }
      } else {
        return ERROR("数据已不存在！", {});
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error);
    }
  }

  /**
   * find
   *
   * @param {*} id
   * @returns
   * @memberof NewsService
   */
  async find(id) {
    const { ctx } = this;
    try {
      let result = await ctx.app.mysql.get("tb_news", {
        id: id
      });
      ctx.status = 200;
      if (result != null) {
        return SUCCESS("查询成功！", result);
      } else {
        return ERROR("查询失败！", {});
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error.sqlMessage, {});
    }
  }

  /**
   * 列表
   *
   * @param {*} { offset, limit, name }
   * @returns
   * @memberof NewsService
   */
  async list({ offset, limit, name }) {
    const { ctx } = this;
    try {
      let start = (limit - 1) * offset;
      let end = limit * offset;

      let sql = `select count(1) as total from tb_news `;
      if (name != null && name != "") {
        sql += ` where title like '%${name}%' `;
      }
      let total = 0;
      let result = await ctx.app.mysql.query(sql);
      if (result != null) {
        total = result[0].total;
      }
      sql = `select * from tb_news `;
      if (name != null && name != "") {
        sql += ` where title like '%${name}%' `;
      }
      sql += ` order by updatetime desc limit ${start},${end} `;
      let list = await ctx.app.mysql.query(sql);
      ctx.status = 200;
      if (list != null) {
        return LIST_SUCCESS("查询成功！", {
          offset: Number(offset),
          limit: Number(limit),
          total,
          size: list.length,
          over: limit * offset + list.length == total,
          list
        });
      } else {
        return LIST_ERROR("查询失败！", {});
      }
    } catch (error) {
      ctx.status = 500;
      return LIST_ODD(error);
    }
  }
}

module.exports = NewsService;
