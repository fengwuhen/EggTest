"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get("/index", controller.home.index);

  // 新闻相关路由配置
  router.post("/news/create", controller.news.create);
  router.post("/news/update", controller.news.update);
  router.get("/news/destroy/:id", controller.news.destroy);
  router.post("/news/destroyMore", controller.news.destroyMore);
  router.get("/news/find/:id", controller.news.find);
  router.get("/news/list/:offset/:limit", controller.news.list);

  // 字典相关路由配置
  router.post("/dict/create", controller.dictionary.create);
  router.post("/dict/update", controller.dictionary.update);
  router.get("/dict/destroy/:id", controller.dictionary.destroy);
  router.post("/dict/destroyMore", controller.dictionary.destroyMore);
  router.get("/dict/find/:id", controller.dictionary.find);
  router.get("/dict/list/:offset/:limit", controller.dictionary.list);
  router.get("/dict/lazy",controller.dictionary.lazy);
  router.get("/dict/listByCode/:code",controller.dictionary.listByCode);

  // 用户相关路由配置
  router.post("/user/login", controller.user.login);
  router.post("/user/create", controller.user.create);
  router.post("/user/update", controller.user.update);
  router.get("/user/find/:id", controller.user.find);
  router.get("/user/findAccount/:account", controller.user.findByAccount);
  router.get("/user/destroy/:id", controller.user.destroy);
  router.post("/user/destroyMore", controller.user.destroyMore);
  router.get("/user/list/:offset/:limit", controller.user.list);

  // 文件相关路由配置
  router.post("/attach/create", controller.attach.create);
};
