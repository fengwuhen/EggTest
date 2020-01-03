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
  async update({ id, body }) {
    const { ctx } = this;
    try {
      let result = await this.find(id);
      let accountOld = result.data.Account;
      let accountNew = body.account;
      if (result.code == 0) {
        if (accountNew != accountOld) {
          result = await this.findByAccount(accountNew);
          if (result.code == 0) {
            return ERROR(`${accountNew}账号已经存在！`);
          }
        }
        body.id = id;
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
      console.log(result);
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
      console.log(result);
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
   * list
   *
   * @param {*} {
   *         offset,
   *         limit
   *     }
   * @returns
   * @memberof UserService
   */
  async list({ offset, limit }) {
    const { ctx } = this;
    try {
      let start = (limit - 1) * offset;
      let sql = `select count(1) as total from tb_users`;
      let total = 0;
      let result = await ctx.app.mysql.query(sql);
      if (result != null) {
        total = result[0].total;
      }
      sql = `select * from tb_users limit ${start},${offset}`;
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

module.exports = UserService;
