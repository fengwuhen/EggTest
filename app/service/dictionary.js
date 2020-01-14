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
require("../util/global");

class DictionaryService extends Service {
  /**
   * create
   *
   * @param {*} item
   * @returns
   * @memberof DictionaryService
   */
  async create(item) {
    const { ctx } = this;
    try {
      // 设置接口状态
      ctx.status = 200;
      item.id = uuid();
      item.createtime = new Date();
      let result = await ctx.app.mysql.insert("tb_dictionary", item);
      if (result != null) {
        return SUCCESS("新增成功！", result);
      } else {
        return ERROR("新增失败！", result);
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error.sqlMessage);
    }
  }

  /**
   * update
   *
   * @param {*} body
   * @returns
   * @memberof DictionaryService
   */
  async update(body) {
    const { ctx } = this;
    try {
      let result = await this.find(body.id);
      if (result.code == 0) {
        result = await ctx.app.mysql.update("tb_dictionary", body);
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
   * @memberof DictionaryService
   */
  async destroyMore(body) {
    const { ctx } = this;
    try {
      let ids = `'${body.ids.replaceAll(",", "','")}'`;
      if (ids != "") {
        let result = await ctx.app.mysql.query(
          `delete from tb_dictionary where id in (${ids})`
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
   * @memberof DictionaryService
   */
  async destroy(id) {
    const { ctx } = this;
    try {
      let result = await this.find(id);
      if (result.code == 0) {
        let result = await ctx.app.mysql.delete("tb_dictionary", {
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
   * @memberof DictionaryService
   */
  async find(id) {
    const { ctx } = this;
    try {
      let result = await ctx.app.mysql.get("tb_dictionary", {
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
   * @param {*} { name }
   * @returns
   * @memberof DictionaryService
   */
  async lazy({ name, parentid, type }) {
    const { ctx } = this;
    try {
      let sql = `select * from tb_dictionary where type='${type}' and  parentid = '${parentid}' `;
      if (name != null && name != "") {
        sql += ` and name like '%${name}%' `;
      }
      sql += ` order by createtime desc `;
      let list = await ctx.app.mysql.query(sql);
      ctx.status = 200;
      if (list != null) {
        // if (parentid == "0") {
        //   return LIST_SUCCESS("查询成功！", [
        //     {
        //       id: 0,
        //       name: "字典管理",
        //       leaf: list.length > 0,
        //       children: list
        //     }
        //   ]);
        // }
        return LIST_SUCCESS("查询成功！", list);
      } else {
        return LIST_ERROR("查询失败！", {});
      }
    } catch (error) {
      ctx.status = 500;
      return LIST_ODD(error);
    }
  }

  /**
   * 列表
   *
   * @param {*} { offset, limit, name }
   * @returns
   * @memberof DictionaryService
   */
  async list({ offset, limit, name, parentid }) {
    const { ctx } = this;
    try {
      let start = (limit - 1) * offset;
      let end = limit * offset;

      let sql = `select count(1) as total from tb_dictionary where parentid = '${parentid}' `;
      if (name != null && name != "") {
        sql += ` and name like '%${name}%' `;
      }
      let total = 0;
      let result = await ctx.app.mysql.query(sql);
      if (result != null) {
        total = result[0].total;
      }
      sql = `select * from tb_dictionary where parentid = '${parentid}' `;
      if (name != null && name != "") {
        sql += ` and name like '%${name}%' `;
      }
      sql += ` order by createtime desc limit ${start},${end} `;
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

  /**
   * 列表
   *
   * @param {*} { code }
   * @returns
   * @memberof DictionaryService
   */
  async listByCode(code) {
    const { ctx } = this;
    try {
      let sql = `select id,name from tb_dictionary where parentid = ( select id from tb_dictionary where code='${code}' limit 0,1 ) `;
      sql += ` order by createtime desc `;
      let list = await ctx.app.mysql.query(sql);
      ctx.status = 200;
      if (list != null) {
        return LIST_SUCCESS("查询成功！", list);
      } else {
        return LIST_ERROR("查询失败！", {});
      }
    } catch (error) {
      ctx.status = 500;
      return LIST_ODD(error);
    }
  }
}

module.exports = DictionaryService;
