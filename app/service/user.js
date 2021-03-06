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

class UserService extends Service {
  /**
   * 用户登录
   *
   * @param {*} body
   * @returns
   * @memberof UserService
   */
  async login({ account, password }) {
    const { ctx } = this;
    try {
      // 设置接口状态
      ctx.status = 200;
      // 判断账号是否存在
      let result = await this.findByAccount(account);
      if (result.code == 0) {
        // 判断账号密码是否匹配
        result = await ctx.app.mysql.select("tb_users", {
          where: { account: account, password: password }
        });
        if (result != null && result.length > 0) {
          return SUCCESS("登录成功！", result[0]);
        } else {
          return ERROR("密码不正确！");
        }
      } else {
        return ERROR("账号不存在！");
      }
    } catch (error) {
      ctx.status = 500;
      return ODD(error.sqlMessage);
    }
  }

  /**
   * create
   *
   * @param {*} item
   * @returns
   * @memberof UserService
   */
  async create(item) {
    const { ctx } = this;
    try {
      // 设置接口状态
      ctx.status = 200;
      // 判断账号是否存在
      let account = item.account;
      let result = await this.findByAccount(account);
      if (result.code == 0) {
        return ERROR(`${account}账号已经存在！`);
      }
      item.id = uuid();
      result = await ctx.app.mysql.insert("tb_users", item);
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
   * @param {*} {
   *         id,
   *         item
   *     }
   * @returns
   * @memberof UserService
   */
  async update(body) {
    const { ctx } = this;
    try {
      let result = await this.find(body.id);
      let accountOld = result.data.account;
      let accountNew = body.account;
      if (result.code == 0) {
        if (accountNew != accountOld) {
          result = await this.findByAccount(accountNew);
          if (result.code == 0) {
            return ERROR(`${accountNew}账号已经存在！`);
          }
        }
        result = await ctx.app.mysql.update("tb_users", body);
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
   * delete
   *
   * @param {*} id
   * @returns
   * @memberof UserService
   */
  async destroy(id) {
    const { ctx } = this;
    try {
      let result = await this.find(id);
      if (result.code == 0) {
        let result = await ctx.app.mysql.delete("tb_users", {
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
   *
   *
   * @param {*} body
   * @returns
   * @memberof UserService
   */
  async destroyMore(body) {
    const { ctx } = this;
    try {
      let ids = `'${body.ids.replaceAll(",", "','")}'`;
      if (ids != "") {
        let result = await ctx.app.mysql.query(
          `delete from tb_users where id in (${ids})`
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
   * find
   *
   * @param {*} id
   * @returns
   * @memberof UserService
   */
  async find(id) {
    const { ctx } = this;
    try {
      let result = await ctx.app.mysql.get("tb_users", {
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
   * 通过账号查找数据是否存在
   *
   * @param {*} account
   * @returns
   * @memberof UserService
   */
  async findByAccount(account) {
    const { ctx } = this;
    try {
      // 判断账号是否存在
      let result = await ctx.app.mysql.select("tb_users", {
        where: { account: account }
      });
      ctx.status = 200;
      if (result != null && result.length > 0) {
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
   * @memberof UserService
   */
  async list({ offset, limit, name }) {
    const { ctx } = this;
    try {
      let start = (limit - 1) * offset;
      let end = limit * offset;

      let sql = `select count(1) as total from tb_users `;
      if (name != null && name != "") {
        sql += ` where username like '%${name}%' `;
      }
      let total = 0;
      let result = await ctx.app.mysql.query(sql);
      if (result != null) {
        total = result[0].total;
      }
      sql = `select * from tb_users `;
      if (name != null && name != "") {
        sql += ` where username like '%${name}%' `;
      }
      sql += ` limit ${start},${end} `;
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

module.exports = UserService;
