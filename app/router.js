"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/index", controller.home.index);

  // 新闻相关路由配置
  router.post("/news/create", controller.news.create);
  router.post("/news/update/:id", controller.news.update);
  router.post("/news/destroy/:id", controller.news.destroy);
  router.get("/news/find/:id", controller.news.find);
  router.get("/news/list/:offset/:limit", controller.news.list);

  // 字典相关路由配置
  router.get("/dict/create", controller.dictionary.create);

  // 用户相关路由配置
  router.post("/user/login", controller.user.login);
  router.post("/user/create", controller.user.create);
  router.post("/user/update/:id", controller.user.update);
  router.get("/user/find/:id", controller.user.find);
  router.get("/user/findAccount/:account",controller.user.findByAccount);
  router.get("/user/destroy/:id",controller.user.destroy);
  router.get("/user/list/:offset/:limit", controller.user.list);
};
