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

class AttachService extends Service {
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
      item.id = uuid();
      {
        item.createtime = new Date().getTime();
        item.updatetime = new Date().getTime();
      }
      let result = await ctx.app.mysql.insert("tb_news", item);
      ctx.status = 200;
      if (result != null) {
        return SUCCESS(result);
      } else {
        return ERROR(result);
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error.sqlMessage);
    }
  }

  /**
   * update
   *
   * @param {*} {
   *         id,
   *         item
   *     }
   * @returns
   * @memberof NewsService
   */
  async update({ id, body }) {
    const { ctx } = this;
    try {
      let result = await this.find(id);
      if (result.code == 0) {
        body.id = id;
        body.updatetime = new Date().getTime();
        let result = await ctx.app.mysql.update("tb_news", body);
        ctx.status = 200;
        if (result != null) {
          return SUCCESS(result);
        } else {
          return ERROR(result);
        }
      } else {
        return ERROR("数据不存在！");
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
          return SUCCESS(result);
        } else {
          return ERROR(result);
        }
      } else {
        return ERROR("数据不存在！");
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
        return SUCCESS(result);
      } else {
        return ERROR(result);
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error.sqlMessage);
    }
  }

  /**
   * list
   *
   * @param {*} {
   *         offset,
   *         limit
   *     }
   * @returns
   * @memberof NewsService
   */
  async list({ offset, limit }) {
    const { ctx } = this;
    try {
      let start = (limit - 1) * offset;
      let sql = `select count(1) as total from tb_news`;
      let total = 0;
      let result = await ctx.app.mysql.query(sql);
      if (result != null) {
        total = result[0].total;
      }
      sql = `select * from tb_news limit ${start},${offset}`;
      result = await ctx.app.mysql.query(sql);
      ctx.status = 200;
      if (result != null) {
        return LIST_SUCCESS({
          offset,
          limit,
          total,
          result
        });
      } else {
        return LIST_ERROR(result);
      }
    } catch (error) {
      ctx.status = 500;
      return LIST_ODD(error);
    }
  }
}

module.exports = AttachService;
